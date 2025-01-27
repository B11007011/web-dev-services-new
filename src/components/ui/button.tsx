import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-button-gradient text-white hover:scale-105 hover:shadow-xl",
        gradient: "bg-gradient-to-r from-[rgb(0,87,209)] to-[rgb(17,23,84)] text-white hover:scale-105 hover:shadow-xl hover:opacity-90",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-800 text-white hover:scale-105 hover:shadow-xl hover:opacity-90",
        outline:
          "border-2 border-[rgb(0,87,209)] bg-transparent text-[rgb(0,87,209)] hover:bg-[rgb(0,87,209)] hover:text-white hover:scale-105",
        secondary:
          "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:scale-105 hover:shadow-xl hover:opacity-90",
        ghost: "bg-transparent hover:bg-gray-100 hover:text-[rgb(0,87,209)]",
        link: "text-[rgb(0,87,209)] underline-offset-4 hover:underline",
        glow: "bg-gradient-to-r from-[rgb(0,87,209)] to-[rgb(17,23,84)] text-white hover:scale-105 hover:shadow-xl hover:shadow-blue-400/50 relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:-translate-x-full hover:after:translate-x-full after:transition-transform after:duration-500",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 