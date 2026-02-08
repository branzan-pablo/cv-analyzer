import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400",
        secondary:
          "border-transparent bg-gray-200 text-gray-700",
        success:
          "border-transparent bg-green-800 text-green-300 border-green-500",
        warning:
          "border-transparent bg-orange-900 text-orange-300 border-orange-500",
        destructive:
          "border-transparent bg-red-900 text-red-300 border-red-500",
        outline: "text-gray-900 border-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
