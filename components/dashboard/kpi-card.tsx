import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface KpiCardProps {
  title: string
  value: number | string
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  loading?: boolean
  className?: string
}

export function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  loading = false,
  className,
}: KpiCardProps) {
  if (loading) {
    return (
      <div
        className={cn(
          "rounded-xl border border-slate-800 bg-slate-900/50 p-6",
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-slate-700",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-100">
            {typeof value === "number" ? value.toLocaleString("en-US") : value}
          </p>
          {description && (
            <p className="mt-1 text-xs text-slate-500">{description}</p>
          )}
          {trend && (
            <div
              className={cn(
                "mt-2 inline-flex items-center text-xs font-medium",
                trend.isPositive ? "text-emerald-400" : "text-red-400"
              )}
            >
              <span>{trend.isPositive ? "+" : ""}{trend.value}%</span>
              <span className="ml-1 text-slate-500">vs last week</span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary-cyan/10 p-2.5">
          <Icon className="h-5 w-5 text-primary-cyan" />
        </div>
      </div>
    </div>
  )
}
