"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import React from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  eventName: AnalyticsEventName;
  eventProps?: Record<string, string>;
}

export function TrackedLink({ eventName, eventProps, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(eventName, { route: window.location.pathname, ...eventProps });
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}

interface TrackedAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: AnalyticsEventName;
  eventProps?: Record<string, string>;
}

export function TrackedAnchor({ eventName, eventProps, onClick, children, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(eventName, { route: window.location.pathname, ...eventProps });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
