// Types para os dados de entrada da API
export interface AsteroidInputData {
  diameter_km: number;
  velocity_km_s: number;
  impact_angle: number;
  impact_lat: number;
  impact_lng: number;
  asteroid_type: string;
}

// Types para os dados de saída da API (assumindo estrutura similar ao exemplo)
export interface AsteroidSimulationResponse {
  kpis: {
    population_in_risk: number;
    impacto_economico_usd: number;
    impact_energy_megatons: number;
    final_damage_radius_km: number;
    is_pha_prediction: boolean;
    risk_assessment_source: string;
  };
  details: {
    input_params: {
      diameter_km: number;
      velocity_km_s: number;
      impact_angle: number;
      impact_lat: number;
      impact_lng: number;
      asteroid_type: string;
    };
    scenario_params: {
      description: string;
      densidade_rho: number;
      resistencia_s: number;
      eficiencia_eta: number;
    };
    physics_output: {
      energia_megatons: number;
      altitude_explosao_km: number;
      raio_dano_explosao_km: number;
      raio_dano_termico_km: number;
      raio_dano_final_km: number;
      kinetic_energy_joules: number;
    };
    llm_report: string;
  };
}

// Mapeamento dos tipos de asteroide para envio à API
export const asteroidTypeMapping: Record<string, string> = {
  "sedimentary-rock": "Sedimentary Rock",
  "water": "Water", 
  "crystalline-rock": "Crystalline Rock",
  "ice": "Ice",
  "iron": "Iron",
  "stone": "Stone"
};

// Estado do hook de simulação
export interface SimulationState {
  data: AsteroidSimulationResponse | null;
  loading: boolean;
  error: string | null;
  lastInput: AsteroidInputData | null;
}