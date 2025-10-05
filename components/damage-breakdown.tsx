"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"
import { useSimulationContext } from "@/contexts/SimulationContext"

export function DamageBreakdown() {
  const { simulationState, hasSimulationData } = useSimulationContext();
  
  const physicsOutput = simulationState.data?.details?.physics_output;
  
  // Calculate percentages based on damage radii
  const calculateDamagePercentages = () => {
    if (!physicsOutput) {
      return [
        { name: "Thermal Damage", value: 0, radius: 0, color: "oklch(0.65 0.18 45)" },
        { name: "Blast Damage", value: 0, radius: 0, color: "oklch(0.55 0.22 25)" },
      ];
    }

    const thermalRadius = physicsOutput.raio_dano_termico_km;
    const explosionRadius = physicsOutput.raio_dano_explosao_km;
    const finalRadius = physicsOutput.raio_dano_final_km;
    
    // Calculate percentages based on impact area
    const thermalPercentage = finalRadius > 0 ? Math.round((thermalRadius / finalRadius) * 100) : 0;
    const explosionPercentage = finalRadius > 0 ? Math.round((explosionRadius / finalRadius) * 100) : 0;

    return [
      { 
        name: "Thermal Damage", 
        value: thermalPercentage, 
        radius: thermalRadius,
        color: "oklch(0.65 0.18 45)" 
      },
      { 
        name: "Blast Damage", 
        value: explosionPercentage, 
        radius: explosionRadius,
        color: "oklch(0.55 0.22 25)" 
      },
    ];
  };

  const data = calculateDamagePercentages();

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Damage Distribution</h3>
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
              <p className="text-sm font-semibold text-foreground">
                {hasSimulationData ? `${item.radius.toFixed(2)} km` : 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
      {hasSimulationData && physicsOutput && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">Final damage radius</p>
          <p className="text-lg font-bold text-foreground">{physicsOutput.raio_dano_final_km.toFixed(2)} km</p>
        </div>
      )}
    </Card>
  )
}
