import * as React from "react";
import { cn } from "@/lib/utils";

export function buttonClassName({
  className,
  variant = "default",
  size = "default",
}: {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'premium';
  size?: 'default' | 'sm' | 'lg';
} = {}) {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  // Variant styles
  let variantStyles = "";
  if (variant === "default") variantStyles = "bg-primary text-primary-foreground shadow hover:bg-primary/90";
  if (variant === "premium") variantStyles = "button-premium";
  if (variant === "outline") variantStyles = "button-outline";
  if (variant === "ghost") variantStyles = "hover:bg-accent hover:text-accent-foreground";

  // Size styles
  let sizeStyles = "";
  if (size === "default") sizeStyles = "h-9 px-4 py-2";
  if (size === "sm") sizeStyles = "h-8 rounded-md px-3 text-xs";
  if (size === "lg") sizeStyles = "h-10 rounded-md px-8 text-base";

  return cn(baseStyles, variantStyles, sizeStyles, className);
}

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'premium', size?: 'default' | 'sm' | 'lg' }>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={buttonClassName({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
