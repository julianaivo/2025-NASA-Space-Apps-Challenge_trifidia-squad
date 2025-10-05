import { Card } from "@/components/ui/card"
import { useSimulationContext } from "@/contexts/SimulationContext"

export function AsteroidProfile() {
  const { simulationState, hasSimulationData } = useSimulationContext();
  
  const inputParams = simulationState.data?.details?.input_params;
  const scenarioParams = simulationState.data?.details?.scenario_params;
  
  // Calcular massa aproximada usando Volume = (4/3) * π * r³ e Massa = Volume * Densidade
  const calculateMass = (diameter: number, density: number): string => {
    const radius = (diameter * 1000) / 2; // converter km para metros
    const volume = (4/3) * Math.PI * Math.pow(radius, 3);
    const mass = volume * density;
    
    if (mass >= 1e12) {
      return `${(mass / 1e12).toFixed(1)}×10¹² kg`;
    } else if (mass >= 1e9) {
      return `${(mass / 1e9).toFixed(1)}×10⁹ kg`;
    } else if (mass >= 1e6) {
      return `${(mass / 1e6).toFixed(1)}×10⁶ kg`;
    }
    return `${mass.toFixed(0)} kg`;
  };

  const properties = hasSimulationData && inputParams && scenarioParams ? [
    { label: "Diameter", value: `${inputParams.diameter_km} km` },
    { label: "Mass", value: calculateMass(inputParams.diameter_km, scenarioParams.densidade_rho) },
    { label: "Velocity", value: `${inputParams.velocity_km_s} km/s` },
    { label: "Composition", value: inputParams.asteroid_type },
    { label: "Entry Angle", value: `${inputParams.impact_angle}°` },
    { label: "Density", value: `${scenarioParams.densidade_rho.toLocaleString()} kg/m³` },
  ] : [
    { label: "Diameter", value: "N/A" },
    { label: "Mass", value: "N/A" },
    { label: "Velocity", value: "N/A" },
    { label: "Composition", value: "N/A" },
    { label: "Entry Angle", value: "N/A" },
    { label: "Density", value: "N/A" },
  ];

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Asteroid Profile</h3>
      <div className="space-y-3">
        {properties.map((prop) => (
          <div key={prop.label} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{prop.label}</span>
            <span className="text-sm font-medium text-foreground font-mono">{prop.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
