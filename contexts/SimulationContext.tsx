"use client"

import React, { createContext, useContext } from 'react';
import { SimulationState, AsteroidInputData, AsteroidSimulationResponse } from '@/lib/types';
import { useAsteroidSimulation } from '@/hooks/useAsteroidSimulation';

interface SimulationContextType {
  simulationState: SimulationState;
  hasSimulationData: boolean;
  runSimulation: (inputData: AsteroidInputData) => Promise<AsteroidSimulationResponse>;
  clearSimulation: () => void;
  clearError: () => void;
  getLastImpactCoordinates: () => { lat: number; lng: number } | null;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

/**
 * Provider para o contexto de simulação
 */
export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const {
    simulationState,
    hasSimulationData,
    runSimulation,
    clearSimulation,
    clearError,
    getLastImpactCoordinates,
  } = useAsteroidSimulation();

  const contextValue: SimulationContextType = {
    simulationState,
    hasSimulationData,
    runSimulation,
    clearSimulation,
    clearError,
    getLastImpactCoordinates,
  };

  return (
    <SimulationContext.Provider value={contextValue}>
      {children}
    </SimulationContext.Provider>
  );
}

/**
 * Hook para usar o contexto de simulação
 */
export function useSimulationContext() {
  const context = useContext(SimulationContext);
  
  if (context === undefined) {
    throw new Error('useSimulationContext deve ser usado dentro de um SimulationProvider');
  }
  
  return context;
}

/**
 * Hook para verificar se há dados de simulação
 */
export function useHasSimulationData() {
  const { hasSimulationData } = useSimulationContext();
  return hasSimulationData;
}

/**
 * Hook para obter apenas os KPIs da simulação
 */
export function useSimulationKPIs() {
  const { simulationState } = useSimulationContext();
  return simulationState.data?.kpis || null;
}

/**
 * Hook para obter apenas os detalhes da simulação
 */
export function useSimulationDetails() {
  const { simulationState } = useSimulationContext();
  return simulationState.data?.details || null;
}