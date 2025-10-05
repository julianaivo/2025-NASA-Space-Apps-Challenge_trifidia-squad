import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { useSimulationContext } from "@/contexts/SimulationContext"

export function ConsequencesReport() {
  const { simulationState, hasSimulationData } = useSimulationContext();
  
  const llmReport = simulationState.data?.details?.llm_report;
  const physicsOutput = simulationState.data?.details?.physics_output;
  const kpis = simulationState.data?.kpis;

  const formatReport = (report: string) => {
    // Dividir o relatório em parágrafos baseados em pontos ou frases
    const sentences = report.split(/[.!]\s+/).filter(sentence => sentence.trim().length > 0);
    
    return sentences.map((sentence, index) => {
      const trimmedSentence = sentence.trim();
      if (trimmedSentence) {
        // Adicionar ponto final se não houver
        const finalSentence = trimmedSentence.endsWith('.') || trimmedSentence.endsWith('!') 
          ? trimmedSentence 
          : trimmedSentence + '.';
        
        return (
          <p key={index} className="mb-3">
            {finalSentence}
          </p>
        );
      }
      return null;
    });
  };

  const defaultReport = () => (
    <div className="space-y-4 text-sm text-foreground leading-relaxed">
      <p>
        <strong className="text-accent">Status:</strong> Waiting for simulation data to generate impact report.
      </p>
      <p>
        <strong className="text-accent">Instructions:</strong> Run a simulation on the configuration page to view detailed consequences report.
      </p>
    </div>
  );

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-muted-foreground">Consequences Report (AI)</h3>
      </div>
      
      {hasSimulationData && llmReport ? (
        <div className="space-y-3 text-sm text-foreground leading-relaxed">
          {formatReport(llmReport)}
          
          {physicsOutput && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Technical Data:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Energy:</span>
                  <span className="ml-2 font-mono">{physicsOutput.energia_megatons.toFixed(2)} MT</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Explosion Alt.:</span>
                  <span className="ml-2 font-mono">{physicsOutput.altitude_explosao_km.toFixed(2)} km</span>
                </div>
              </div>
            </div>
          )}
          
          {kpis && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Assessment Source: <span className="font-mono">{kpis.risk_assessment_source}</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        defaultReport()
      )}
    </Card>
  )
}
