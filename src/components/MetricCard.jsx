import React from 'react';
import * as Icons from 'lucide-react';

export default function MetricCard({ label, value, unit, icon, color = 'violet', subtitle }) {
  const IconComponent = Icons[icon] || Icons.Activity;
  
  const colorMap = {
    violet: 'bg-violet-500/20 text-violet-400',
    cyan: 'bg-cyan-500/20 text-cyan-400',
    emerald: 'bg-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/20 text-amber-400',
    red: 'bg-red-500/20 text-red-400',
  };

  const iconClasses = colorMap[color] || colorMap.violet;

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300">
      <div className={`p-3 rounded-full flex-shrink-0 ${iconClasses}`}>
        <IconComponent className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 truncate">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-white truncate">{value}</span>
          {unit && <span className="text-xs text-slate-400">{unit}</span>}
        </div>
        {subtitle && <p className="text-[10px] text-slate-500 mt-0.5 truncate">{subtitle}</p>}
      </div>
    </div>
  );
}
