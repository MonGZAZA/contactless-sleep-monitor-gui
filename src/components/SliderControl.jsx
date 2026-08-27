import * as Icons from 'lucide-react';
import { PARAM_CONFIG } from '../data/sleepAnalysis';

// Determine if a value is in the "healthy" range for color coding
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
  good: 'bg-emerald-400/10',
  warn: 'bg-amber-400/10',
  danger: 'bg-red-400/10',
  neutral: 'bg-slate-700/50',
};

export default function SliderControl({ paramKey, value, onChange, disabled = false }) {
  const config = PARAM_CONFIG[paramKey];
  if (!config) return null;

  const IconComponent = Icons[config.icon] || Icons.Activity;
  const status = getValueStatus(paramKey, value);

  return (
    <div className={`py-3 transition-opacity ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      {/* Header: Icon + Label + Value */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusBgColors[status]}`}>
            <IconComponent className={`w-4 h-4 ${statusColors[status]}`} />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-200">{config.label}</div>
            <div className="text-[10px] text-slate-500">{config.sensor}</div>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-lg font-bold tabular-nums ${statusColors[status]}`}>
            {Number.isInteger(config.step) ? value : value.toFixed(1)}
          </span>
          <span className="text-xs text-slate-500 ml-1">{config.unit}</span>
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          if (!disabled) {
            onChange(paramKey, Number(e.target.value));
          }
        }}
        className={`w-full ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      />

      {/* Range labels */}
      <div className="flex justify-between mt-0.5">
        <span className="text-[10px] text-slate-600">{config.min}{config.unit}</span>
        <span className="text-[10px] text-slate-600">{config.max}{config.unit}</span>
      </div>
    </div>
  );
}
