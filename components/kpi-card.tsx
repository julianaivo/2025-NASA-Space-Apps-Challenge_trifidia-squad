import { Card } from "@/components/ui/card"
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  trend?: {
    value: number
    direction: "up" | "down"
  }
}

export function KpiCard({ title, value, subtitle, icon: Icon, trend }: KpiCardProps) {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mt-2">{value}</h3>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-4">
          {trend.direction === "up" ? (
            <TrendingUp className="w-4 h-4 text-destructive" />
          ) : (
            <TrendingDown className="w-4 h-4 text-chart-4" />
          )}
          <span className={cn("text-sm font-medium", trend.direction === "up" ? "text-destructive" : "text-chart-4")}>
            {trend.value}% vs. estimativa anterior
          </span>
        </div>
      )}
    </Card>
  )
}
