'use client';

import { useState } from 'react';
import { pricingMatrix } from './pricingData';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [inputTokens, setInputTokens] = useState<number>(100000);
  const [outputTokens, setOutputTokens] = useState<number>(50000);
  const [requestsCount, setRequestsCount] = useState<number>(1000);

  const modelInfo = pricingMatrix[selectedModel];
  
  const inputCost = (inputTokens * modelInfo.inputCostPerMillion) / 1000000;
  const outputCost = (outputTokens * modelInfo.outputCostPerMillion) / 1000000;
  
  const costPerRequest = inputCost + outputCost;
  const totalCost = costPerRequest * requestsCount;

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            AI Spend Audit Dashboard
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Optimize, calculate, and audit your multi-model LLM API infrastructure costs dynamically.
          </p>
        </header>

        {/* Workspace Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Input Configuration Panel */}
          <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-semibold border-b border-gray-800 pb-3 text-blue-400">
              Configuration
            </h2>

            {/* Model Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-400">
                Select LLM Model
              </label>
              <select 
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200"
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
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200"
                value={inputTokens}
                onChange={(e) => setInputTokens(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>

            {/* Output Tokens Field */}
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-400">
                Output Tokens (per request)
              </label>
              <input 
                type="number"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>

            {/* Monthly Total Requests */}
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-400">
                Total API Volume (Requests)
              </label>
              <input 
                type="number"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200"
                value={requestsCount}
                onChange={(e) => setRequestsCount(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
          </div>

          {/* Right Column: Strategic Financial Reports */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Real-time Metric Cards Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-400">Cost Per Request</span>
                <span className="block text-2xl font-bold mt-2 text-emerald-400">${costPerRequest.toFixed(4)}</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-400">Context Window Used</span>
                <span className="block text-2xl font-bold mt-2 text-amber-400">
                  {(((inputTokens + outputTokens) / modelInfo.contextWindow) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-400">Projected Total Audit</span>
                <span className="block text-2xl font-bold mt-2 text-blue-400">${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </div>

            {/* Model Specifications Meta Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
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

            {/* Multi-Model Cost Audit Matrix Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text">
                Multi-Model Strategic Comparison
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Comparative simulation across alternative API layouts for the same operational volume.
              </p>
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
                      const reqCost = ((inputTokens * m.inputCostPerMillion) / 1000000) + ((outputTokens * m.outputCostPerMillion) / 1000000);
                      const totalReqCost = reqCost * requestsCount;
                      
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