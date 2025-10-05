import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"

export function ConsequencesReport() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-muted-foreground">Relatório de Consequências (IA)</h3>
      </div>
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          <strong className="text-accent">Impacto Imediato:</strong> Cratera de aproximadamente 35 km de diâmetro.
          Ejeção de material atingirá altitude de 80 km, causando escurecimento atmosférico regional por 6-8 semanas.
        </p>
        <p>
          <strong className="text-accent">Zona Térmica:</strong> Raio de 120 km experimentará temperaturas superiores a
          500°C. Ignição instantânea de materiais combustíveis. Taxa de sobrevivência estimada em 3%.
        </p>
        <p>
          <strong className="text-accent">Onda de Choque:</strong> Pressão de sobrepressão de 20 psi até 180 km do
          epicentro. Colapso estrutural de 95% das edificações. Ventos de 800 km/h na zona primária.
        </p>
        <p>
          <strong className="text-accent">Efeitos Secundários:</strong> Terremotos de magnitude 7.8 em raio de 500 km.
          Possível tsunami se impacto oceânico adjacente. Contaminação de aquíferos por 15-20 anos.
        </p>
      </div>
    </Card>
  )
}
