export interface ModelPricing {
  name: string;
  provider: string;
  inputCostPerMillion: number;
  outputCostPerMillion: number;
  contextWindow: number;
}

export const pricingMatrix: Record<string, ModelPricing> = {
  "gpt-4o": {
    name: "GPT-4o",
    provider: "OpenAI",
    inputCostPerMillion: 5.00,
    outputCostPerMillion: 15.00,
    contextWindow: 128000
  },
  "gpt-3.5-turbo": {
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    inputCostPerMillion: 0.50,
    outputCostPerMillion: 1.50,
    contextWindow: 16385
  },
  "claude-3-5-sonnet": {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    inputCostPerMillion: 3.00,
    outputCostPerMillion: 15.00,
    contextWindow: 200000
  },
  "claude-3-haiku": {
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    inputCostPerMillion: 0.25,
    outputCostPerMillion: 1.25,
    contextWindow: 200000
  },
  "llama-3-70b": {
    name: "Llama 3 70B",
    provider: "Meta (Groq/Anyscale)",
    inputCostPerMillion: 0.59,
    outputCostPerMillion: 0.79,
    contextWindow: 8192
  }
};