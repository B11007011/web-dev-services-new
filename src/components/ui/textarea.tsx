import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative group">
        {/* Subtle gradient background */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-sm group-hover:blur-md group-hover:from-blue-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300" />
        
        {/* Glowing border effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
        
        {/* Main textarea */}
        <textarea
          className={cn(
            "relative w-full min-h-[120px] rounded-xl",
            "bg-[#0B1120]/90 backdrop-blur-xl",
            "border border-gray-800/60",
            "px-5 py-4 text-base",
            "text-gray-100 placeholder:text-gray-500",
            "focus:outline-none focus:ring-0",
            "transition-all duration-300",
            "hover:bg-[#0B1120]/95 focus:bg-[#0B1120]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea } 