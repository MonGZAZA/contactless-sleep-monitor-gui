import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { X, Check, Minus, Plus, Info, AlertTriangle, ShieldAlert } from 'lucide-react';
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
  if (!range) return { status: 'neutral', optimal: '' };

  let status = 'danger';
  if (value >= range.good[0] && value <= range.good[1]) status = 'good';
  else if (value >= range.warn[0] && value <= range.warn[1]) status = 'warn';

  return {
    status,
    optimal: `${range.good[0]} – ${range.good[1]}`,
  };
}

function getEmergencyThresholdInfo(paramKey, value) {
  if (paramKey === 'heartRate') {
    const isTriggered = value <= 28 || value >= 150;
    const isApproaching = value <= 35 || value >= 130;
    return {
      hasEmergency: true,
      isTriggered,
      isApproaching,
      limits: '≤28 or ≥150 bpm',
      warningMessage: isTriggered
        ? 'Setting Heart Rate to ≤28 or ≥150 bpm will trigger the Critical Emergency Alarm & Auto-Dispatch when applied!'
        : 'Warning: Approaching cardiac emergency threshold (≤28 or ≥150 bpm). Applying this value may trigger the emergency alarm.',
    };
  }
  if (paramKey === 'breathingRate') {
    const isTriggered = value <= 3;
    const isApproaching = value <= 5;
    return {
      hasEmergency: true,
      isTriggered,
      isApproaching,
      limits: '≤3 br/min',
      warningMessage: isTriggered
        ? 'Setting Breathing Rate to ≤3 br/min will trigger the Respiratory Cessation Emergency Alarm when applied!'
        : 'Warning: Approaching respiratory cessation threshold (≤3 br/min). Applying this value may trigger the emergency alarm.',
    };
  }
  if (paramKey === 'ahi') {
    const isTriggered = value > 50;
    const isApproaching = value >= 45;
    return {
      hasEmergency: true,
      isTriggered,
      isApproaching,
      limits: '>50 ev/hr',
      warningMessage: isTriggered
        ? 'Setting AHI >50 will trigger the Severe Apnea Emergency Alarm when applied!'
        : 'Warning: Approaching severe apnea emergency threshold (>50 ev/hr). Applying this value may trigger the emergency alarm.',
    };
  }
  return null;
}

const statusColors = {
  good: 'text-emerald-400',
  warn: 'text-amber-400',
  danger: 'text-red-400',
  neutral: 'text-slate-300',
};

const statusBgColors = {
  good: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
  warn: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
  danger: 'bg-red-500/20 border-red-500/40 text-red-300',
  neutral: 'bg-slate-700/50 border-slate-600 text-slate-300',
};

const statusLabels = {
  good: 'Optimal',
  warn: 'Caution',
  danger: 'High Risk',
  neutral: 'Normal',
};

export default function SliderModal({ paramKey, value, onChange, onClose }) {
  // Local state so changes only commit when clicking the button
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [paramKey, value]);

  if (!paramKey) return null;
  const config = PARAM_CONFIG[paramKey];
  if (!config) return null;

  const IconComponent = Icons[config.icon] || Icons.Activity;
  const { status, optimal } = getValueStatus(paramKey, localValue);
  const emergencyInfo = getEmergencyThresholdInfo(paramKey, localValue);

  const handleStep = (direction) => {
    const step = config.step || 1;
    const nextVal = direction > 0 ? localValue + step : localValue - step;
    const clamped = Math.max(config.min, Math.min(config.max, nextVal));
    const rounded = Number.isInteger(step) ? Math.round(clamped) : Number(clamped.toFixed(1));
    setLocalValue(rounded);
  };

  const handleApply = () => {
    onChange(paramKey, localValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      {/* Backdrop tap to close (cancels without applying) */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Bottom Sheet Box */}
      <div className="bg-slate-900 border-t sm:border-2 border-slate-700/80 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 relative z-10 shadow-2xl animate-slide-up space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl ${statusBgColors[status]}`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{config.label}</h3>
              <p className="text-[11px] text-slate-400">{config.sensor}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            title="Cancel without applying"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Real-Time Emergency Warning Alert (Displayed locally as you adjust) */}
        {emergencyInfo && (emergencyInfo.isTriggered || emergencyInfo.isApproaching) && (
          <div
            className={`p-3 rounded-2xl border flex items-start gap-2.5 transition-all ${
              emergencyInfo.isTriggered
                ? 'bg-red-500/20 border-red-500/80 text-red-200 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : 'bg-amber-500/15 border-amber-500/50 text-amber-200'
            }`}
          >
            {emergencyInfo.isTriggered ? (
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-bounce" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <strong className="block font-bold mb-0.5">
                {emergencyInfo.isTriggered
                  ? '🚨 CRITICAL EMERGENCY LIMIT'
                  : '⚠️ EMERGENCY LIMIT APPROACHING'}
              </strong>
              <p className="text-[11px] leading-snug">
                {emergencyInfo.warningMessage}
              </p>
            </div>
          </div>
        )}

        {/* Value Display with Minus / Plus Buttons */}
        <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleStep(-1)}
            disabled={localValue <= config.min}
            className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center justify-center active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className={`text-3xl font-black tabular-nums tracking-tight ${statusColors[status]}`}>
              {Number.isInteger(config.step) ? localValue : localValue.toFixed(1)}
              <span className="text-xs font-semibold text-slate-400 ml-1.5">{config.unit}</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-block mt-1 ${statusBgColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleStep(1)}
            disabled={localValue >= config.max}
            className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center justify-center active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Slider Input */}
        <div className="space-y-2">
          <input
            type="range"
            min={config.min}
            max={config.max}
            step={config.step}
            value={localValue}
            onChange={(e) => setLocalValue(Number(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Min: {config.min} {config.unit}</span>
            {optimal && <span className="text-emerald-400 font-sans font-semibold">Optimal: {optimal} {config.unit}</span>}
            {emergencyInfo && (
              <span className="text-red-400 font-sans font-bold">
                🚨 Alarm: {emergencyInfo.limits}
              </span>
            )}
            <span>Max: {config.max} {config.unit}</span>
          </div>
        </div>

        {/* Clinical Guidance / Description */}
        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-start gap-2.5 text-xs text-slate-300">
          <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-slate-300">{config.description}</p>
        </div>

        {/* Action Buttons: Apply & Cancel */}
        <div className="flex gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all border border-slate-700 text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-[2] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-95 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-violet-900/30 transition-all text-xs"
          >
            <Check className="w-4 h-4" />
            Apply & Set Parameter
          </button>
        </div>
      </div>
    </div>
  );
}
