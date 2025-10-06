"use client"

import { useState, useEffect } from "react"
import { MapView } from "@/components/map-view"
import { ImpactTimeline } from "@/components/impact-timeline"
import { useSimulationContext } from "@/contexts/SimulationContext"
import { Zap, Flame, Waves, Activity, Play, Pause, RotateCcw } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MapSimulator() {
  const { simulationState, hasSimulationData } = useSimulationContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  
  // Extrair dados da simulação
  const inputParams = simulationState.data?.details?.input_params;
  const physicsOutput = simulationState.data?.details?.physics_output;
  const kpis = simulationState.data?.kpis;

  // Controle de animação
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAnimating && hasSimulationData) {
      interval = setInterval(() => {
        setAnimationPhase((prev) => {
          if (prev >= 100) {
            setIsAnimating(false);
            return 100;
          }
          return prev + 2; // Aumenta 2% a cada 100ms = 5 segundos total
        });
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating, hasSimulationData]);

  const startAnimation = () => {
    if (!hasSimulationData) return;
    setAnimationPhase(0);
    setIsAnimating(true);
  };

  const pauseAnimation = () => {
    setIsAnimating(false);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationPhase(0);
  };

  // Formatar valores para exibição
  const formatDistance = (km: number): string => {
    if (km < 1) return `${(km * 1000).toFixed(0)}m`;
    return `${km.toFixed(1)}km`;
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-mono font-bold text-primary tracking-wider">IMPACT SIMULATION</h1>
          
          {hasSimulationData && (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={isAnimating ? pauseAnimation : startAnimation}
                className="gap-2"
              >
                {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAnimating ? "Pause" : "Simulate"}
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={resetAnimation}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          )}
        </div>
        {hasSimulationData && (
          <div className="mt-2 text-sm text-muted-foreground">
            {inputParams?.asteroid_type} • {formatDistance(inputParams?.diameter_km || 0)} • {inputParams?.velocity_km_s}km/s
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          {/* Map Section */}
          <div className="flex-1 relative">
            <MapView 
              impactLocation={inputParams ? { 
                lat: inputParams.impact_lat, 
                lng: inputParams.impact_lng 
              } : undefined}
              damageData={physicsOutput ? {
                crater: physicsOutput.raio_dano_explosao_km,
                thermal: physicsOutput.raio_dano_termico_km,
                shockwave: physicsOutput.raio_dano_explosao_km * 1.5,
                seismic: physicsOutput.raio_dano_final_km,
                final: physicsOutput.raio_dano_final_km
              } : undefined}
              animationPhase={animationPhase}
              isAnimating={isAnimating}
            />
          </div>

          <div className="border-t border-border">
            <ImpactTimeline animationPhase={animationPhase} />
          </div>
        </div>

        <div className="w-96 border-l border-border flex flex-col overflow-y-auto">
          {/* Parameters Panel */}
          <Card className="m-4 p-4 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Parameters</h3>
            {hasSimulationData && inputParams ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Diameter:</span>
                  <span className="text-sm font-mono text-primary">{formatDistance(inputParams.diameter_km)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Velocity:</span>
                  <span className="text-sm font-mono text-primary">{inputParams.velocity_km_s} km/s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Angle:</span>
                  <span className="text-sm font-mono text-primary">{inputParams.impact_angle}°</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Composition:</span>
                  <span className="text-sm font-mono text-primary">{inputParams.asteroid_type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Coordinates:</span>
                  <span className="text-xs font-mono text-primary">
                    {inputParams.impact_lat.toFixed(3)}, {inputParams.impact_lng.toFixed(3)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                Run a simulation on the configuration page to view parameters.
              </div>
            )}
          </Card>

          {/* Estimated Effects Panel */}
          <Card className="m-4 mt-0 p-4 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-destructive" />
              <h3 className="text-lg font-semibold text-foreground">Estimated Effects</h3>
            </div>
            {hasSimulationData && physicsOutput ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm text-foreground">Explosion:</span>
                  </div>
                  <span className="text-sm font-mono text-primary">{formatDistance(physicsOutput.raio_dano_explosao_km)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Flame className="w-3 h-3 text-orange-500" />
                    <span className="text-sm text-foreground">Thermal:</span>
                  </div>
                  <span className="text-sm font-mono text-primary">{formatDistance(physicsOutput.raio_dano_termico_km)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Waves className="w-3 h-3 text-cyan-500" />
                    <span className="text-sm text-foreground">Shockwave:</span>
                  </div>
                  <span className="text-sm font-mono text-primary">{formatDistance(physicsOutput.raio_dano_explosao_km * 1.5)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-blue-500" />
                    <span className="text-sm text-foreground">Final Damage:</span>
                  </div>
                  <span className="text-sm font-mono text-primary">{formatDistance(physicsOutput.raio_dano_final_km)}</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Energy:</span>
                    <span className="text-sm font-mono text-destructive">{physicsOutput.energia_megatons.toFixed(1)} MT</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-foreground">Pop. at Risk:</span>
                    <span className="text-sm font-mono text-destructive">
                      {kpis?.population_in_risk.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                Run a simulation on the configuration page to view effects.
              </div>
            )}
          </Card>

          {/* Legend Panel */}
          <Card className="m-4 mt-0 p-4 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Legend</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-white mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-white">Epicenter</div>
                  <div className="text-xs text-muted-foreground">Impact point</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-red-400">Fireball</div>
                  <div className="text-xs text-muted-foreground">Immediate total destruction</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-orange-400">Thermal Radiation</div>
                  <div className="text-xs text-muted-foreground">Burns and fires</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-cyan-400">Shockwave</div>
                  <div className="text-xs text-muted-foreground">Severe structural damage</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-blue-400">Seismic Effect</div>
                  <div className="text-xs text-muted-foreground">Tremors and moderate damage</div>
                </div>
              </div>
            </div>
            
            {isAnimating && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">Progress:</span>
                  <span className="text-sm font-mono text-primary">{animationPhase.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-100" 
                    style={{ width: `${animationPhase}%` }}
                  />
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
