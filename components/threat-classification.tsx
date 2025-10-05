import { Card } from "@/components/ui/card"
import { AlertTriangle, Brain, CheckCircle } from "lucide-react"
import { useSimulationContext } from "@/contexts/SimulationContext"

export function ThreatClassification() {
  const { simulationState, hasSimulationData } = useSimulationContext();
  
  const kpis = simulationState.data?.kpis;
  const physicsOutput = simulationState.data?.details?.physics_output;
  
  // Determine category based on impact energy
  const getThreatCategory = (energyMT: number): { category: string; color: string; scale: number } => {
    if (energyMT < 1) {
      return { category: "Low Risk", color: "text-green-600", scale: 1 };
    } else if (energyMT < 10) {
      return { category: "Moderate Risk", color: "text-yellow-600", scale: 3 };
    } else if (energyMT < 100) {
      return { category: "High Risk", color: "text-orange-600", scale: 5 };
    } else if (energyMT < 1000) {
      return { category: "Regional Event", color: "text-red-600", scale: 7 };
    } else {
      return { category: "Global Event", color: "text-destructive", scale: 9 };
    }
  };

  const energy = physicsOutput?.energia_megatons || 0;
  const threatInfo = getThreatCategory(energy);
  const isPHA = kpis?.is_pha_prediction;
  const riskSource = kpis?.risk_assessment_source || "N/A";

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-muted-foreground">AI Threat Classification</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Category</span>
          <span className={`text-sm font-semibold ${hasSimulationData ? threatInfo.color : 'text-muted-foreground'}`}>
            {hasSimulationData ? threatInfo.category : 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Torino Scale</span>
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
            hasSimulationData 
              ? threatInfo.scale <= 2 ? 'bg-green-500/20 text-green-600' :
                threatInfo.scale <= 4 ? 'bg-yellow-500/20 text-yellow-600' :
                threatInfo.scale <= 6 ? 'bg-orange-500/20 text-orange-600' :
                'bg-destructive/20 text-destructive'
              : 'bg-muted text-muted-foreground'
          }`}>
            {hasSimulationData ? threatInfo.scale : '?'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">PHA (Potentially Hazardous)</span>
          <div className="flex items-center gap-2">
            {hasSimulationData ? (
              isPHA ? (
                <AlertTriangle className="w-4 h-4 text-destructive" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-600" />
              )
            ) : null}
            <span className={`text-sm font-semibold ${
              hasSimulationData 
                ? isPHA ? 'text-destructive' : 'text-green-600'
                : 'text-muted-foreground'
            }`}>
              {hasSimulationData ? (isPHA ? 'YES' : 'NO') : 'N/A'}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-start gap-2">
            <Brain className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {hasSimulationData 
                  ? `Analysis performed by ${riskSource}. ${
                      isPHA 
                        ? 'Object classified as Potentially Hazardous.' 
                        : 'Object does not pose direct threat to Earth.'
                    }`
                  : 'Waiting for simulation data for classification.'
                }
              </p>
              {hasSimulationData && energy > 100 && (
                <p className="text-xs text-destructive mt-2">
                  ⚠️ Significant impact energy detected. Continuous monitoring recommended.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
