import { createHash } from 'crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 16 * 1024; // 16 KB hard cap on submission payload
const WEBHOOK_TIMEOUT_MS = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const REPLAY_WINDOW_MS = 10 * 60 * 1000;

const LIMITS = {
  name: 120,
  company: 160,
  industry: 120,
  email: 254,
  phone: 40,
  city: 120,
  interest: 40,
  message: 4_000,
} as const;

const ALLOWED_INTERESTS = new Set([
  'galatea',
  'cricchetto',
  'atlas',
  'igea',
  'hermes',
  'not_sure',
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s().-]{5,}$/;

type FieldError = { field: string; message: string };
type WebhookResult = unknown;
type RateLimitBucket = { count: number; resetAt: number };

declare global {
  // In-memory guards are best-effort per runtime instance. They reduce abuse
  // without replacing edge/WAF rate limits in production.
  var contactRateLimits: Map<string, RateLimitBucket> | undefined;
  var contactReplayKeys: Map<string, number> | undefined;
}

const rateLimitBuckets = globalThis.contactRateLimits ?? new Map<string, RateLimitBucket>();
globalThis.contactRateLimits = rateLimitBuckets;

const replayKeys = globalThis.contactReplayKeys ?? new Map<string, number>();
globalThis.contactReplayKeys = replayKeys;

function asString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

function clean(v: unknown, max: number): string {
  return asString(v).replace(/\s+/g, ' ').trim().slice(0, max);
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    forwardedFor ||
    'unknown'
  );
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const existing = rateLimitBuckets.get(key);

  for (const [bucketKey, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) rateLimitBuckets.delete(bucketKey);
  }

  if (!existing || existing.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) return false;

  existing.count += 1;
  return true;
}

function isPrivateHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase();
  if (normalized === 'localhost' || normalized.endsWith('.localhost')) return true;

  const ipv4 = normalized.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!ipv4) return false;

  const [, aRaw, bRaw] = ipv4;
  const a = Number(aRaw);
  const b = Number(bRaw);

  return (
    a === 10 ||
    a === 127 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 169 && b === 254) ||
    a === 0
  );
}

function isValidWebhookUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !isPrivateHostname(url.hostname);
  } catch {
    return false;
  }
}

function replayKey(payload: Record<string, string>): string {
  return createHash('sha256')
    .update(JSON.stringify(payload))
    .digest('hex');
}

function hasRecentReplay(key: string): boolean {
  const now = Date.now();

  for (const [storedKey, expiresAt] of replayKeys) {
    if (expiresAt <= now) replayKeys.delete(storedKey);
  }

  const expiresAt = replayKeys.get(key);
  return typeof expiresAt === 'number' && expiresAt > now;
}

function parseWebhookText(text: string): WebhookResult {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'Troppe richieste. Riprova più tardi.' },
        { status: 429 }
      );
    }

    const lenHeader = req.headers.get('content-length');
    if (lenHeader && Number(lenHeader) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: 'Payload troppo grande' },
        { status: 413 }
      );
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content-Type non valido' },
        { status: 400 }
      );
    }

    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'JSON non valido' },
        { status: 400 }
      );
    }

    if (!raw || typeof raw !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Payload non valido' },
        { status: 400 }
      );
    }

    const data = raw as Record<string, unknown>;

    // Honeypot: hidden field "website" must stay empty. Bots tend to fill every input.
    if (clean(data.website, 200) !== '') {
      return NextResponse.json(
        { success: false, error: 'Payload non valido' },
        { status: 400 }
      );
    }

    const nome = clean(data.name, LIMITS.name);
    const attivita = clean(data.company, LIMITS.company);
    const settore = clean(data.industry, LIMITS.industry);
    const email = clean(data.email, LIMITS.email).toLowerCase();
    const telefono = clean(data.phone, LIMITS.phone);
    const citta = clean(data.city, LIMITS.city);
    const prodotto_interesse = clean(data.interest, LIMITS.interest).toLowerCase();
    const messaggio = clean(data.message, LIMITS.message);
    const privacy_consent = data.privacy === 'on' || data.privacy === true ? 'Yes' : 'No';

    const errors: FieldError[] = [];
    if (!nome) errors.push({ field: 'name', message: 'Nome richiesto' });
    if (!attivita) errors.push({ field: 'company', message: 'Azienda richiesta' });
    if (!settore) errors.push({ field: 'industry', message: 'Settore richiesto' });
    if (!email || !EMAIL_RE.test(email)) errors.push({ field: 'email', message: 'Email non valida' });
    if (!telefono || !PHONE_RE.test(telefono)) errors.push({ field: 'phone', message: 'Telefono non valido' });
    if (!messaggio) errors.push({ field: 'message', message: 'Messaggio richiesto' });
    if (!prodotto_interesse || !ALLOWED_INTERESTS.has(prodotto_interesse)) {
      errors.push({ field: 'interest', message: 'Interesse non valido' });
    }
    if (privacy_consent !== 'Yes') {
      errors.push({ field: 'privacy', message: 'Consenso privacy obbligatorio' });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Dati non validi', fields: errors },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: 'Webhook n8n non configurato' },
        { status: 500 }
      );
    }

    if (!isValidWebhookUrl(webhookUrl)) {
      console.error('[contact] invalid webhook URL');
      return NextResponse.json(
        { success: false, error: 'Webhook n8n non configurato' },
        { status: 500 }
      );
    }

    const webhookSecret = process.env.LEADINTAKE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[contact] missing lead intake webhook secret');
      return NextResponse.json(
        { success: false, error: 'Webhook n8n non configurato' },
        { status: 500 }
      );
    }

    const payload = {
      nome,
      attivita,
      settore,
      email,
      telefono,
      citta,
      prodotto_interesse,
      messaggio,
      privacy_consent,
    };

    const payloadReplayKey = replayKey(payload);
    if (hasRecentReplay(payloadReplayKey)) {
      return NextResponse.json(
        { success: false, error: 'Richiesta già ricevuta di recente' },
        { status: 409 }
      );
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-filo-webhook-secret': webhookSecret,
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
        signal: controller.signal,
      });
      const webhookText = await response.text();

      if (!response.ok) {
        console.error('[contact] webhook non-2xx status', response.status, webhookText);
        return NextResponse.json(
          {
            success: false,
            error: 'Webhook n8n ha risposto con errore',
            ...(process.env.NODE_ENV === 'development' ? { detail: webhookText } : {}),
          },
          { status: 502 }
        );
      }

      const result = parseWebhookText(webhookText);

      replayKeys.set(payloadReplayKey, Date.now() + REPLAY_WINDOW_MS);

      return NextResponse.json({
        success: true,
        message: 'Lead acquisito correttamente',
        result,
      });
    } catch (err) {
      const aborted = err instanceof Error && err.name === 'AbortError';
      console.error('[contact] webhook error', aborted ? 'timeout' : 'network');
      return NextResponse.json(
        { success: false, error: 'Impossibile elaborare la richiesta' },
        { status: aborted ? 504 : 502 }
      );
    } finally {
      clearTimeout(timer);
    }
  } catch (error) {
    console.error('[contact] unexpected error', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json(
      { success: false, error: 'Impossibile elaborare la richiesta' },
      { status: 500 }
    );
  }
}
