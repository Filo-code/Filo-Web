import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "premium" | "comingSoon";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseVariants = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  let variantStyles = "";
  if (variant === "default") {
    variantStyles = "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80";
  } else if (variant === "secondary") {
    variantStyles = "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
  } else if (variant === "outline") {
    variantStyles = "text-foreground";
  } else if (variant === "premium") {
    variantStyles = "border-white/10 bg-white/5 text-white backdrop-blur-sm shadow-sm";
  } else if (variant === "comingSoon") {
    variantStyles = "border-white/5 bg-transparent text-muted-foreground";
  }

  return (
    <div className={cn(baseVariants, variantStyles, className)} {...props} />
  );
}

export { Badge };
