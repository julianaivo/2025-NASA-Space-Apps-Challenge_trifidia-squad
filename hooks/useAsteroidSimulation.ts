import { useState, useCallback, useEffect } from 'react';
import { AsteroidInputData, AsteroidSimulationResponse, SimulationState } from '@/lib/types';
import { AsteroidApiService } from '@/lib/api';

const STORAGE_KEY = 'asteroid_simulation_data';

/**
 * Hook para gerenciar dados no localStorage
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage para chave ${key}:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Erro ao salvar no localStorage para chave ${key}:`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Erro ao remover do localStorage para chave ${key}:`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

/**
 * Hook principal para gerenciar simulações de asteroide
 */
export function useAsteroidSimulation() {
  const [simulationData, setSimulationData, clearSimulationData] = useLocalStorage<AsteroidSimulationResponse | null>(
    STORAGE_KEY,
    null
  );

  const [state, setState] = useState<SimulationState>({
    data: null,
    loading: false,
    error: null,
    lastInput: null,
  });

  // Sincroniza o estado com localStorage na inicialização
  useEffect(() => {
    if (simulationData) {
      setState(prev => ({
        ...prev,
        data: simulationData,
      }));
    }
  }, [simulationData]);

  /**
   * Executa uma nova simulação
   */
  const runSimulation = useCallback(async (inputData: AsteroidInputData) => {
    // Validação dos dados
    const validation = AsteroidApiService.validateInputData(inputData);
    if (!validation.isValid) {
      setState(prev => ({
        ...prev,
        error: `Dados inválidos: ${validation.errors.join(', ')}`,
        loading: false,
      }));
      throw new Error(`Dados inválidos: ${validation.errors.join(', ')}`);
    }

    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      lastInput: inputData,
    }));

    try {
      const result = await AsteroidApiService.simulateAsteroidImpact(inputData);

      // Salva no localStorage
      setSimulationData(result);

      setState(prev => ({
        ...prev,
        data: result,
        loading: false,
        error: null,
      }));

      console.log('Simulação concluída com sucesso:', result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        data: null,
      }));

      console.error('Erro na simulação:', error);
      throw error;
    }
  }, [setSimulationData]);

  /**
   * Limpa todos os dados da simulação
   */
  const clearSimulation = useCallback(() => {
    clearSimulationData();
    setState({
      data: null,
      loading: false,
      error: null,
      lastInput: null,
    });
  }, [clearSimulationData]);

  /**
   * Limpa apenas o erro
   */
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  /**
   * Verifica se há dados de simulação salvos
   */
  const hasSimulationData = Boolean(state.data);

  /**
   * Obtém coordenadas do último impacto
   */
  const getLastImpactCoordinates = useCallback(() => {
    if (state.data?.details.input_params) {
      const { impact_lat, impact_lng } = state.data.details.input_params;
      return { lat: impact_lat, lng: impact_lng };
    }
    return null;
  }, [state.data]);

  return {
    // Estado
    simulationState: state,
    hasSimulationData,

    // Ações
    runSimulation,
    clearSimulation,
    clearError,

    // Utilitários
    getLastImpactCoordinates,
  };
}