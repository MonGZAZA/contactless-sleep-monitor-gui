import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { getRiskBgColor, getRiskColor } from '../data/sleepAnalysis';

export default function RiskAlert({ condition }) {
  const [expanded, setExpanded] = useState(false);
  const bgColorClass = getRiskBgColor(condition.risk);
  const textColorClass = getRiskColor(condition.risk);

  return (
    <div className={`bg-slate-800/50 backdrop-blur-xl border-l-4 ${bgColorClass} border-t border-r border-b border-slate-700/50 rounded-r-xl rounded-l-md p-4 mb-3 transition-all duration-300`}>
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <AlertCircle className={`w-5 h-5 ${textColorClass}`} />
          <h4 className="text-sm font-semibold text-slate-200">{condition.name}</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${bgColorClass}`}>
            {condition.risk}
          </span>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3 animate-fade-in">
          <p className="text-sm text-slate-300">{condition.detail}</p>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <h5 className="text-xs font-semibold text-slate-300 mb-1">Recommendation</h5>
            <p className="text-xs text-slate-400">{condition.recommendation}</p>
          </div>
          <p className="text-[10px] italic text-slate-500">Ref: {condition.reference}</p>
        </div>
      )}
    </div>
  );
}
