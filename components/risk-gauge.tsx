"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export function RiskGauge() {
  const riskValue = 78
  const data = [
    { name: "Risk", value: riskValue },
    { name: "Remaining", value: 100 - riskValue },
  ]

  const getColor = (value: number) => {
    if (value >= 70) return "oklch(0.55 0.22 25)"
    if (value >= 40) return "oklch(0.65 0.18 45)"
    return "oklch(0.60 0.15 160)"
  }

  const getRiskLevel = (value: number) => {
    if (value >= 70) return "Crítico"
    if (value >= 40) return "Alto"
    return "Moderado"
  }

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Índice Global de Risco</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={getColor(riskValue)} />
              <Cell fill="oklch(0.22 0.01 264)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-foreground">{riskValue}</div>
          <div className="text-sm text-muted-foreground">de 100</div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: `${getColor(riskValue)}20`,
            color: getColor(riskValue),
          }}
        >
          Nível {getRiskLevel(riskValue)}
        </span>
      </div>
    </Card>
  )
}
