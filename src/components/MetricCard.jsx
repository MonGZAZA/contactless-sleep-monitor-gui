import React from 'react';
import * as Icons from 'lucide-react';

export default function MetricCard({ label, value, unit, icon, color = 'violet', subtitle }) {
  const IconComponent = Icons[icon] || Icons.Activity;

  const colorMap = {
    violet: {
      iconBg: 'bg-violet-500/20 text-violet-400',
      text: 'text-violet-400',
      border: 'border-slate-700/60 hover:border-violet-500/40',
    },
    cyan: {
      iconBg: 'bg-cyan-500/20 text-cyan-400',
      text: 'text-cyan-400',
      border: 'border-slate-700/60 hover:border-cyan-500/40',
    },
    emerald: {
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      text: 'text-emerald-400',
      border: 'border-slate-700/60 hover:border-emerald-500/40',
    },
    amber: {
      iconBg: 'bg-amber-500/20 text-amber-400',
      text: 'text-amber-400',
      border: 'border-slate-700/60 hover:border-amber-500/40',
    },
    red: {
      iconBg: 'bg-red-500/20 text-red-400',
      text: 'text-red-400',
      border: 'border-slate-700/60 hover:border-red-500/40',
    },
  };

  const scheme = colorMap[color] || colorMap.violet;

  return (
    <div
      className={`bg-slate-800/60 backdrop-blur-xl border rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-200 shadow-sm ${scheme.border}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-slate-300 tracking-tight line-clamp-1">
          {label}
        </span>
        <div className={`p-1.5 rounded-xl ${scheme.iconBg} shrink-0`}>
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-extrabold text-white tabular-nums tracking-tight">
            {value}
          </span>
          {unit && <span className="text-[11px] font-medium text-slate-400">{unit}</span>}
        </div>
        {subtitle && (
          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 leading-snug">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
