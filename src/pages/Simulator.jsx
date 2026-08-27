import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSleep } from '../context/SleepContext';
import { PARAM_CONFIG, PRESETS, CATEGORIES } from '../data/sleepAnalysis';
import SliderControl from '../components/SliderControl';
import SleepScoreGauge from '../components/SleepScoreGauge';
import RiskAlert from '../components/RiskAlert';
import EmergencyOverlay from '../components/EmergencyOverlay';
import LiveIndicators from '../components/LiveIndicators';
import * as Icons from 'lucide-react';
import { RefreshCw, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export default function Simulator() {
  const {
    params,
    updateParam,
    analysis,
    activePreset,
    applyPreset,
    resetToDefault,
    liveParams,
  } = useSleep();

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
    <div className="space-y-6 animate-fade-in">
      <EmergencyOverlay emergency={analysis?.emergency} onDismiss={handleDismissEmergency} />

      {/* Interactive Quick Guide Banner */}
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

      <section>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-white">Sleep Condition Simulator</h2>
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
        <p className="text-xs text-slate-400 mb-4">
          Swipe or click presets below to simulate realistic sleep scenarios.
        </p>

        {/* Horizontal Case Selection with Drag & Touch Scroll */}
        <div className="relative">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide select-none cursor-grab active:cursor-grabbing touch-pan-x overscroll-x-contain -mx-2 px-2"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-2xl border transition-all text-xs font-semibold ${
                  activePreset === key
                    ? 'bg-gradient-to-r from-violet-600/40 to-indigo-600/40 border-violet-400 text-white shadow-lg shadow-violet-900/30'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                }`}
              >
                <span className="text-base">{preset.emoji}</span>
                <span>{preset.label}</span>
              </button>
            ))}
            <button
              onClick={resetToDefault}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white transition-all text-xs font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </section>

      {/* Live Monitoring Panel */}
      <LiveIndicators liveParams={liveParams} baseParams={params} />

      <section className="space-y-6">
        {Object.entries(CATEGORIES).map(([catKey, category]) => {
          const CatIcon = Icons[category.icon] || Icons.Activity;
          const catParams = Object.entries(PARAM_CONFIG).filter(([_, config]) => config.category === catKey);
          
          if (catParams.length === 0) return null;

          return (
            <div key={catKey} className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <CatIcon className={`w-5 h-5 ${category.color}`} />
                <h3 className="text-md font-semibold text-white">{category.label}</h3>
              </div>
              
              {catParams.map(([paramKey]) => (
                <SliderControl
                  key={paramKey}
                  paramKey={paramKey}
                  value={params[paramKey]}
                  onChange={updateParam}
                  disabled={analysis?.emergency?.isEmergency}
                />
              ))}
            </div>
          );
        })}
      </section>

      <section className="pt-6 border-t border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4">Live Analysis Results</h3>
        
        <div className="bg-slate-800/30 rounded-3xl p-6 flex flex-col items-center mb-6">
          <SleepScoreGauge score={analysis?.sleepScore || 0} size={200} />
          
          <div className="w-full flex justify-between items-center mt-6 px-4 py-3 bg-slate-800/50 rounded-xl">
            <span className="text-sm text-slate-400">Sleep Efficiency</span>
            <span className="text-lg font-bold text-white">{analysis?.sleepEfficiency}%</span>
          </div>
          
          <p className="mt-6 text-center text-sm text-slate-300 leading-relaxed">
            {analysis?.overallAssessment}
          </p>
        </div>

        {analysis?.conditions && analysis.conditions.length > 0 && (
          <div className="space-y-3 mb-6">
            <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Detected Conditions</h4>
            {/* Sort risk: critical, high, moderate, low */}
            {analysis.conditions
              .sort((a, b) => {
                const riskOrder = { critical: 0, high: 1, moderate: 2, low: 3 };
                return (riskOrder[a.risk] ?? 4) - (riskOrder[b.risk] ?? 4);
              })
              .map(condition => (
                <RiskAlert key={condition.id} condition={condition} />
              ))}
          </div>
        )}

        {analysis?.tips && analysis.tips.length > 0 && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 mb-8">
            <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <Icons.Zap className="w-4 h-4 text-amber-400" />
              Recommendations
            </h4>
            <ul className="space-y-2">
              {analysis.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-violet-400">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center mt-8 pb-4">
          <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
            All health assessments are based on peer-reviewed research. This prototype is for demonstration purposes and does not constitute medical advice.
          </p>
        </div>
      </section>
    </div>
  );
}
