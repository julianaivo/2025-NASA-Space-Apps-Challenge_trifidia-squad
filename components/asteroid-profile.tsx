import { Card } from "@/components/ui/card"

export function AsteroidProfile() {
  const properties = [
    { label: "Diâmetro", value: "2.4 km" },
    { label: "Massa", value: "1.8×10¹³ kg" },
    { label: "Velocidade", value: "18.2 km/s" },
    { label: "Composição", value: "Condrito carbonáceo" },
    { label: "Ângulo de entrada", value: "45°" },
    { label: "Tempo até impacto", value: "14h 23min" },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Perfil do Asteroide</h3>
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
