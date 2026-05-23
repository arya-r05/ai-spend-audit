'use client';

import { useState } from 'react';
import { pricingMatrix } from './pricingData';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [inputTokens, setInputTokens] = useState<number>(100000);
  const [outputTokens, setOutputTokens] = useState<number>(50000);
  const [requestsCount, setRequestsCount] = useState<number>(1000);

  // Fallback safe extraction logic if model selection crashes
  const modelInfo = pricingMatrix[selectedModel] || pricingMatrix['gpt-4o'];
  
  // Strict mathematical constraint rules to prevent negative value calculation leaks
  const safeInputTokens = Math.max(0, inputTokens);
  const safeOutputTokens = Math.max(0, outputTokens);
  const safeRequestsCount = Math.max(0, requestsCount);

  const inputCost = (safeInputTokens * modelInfo.inputCostPerMillion) / 1000000;
  const outputCost = (safeOutputTokens * modelInfo.outputCostPerMillion) / 1000000;
  
  const costPerRequest = inputCost + outputCost;
  const totalCost = costPerRequest * safeRequestsCount;

  // Visual Chart Metric Matrix Calculations safely bounded
  const allCalculatedCosts = Object.keys(pricingMatrix).map((key) => {
    const m = pricingMatrix[key];
    const reqCost = ((safeInputTokens * m.inputCostPerMillion) / 1000000) + ((safeOutputTokens * m.outputCostPerMillion) / 1000000);
    return reqCost * safeRequestsCount;
  });
  
  const maxProjectedCost = Math.max(...allCalculatedCosts, 1);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="border-b border-gray-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              AI Spend Audit Dashboard
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Optimize, calculate, and audit your multi-model LLM API infrastructure costs dynamically.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Production Audit Active
          </span>
        </header>

        {/* Workspace Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Input Configuration Panel */}
          <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6 shadow-xl">
            <h2 className="text-xl font-semibold border-b border-gray-800 pb-3 text-blue-400">
              Configuration Panel
            </h2>

            {/* Model Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-400">
                Select LLM Model
              </label>
              <select 
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200 transition-colors"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                {Object.keys(pricingMatrix).map((key) => (
                  <option key={key} value={key}>
                    {pricingMatrix[key].name} ({pricingMatrix[key].provider})
                  </option>
                ))}
              </select>
            </div>

            {/* Input Tokens Field */}
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-400">
                Input Tokens (per request)
              </label>
              <input 
                type="number"
                min="0"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200 transition-colors"
                value={inputTokens || ''}
                onChange={(e) => setInputTokens(parseInt(e.target.value) || 0)}
              />
            </div>

            {/* Output Tokens Field */}
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-400">
                Output Tokens (per request)
              </label>
              <input 
                type="number"
                min="0"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200 transition-colors"
                value={outputTokens || ''}
                onChange={(e) => setOutputTokens(parseInt(e.target.value) || 0)}
              />
            </div>

            {/* Monthly Total Requests */}
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-400">
                Total API Volume (Requests)
              </label>
              <input 
                type="number"
                min="0"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200 transition-colors"
                value={requestsCount || ''}
                onChange={(e) => setRequestsCount(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Right Column: Strategic Financial Reports */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Real-time Metric Cards Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-400">Cost Per Request</span>
                <span className="block text-2xl font-bold mt-2 text-emerald-400">${costPerRequest.toFixed(4)}</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-400">Context Window Used</span>
                <span className="block text-2xl font-bold mt-2 text-amber-400">
                  {(((safeInputTokens + safeOutputTokens) / modelInfo.contextWindow) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-400">Projected Total Audit</span>
                <span className="block text-2xl font-bold mt-2 text-blue-400">${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </div>

            {/* Model Specifications Meta Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Active Model Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-500 text-xs block">Provider</span>
                  <span className="font-medium text-gray-300 mt-1 block">{modelInfo.provider}</span>
                </div>
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-500 text-xs block">Input Cost / 1M</span>
                  <span className="font-medium text-gray-300 mt-1 block">${modelInfo.inputCostPerMillion}</span>
                </div>
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-500 text-xs block">Output Cost / 1M</span>
                  <span className="font-medium text-gray-300 mt-1 block">${modelInfo.outputCostPerMillion}</span>
                </div>
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-500 text-xs block">Max Context Limit</span>
                  <span className="font-medium text-gray-300 mt-1 block">{modelInfo.contextWindow.toLocaleString()} tokens</span>
                </div>
              </div>
            </div>

            {/* Multi-Model Cost Audit Matrix Table & Dynamic Charts */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-8 shadow-2xl">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text">
                  Multi-Model Strategic Comparison
                </h3>
                <p className="text-xs text-gray-400">
                  Comparative simulation across alternative API layouts for the same operational volume.
                </p>
              </div>

              {/* Pure CSS Dynamic Visual Progress Bar Chart */}
              <div className="space-y-4 border-b border-gray-800/60 pb-6">
                <h4 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">Cost Distribution Analytics</h4>
                {Object.keys(pricingMatrix).map((key) => {
                  const m = pricingMatrix[key];
                  const reqCost = ((safeInputTokens * m.inputCostPerMillion) / 1000000) + ((safeOutputTokens * m.outputCostPerMillion) / 1000000);
                  const totalReqCost = reqCost * safeRequestsCount;
                  
                  // Percentage allocation for visual progress fill
                  const percentageWidth = (totalReqCost / maxProjectedCost) * 100;

                  return (
                    <div key={`chart-${key}`} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className={key === selectedModel ? 'text-blue-400 font-semibold' : 'text-gray-300'}>
                          {m.name} {key === selectedModel ? '(Selected)' : ''}
                        </span>
                        <span className="font-mono text-gray-400">${totalReqCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      </div>
                      <div className="w-full bg-gray-950 rounded-full h-2.5 border border-gray-800 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ease-out ${key === selectedModel ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gradient-to-r from-gray-700 to-gray-600'}`}
                          style={{ width: `${percentageWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="text-xs uppercase bg-gray-950 text-gray-400 border-b border-gray-800">
                    <tr>
                      <th className="px-4 py-3">Model Name</th>
                      <th className="px-4 py-3">Cost / Req</th>
                      <th className="px-4 py-3 text-right">Projected Total Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {Object.keys(pricingMatrix).map((key) => {
                      const m = pricingMatrix[key];
                      const reqCost = ((safeInputTokens * m.inputCostPerMillion) / 1000000) + ((safeOutputTokens * m.outputCostPerMillion) / 1000000);
                      const totalReqCost = reqCost * safeRequestsCount;
                      
                      return (
                        <tr key={key} className={`hover:bg-gray-800/30 transition-colors ${key === selectedModel ? 'bg-blue-950/20 text-blue-300' : ''}`}>
                          <td className="px-4 py-3.5 font-medium">
                            {m.name} <span className="text-xs text-gray-500 block">{m.provider}</span>
                          </td>
                          <td className="px-4 py-3.5 font-mono text-emerald-500">
                            ${reqCost.toFixed(4)}
                          </td>
                          <td className="px-4 py-3.5 text-right font-mono font-bold text-blue-400">
                            ${totalReqCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}