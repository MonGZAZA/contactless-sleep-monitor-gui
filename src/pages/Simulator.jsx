import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSleep } from '../context/SleepContext';
import { PARAM_CONFIG, PRESETS, CATEGORIES } from '../data/sleepAnalysis';
import ParameterButton from '../components/ParameterButton';
import SliderModal from '../components/SliderModal';
import EmergencyOverlay from '../components/EmergencyOverlay';
import * as Icons from 'lucide-react';
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowRight,
  BarChart3,
  SlidersHorizontal,
  Sparkles,
  Zap,
  X,
  Dna,
} from 'lucide-react';

export default function Simulator() {
  const {
    params,
    updateParam,
    analysis,
    activePreset,
    applyPreset,
    resetToDefault,
    liveParams,
    autoCrossCoupling,
    setAutoCrossCoupling,
    recentCouplings,
    dismissCouplingAlert,
  } = useSleep();

  const [activeParamKey, setActiveParamKey] = useState(null);

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleDismissEmergency = () => {
    resetToDefault();
  };

  return (
    <div className="space-y-5 animate-fade-in pb-10">
      {/* Emergency Overlay */}
      <EmergencyOverlay emergency={analysis?.emergency} onDismiss={handleDismissEmergency} />

      {/* Slider Popover Modal */}
      {activeParamKey && (
        <SliderModal
          paramKey={activeParamKey}
          value={params[activeParamKey]}
          onChange={updateParam}
          onClose={() => setActiveParamKey(null)}
        />
      )}

      {/* Quick Guide Banner */}
      <div className="bg-gradient-to-r from-violet-900/40 via-indigo-900/30 to-slate-900/60 border border-violet-700/40 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              How to Use This Companion App
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-violet-500/30 text-violet-300 font-mono">Guide</span>
            </h3>
            <p className="text-[10px] text-slate-300">
              Interactive walkthrough: how to test scenarios, sliders, graphs & emergency alerts.
            </p>
          </div>
        </div>
        <Link
          to="/guide"
          className="shrink-0 px-2.5 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs rounded-xl shadow transition-all active:scale-95"
        >
          Open Guide
        </Link>
      </div>

      {/* Preset Scenarios Carousel */}
      <section>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-white">Sleep Condition Simulator</h2>
          {/* Scroll Navigation Chevrons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollByAmount(-150)}
              className="w-6 h-6 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center border border-slate-700 text-xs transition-colors"
              title="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollByAmount(150)}
              className="w-6 h-6 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center border border-slate-700 text-xs transition-colors"
              title="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Select a preset case or tap any metric button below to adjust sleeper vitals.
        </p>

        {/* Horizontal Case Selection with Drag & Touch Scroll */}
        <div className="relative">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide select-none cursor-grab active:cursor-grabbing touch-pan-x overscroll-x-contain -mx-2 px-2"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-semibold ${
                  activePreset === key
                    ? 'bg-gradient-to-r from-violet-600/40 to-indigo-600/40 border-violet-400 text-white shadow-lg shadow-violet-900/30'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                }`}
              >
                <span className="text-sm">{preset.emoji}</span>
                <span>{preset.label}</span>
              </button>
            ))}
            <button
              onClick={resetToDefault}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white transition-all text-xs font-medium"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </section>

      {/* Physiological Cross-Coupling Toggle & Instruction Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-850 border border-slate-700/60 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-violet-400 shrink-0" />
          <span>Tap any card to pop up the slider</span>
        </div>

        {/* Cross-Coupling Switch */}
        <button
          type="button"
          onClick={() => setAutoCrossCoupling(!autoCrossCoupling)}
          className={`flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-semibold transition-all ${
            autoCrossCoupling
              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-sm'
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}
          title="Toggle research-based physiological cross-coupling"
        >
          <Dna className={`w-3.5 h-3.5 ${autoCrossCoupling ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
          <span>Physiology Coupling: <strong>{autoCrossCoupling ? 'ON (AI Active)' : 'OFF'}</strong></span>
        </button>
      </div>

      {/* Real-Time Physiological Cross-Coupling Applied Banner */}
      {recentCouplings && recentCouplings.length > 0 && (
        <div className="bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-slate-900 border border-cyan-500/40 rounded-2xl p-3.5 space-y-2 animate-slide-up shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-cyan-200">
                Physiological Cross-Coupling Applied
              </h4>
            </div>
            <button
              onClick={dismissCouplingAlert}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5 text-[11px]">
            {recentCouplings.map((c, i) => (
              <div key={i} className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
                <div className="flex items-center gap-1.5 font-semibold text-white mb-0.5">
                  <span className="text-cyan-400">⚡ {c.label}:</span>
                  <span className="text-amber-300 font-mono">{c.delta}</span>
                </div>
                <p className="text-slate-300 text-[10px] leading-snug">{c.mechanism}</p>
                <span className="text-[9px] text-slate-500 block mt-0.5 font-mono">
                  Medical Ref: {c.reference}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Parameter Cards (Organized by Category) */}
      <section className="space-y-5">
        {Object.entries(CATEGORIES).map(([catKey, category]) => {
          const CatIcon = Icons[category.icon] || Icons.Activity;
          const catParams = Object.entries(PARAM_CONFIG).filter(([_, config]) => config.category === catKey);

          if (catParams.length === 0) return null;

          return (
            <div key={catKey} className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <CatIcon className={`w-4 h-4 ${category.color}`} />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  {category.label}
                </h3>
              </div>

              {/* 2-Column Responsive Button Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {catParams.map(([paramKey]) => (
                  <ParameterButton
                    key={paramKey}
                    paramKey={paramKey}
                    value={params[paramKey]}
                    onClick={() => setActiveParamKey(paramKey)}
                    disabled={analysis?.emergency?.isEmergency}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Link to In-Depth Dashboard Analysis */}
      <div className="pt-2">
        <Link
          to="/dashboard"
          className="w-full bg-gradient-to-r from-violet-900/50 via-indigo-900/40 to-slate-900/80 hover:from-violet-800/60 hover:to-indigo-800/50 border border-violet-500/40 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-lg transition-all active:scale-98 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Sleep Score:</span>
                <span className="text-sm font-black text-violet-300 font-mono">
                  {analysis?.sleepScore ?? 0} / 100
                </span>
                <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 border border-emerald-500/30">
                  {analysis?.sleepEfficiency}% Eff
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Tap to view in-depth clinical assessment, risk conditions & 15m/8h graphs
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </Link>
      </div>
    </div>
  );
}
