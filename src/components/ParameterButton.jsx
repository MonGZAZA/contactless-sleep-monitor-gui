import React from 'react';
import * as Icons from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import { PARAM_CONFIG } from '../data/sleepAnalysis';

function getValueStatus(key, value) {
  const ranges = {
    heartRate: { good: [40, 70], warn: [35, 100] },
    breathingRate: { good: [12, 20], warn: [8, 25] },
    bodyMovement: { good: [0, 5], warn: [0, 25] },
    snoringPercent: { good: [0, 10], warn: [0, 50] },
    ahi: { good: [0, 5], warn: [0, 15] },
    sleepDuration: { good: [7, 9], warn: [5, 11] },
    sleepOnsetLatency: { good: [0, 20], warn: [0, 45] },
    waso: { good: [0, 20], warn: [0, 45] },
    awakenings: { good: [0, 3], warn: [0, 7] },
    roomTemp: { good: [18, 22], warn: [15, 26] },
    roomHumidity: { good: [30, 50], warn: [20, 60] },
    ambientNoise: { good: [15, 30], warn: [15, 45] },
    ambientLight: { good: [0, 1], warn: [0, 5] },
  };

  const range = ranges[key];
  if (!range) return 'neutral';

  if (value >= range.good[0] && value <= range.good[1]) return 'good';
  if (value >= range.warn[0] && value <= range.warn[1]) return 'warn';
  return 'danger';
}

const statusColors = {
  good: 'text-emerald-400',
  warn: 'text-amber-400',
  danger: 'text-red-400',
  neutral: 'text-slate-300',
};

const statusBgColors = {
  good: 'bg-emerald-500/15 text-emerald-400',
  warn: 'bg-amber-500/15 text-amber-400',
  danger: 'bg-red-500/15 text-red-400',
  neutral: 'bg-slate-700/40 text-slate-300',
};

const statusBorderColors = {
  good: 'border-slate-700/70 hover:border-emerald-500/50',
  warn: 'border-amber-500/40 hover:border-amber-500/70',
  danger: 'border-red-500/50 hover:border-red-500/80',
  neutral: 'border-slate-700/60',
};

const statusPillColors = {
  good: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  warn: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  danger: 'bg-red-500/10 text-red-300 border-red-500/30',
  neutral: 'bg-slate-800 text-slate-400 border-slate-700',
};

const statusLabels = {
  good: 'Optimal',
  warn: 'Caution',
  danger: 'Warning',
  neutral: 'Normal',
};

export default function ParameterButton({ paramKey, value, onClick, disabled = false }) {
  const config = PARAM_CONFIG[paramKey];
  if (!config) return null;

  const IconComponent = Icons[config.icon] || Icons.Activity;
  const status = getValueStatus(paramKey, value);

  // Dynamic animation durations based on real physiological values
  const heartDuration = Math.max(0.35, 60 / (value || 60));
  const breathDuration = Math.max(0.6, 60 / (value || 15));

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative p-3.5 rounded-2xl border bg-slate-850 hover:bg-slate-800 flex flex-col justify-between transition-all duration-200 active:scale-95 text-left group shadow-sm ${statusBorderColors[status]} ${
        disabled ? 'opacity-40 pointer-events-none' : ''
      }`}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <div className={`p-2 rounded-xl ${statusBgColors[status]} transition-transform group-hover:scale-110 relative`}>
          {paramKey === 'heartRate' ? (
            <IconComponent
              className="w-4 h-4 fill-red-400/30"
              style={{ animation: `heartbeat ${heartDuration}s ease-in-out infinite` }}
            />
          ) : paramKey === 'breathingRate' ? (
            <IconComponent
              className="w-4 h-4"
              style={{ animation: `breathe ${breathDuration}s ease-in-out infinite` }}
            />
          ) : (
            <IconComponent className="w-4 h-4" />
          )}
        </div>

        {/* Status Badge + Tap Icon */}
        <div className="flex items-center gap-1.5">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${statusPillColors[status]}`}>
            {statusLabels[status]}
          </span>
          <div className="p-1 rounded-md bg-slate-800 text-slate-400 group-hover:text-violet-400 group-hover:bg-slate-700 transition-colors">
            <SlidersHorizontal className="w-3 h-3" />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="text-[11px] font-semibold text-slate-300 line-clamp-1 group-hover:text-white transition-colors">
          {config.label}
        </div>
        <div className="flex items-baseline justify-between mt-0.5">
          <div className="flex items-baseline gap-1">
            <span className={`text-lg font-black tabular-nums ${statusColors[status]}`}>
              {Number.isInteger(config.step) ? value : value.toFixed(1)}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">{config.unit}</span>
          </div>
          <span className="text-[9px] text-slate-500 font-medium group-hover:text-violet-300 transition-colors">
            Tap to adjust →
          </span>
        </div>
      </div>
    </button>
  );
}
