import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { 
  icon?: React.ReactNode 
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-white/20",
            icon ? "pl-10 pr-4" : "px-4",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none [&>svg]:w-4 [&>svg]:h-4">
            {icon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
