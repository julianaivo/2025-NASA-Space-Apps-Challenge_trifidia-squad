'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// A "forma" da resposta da sua API que já definimos
export type SimulationResponse = {
  kpis: {
    population_in_risk: number;
    impacto_economico_usd: number;
    impact_energy_megatagons: number;
    final_damage_radius_km: number;
    is_pha_prediction: boolean;
    risk_assessment_source: string;
  };
  details: {
    // ... adicione aqui os outros campos dos detalhes se precisar
    llm_report: string;
    physics_output: any;
  };
};

interface SimulationContextType {
  results: SimulationResponse | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  startSimulation: (config: any) => Promise<boolean>; // Retorna true em sucesso, false em erro
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<SimulationResponse | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const startSimulation = async (config: any): Promise<boolean> => {
    setStatus('loading');
    setError(null);
    console.log("A enviar para a API:", config);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'A resposta da API não foi OK');
      }

      const data: SimulationResponse = await response.json();
      setResults(data);
      setStatus('success');
      return true; // Sucesso
    } catch (err: any) {
      console.error("Erro ao simular:", err);
      setError(err.message);
      setStatus('error');
      return false; // Erro
    }
  };

  return (
    <SimulationContext.Provider value={{ results, status, error, startSimulation }}>
      {children}
    </SimulationContext.Provider>
  );
}

// O HOOK PERSONALIZADO!
export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}