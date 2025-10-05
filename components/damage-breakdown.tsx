"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"

export function DamageBreakdown() {
  const data = [
    { name: "Dano Térmico", value: 65, color: "oklch(0.65 0.18 45)" },
    { name: "Dano por Explosão", value: 85, color: "oklch(0.55 0.22 25)" },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Distribuição de Danos</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" width={150} tick={{ fill: "oklch(0.58 0.01 264)", fontSize: 12 }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
            <div>
              <p className="text-xs text-muted-foreground">{item.name}</p>
              <p className="text-sm font-semibold text-foreground">{item.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
