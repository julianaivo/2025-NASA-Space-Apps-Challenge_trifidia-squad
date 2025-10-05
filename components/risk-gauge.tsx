"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useSimulationContext } from "@/contexts/SimulationContext"

export function RiskGauge() {
  const { simulationState, hasSimulationData } = useSimulationContext();
  
  // Calculate risk index based on simulation data
  const calculateRiskIndex = (): number => {
    if (!hasSimulationData) return 0;
    
    const kpis = simulationState.data?.kpis;
    const physicsOutput = simulationState.data?.details?.physics_output;
    
    if (!kpis || !physicsOutput) return 0;
    
    let riskScore = 0;
    
    // Factor 1: Energy (40% weight)
    const energy = physicsOutput.energia_megatons;
    if (energy > 1000) riskScore += 40;
    else if (energy > 100) riskScore += 35;
    else if (energy > 10) riskScore += 25;
    else if (energy > 1) riskScore += 15;
    else riskScore += 5;
    
    // Factor 2: Population at risk (30% weight)
    const population = kpis.population_in_risk;
    if (population > 5000000) riskScore += 30;
    else if (population > 1000000) riskScore += 25;
    else if (population > 500000) riskScore += 20;
    else if (population > 100000) riskScore += 15;
    else riskScore += 5;
    
    // Factor 3: Damage radius (20% weight)
    const damageRadius = physicsOutput.raio_dano_final_km;
    if (damageRadius > 100) riskScore += 20;
    else if (damageRadius > 50) riskScore += 15;
    else if (damageRadius > 20) riskScore += 10;
    else if (damageRadius > 5) riskScore += 5;
    
    // Factor 4: PHA (10% weight)
    if (kpis.is_pha_prediction) riskScore += 10;
    
    return Math.min(100, Math.max(0, riskScore));
  };

  const riskValue = calculateRiskIndex();
  const data = [
    { name: "Risk", value: riskValue },
    { name: "Remaining", value: 100 - riskValue },
  ];

  const getColor = (value: number) => {
    if (value >= 70) return "oklch(0.55 0.22 25)";
    if (value >= 40) return "oklch(0.65 0.18 45)";
    return "oklch(0.60 0.15 160)";
  };

  const getRiskLevel = (value: number) => {
    if (value >= 80) return "Extreme";
    if (value >= 60) return "Critical";
    if (value >= 40) return "High";
    if (value >= 20) return "Moderate";
    return "Low";
  };

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Global Risk Index</h3>
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
              <Cell fill={hasSimulationData ? getColor(riskValue) : "oklch(0.30 0.01 264)"} />
              <Cell fill="oklch(0.22 0.01 264)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-foreground">
            {hasSimulationData ? riskValue : '--'}
          </div>
          <div className="text-sm text-muted-foreground">of 100</div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: hasSimulationData ? `${getColor(riskValue)}20` : 'oklch(0.22 0.01 264)',
            color: hasSimulationData ? getColor(riskValue) : 'oklch(0.58 0.01 264)',
          }}
        >
          {hasSimulationData ? getRiskLevel(riskValue) : 'N/A'} Level
        </span>
      </div>
      {hasSimulationData && (
        <div className="mt-3 text-xs text-muted-foreground text-center">
          Based on energy, population and impact radius
        </div>
      )}
    </Card>
  )
}
