import { Card } from "@/components/ui/card"
import { AlertTriangle, Brain } from "lucide-react"

export function ThreatClassification() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-muted-foreground">Classificação de Ameaça IA</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Categoria</span>
          <span className="text-sm font-semibold text-destructive">Evento de Extinção Regional</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Escala Torino</span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-destructive/20 text-destructive font-bold">
            8
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Probabilidade</span>
          <span className="text-sm font-semibold text-foreground">94.7%</span>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-accent mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              IA detectou padrão de trajetória consistente com impacto de alta energia. Recomenda-se evacuação imediata.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
