export type InnovationModuleId =
  | 'ai-dashboard'
  | 'iot-dashboard'
  | 'project-map'
  | 'project-showcase'
  | 'sustainability-command'
  | 'market-intel'
  | 'web3-nft'
  | 'ai-personalization';

export interface InnovationInsightResponse {
  module: InnovationModuleId;
  source: 'openrouter' | 'fallback';
  summary: string;
  highlights: string[];
  actions: string[];
  metadata?: Record<string, unknown>;
  error?: string;
  parseError?: string;
}

export type InnovationInsightContext = Record<string, unknown>;
