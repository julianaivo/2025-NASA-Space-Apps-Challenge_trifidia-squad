import { AsteroidInputData, AsteroidSimulationResponse } from './types';

// Configuração do endpoint da API
const API_BASE_URL = 'http://localhost:8000';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Serviço para interagir com a API do backend
 */
export class AsteroidApiService {
  /**
   * Envia dados para simular o impacto do asteroide
   */
  static async simulateAsteroidImpact(
    inputData: AsteroidInputData
  ): Promise<AsteroidSimulationResponse> {
    try {
      console.log('Enviando dados para simulação:', inputData);

      const response = await fetch(`${API_BASE_URL}/api/v1/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Erro desconhecido' };
        }
        
        throw new ApiError(
          `Erro na simulação: ${response.status} - ${errorData.message || response.statusText}`,
          response.status,
          errorData
        );
      }

      const result = await response.json();
      console.log('Dados da simulação recebidos:', result);

      return result;
    } catch (error) {
      console.error('Erro ao simular impacto:', error);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new ApiError(
          `Erro de conexão: ${error.message}`,
          0
        );
      }

      throw new ApiError('Erro desconhecido na simulação', 500);
    }
  }

  /**
   * Valida se os dados de entrada estão corretos
   */
  static validateInputData(data: Partial<AsteroidInputData>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!data.diameter_km || data.diameter_km <= 0) {
      errors.push('Diâmetro deve ser maior que 0');
    }

    if (!data.velocity_km_s || data.velocity_km_s <= 0) {
      errors.push('Velocidade deve ser maior que 0');
    }

    if (data.impact_angle === undefined || data.impact_angle < 0 || data.impact_angle > 90) {
      errors.push('Ângulo deve estar entre 0 e 90 graus');
    }

    if (!data.impact_lat || data.impact_lat < -90 || data.impact_lat > 90) {
      errors.push('Latitude deve estar entre -90 e 90');
    }

    if (!data.impact_lng || data.impact_lng < -180 || data.impact_lng > 180) {
      errors.push('Longitude deve estar entre -180 e 180');
    }

    if (!data.asteroid_type) {
      errors.push('Tipo de asteroide é obrigatório');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Função para testar a conexão com a API
   */
  static async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      
      return response.ok;
    } catch (error) {
      console.warn('API não está disponível:', error);
      return false;
    }
  }
}

export { ApiError };