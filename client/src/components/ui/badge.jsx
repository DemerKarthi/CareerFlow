import * as React from "react"
import { cn } from "../../lib/utils"

const badgeVariants = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

const variants = {
  default: "border-transparent bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700",
  secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
  destructive: "border-transparent bg-red-500 text-white hover:bg-red-600 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90",
  outline: "text-slate-950 dark:text-slate-50 border-slate-200 dark:border-slate-800",
}

function Badge({ className, variant = "default", ...props }) {
  return (
    <div className={cn(badgeVariants, variants[variant], className)} {...props} />
  )
}

export { Badge }
