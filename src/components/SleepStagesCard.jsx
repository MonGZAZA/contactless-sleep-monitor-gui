import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { Moon, Brain, Shield, Zap, Sparkles, Layers, Info, BatteryCharging } from 'lucide-react';

const STAGE_LABELS = {
  3: 'Awake',
  2: 'REM Sleep',
  1: 'Light (N1-N2)',
  0: 'Deep (N3)',
};

const STAGE_COLORS = {
  3: '#f59e0b', // Amber
  2: '#a855f7', // Purple
  1: '#06b6d4', // Cyan
  0: '#6366f1', // Indigo
};

function CustomHypnogramTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const stageVal = data.stageVal;
    const stageName = STAGE_LABELS[stageVal] || data.stage;
    const color = STAGE_COLORS[stageVal] || '#8b5cf6';

    return (
      <div className="bg-slate-900/95 border border-slate-700/80 p-3 rounded-2xl shadow-2xl backdrop-blur-md text-xs space-y-1">
        <div className="flex items-center justify-between gap-3 border-b border-slate-700 pb-1">
          <span className="text-[10px] text-slate-400 font-mono">Time: {data.time}</span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase"
            style={{ backgroundColor: `${color}25`, color }}
          >
            {stageName}
          </span>
        </div>
        <div className="pt-0.5 space-y-0.5 text-[11px]">
          <div className="flex justify-between text-slate-300">
            <span>Sleep Stage:</span>
            <strong style={{ color }}>{data.stage}</strong>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Nocturnal Pulse:</span>
            <strong className="text-white font-mono">{data.heartRate} bpm</strong>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Respiration:</span>
            <strong className="text-white font-mono">{data.breathingRate} br/min</strong>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function SleepStagesCard({ sleepStages }) {
  if (!sleepStages) return null;

  const { deep, rem, light, awake, hypnogramTimeline, insights } = sleepStages;

  return (
    <section className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-5 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              Sleep Stages & Architecture (Hypnogram)
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-mono">
                60GHz Radar
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Classified via contactless chest wall ballistocardiography & micromotion
            </p>
          </div>
        </div>
      </div>

      {/* 4-Stage Proportional Visual Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-semibold text-slate-300">
          <span>Stage Distribution</span>
          <span className="text-slate-400 text-[10px]">Total Sleep: {(deep.durationHours + rem.durationHours + light.durationHours).toFixed(1)} hrs</span>
        </div>

        <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-slate-900 border border-slate-700/60 p-0.5">
          <div
            style={{ width: `${deep.percent}%` }}
            className="bg-indigo-500 rounded-l-full transition-all duration-500"
            title={`Deep: ${deep.percent}%`}
          />
          <div
            style={{ width: `${rem.percent}%` }}
            className="bg-purple-500 transition-all duration-500"
            title={`REM: ${rem.percent}%`}
          />
          <div
            style={{ width: `${light.percent}%` }}
            className="bg-cyan-500 transition-all duration-500"
            title={`Light: ${light.percent}%`}
          />
          <div
            style={{ width: `${awake.percent}%` }}
            className="bg-amber-500 rounded-r-full transition-all duration-500"
            title={`Awake: ${awake.percent}%`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-between gap-1 text-[10px] pt-1 text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Deep ({deep.percent}%)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>REM ({rem.percent}%)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>Light ({light.percent}%)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Awake ({awake.percent}%)</span>
          </span>
        </div>
      </div>

      {/* 4-Stage Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Deep Sleep Card */}
        <div className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1">
              <BatteryCharging className="w-3.5 h-3.5 text-indigo-400" />
              Deep Sleep (N3)
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/40">
              {deep.status === 'optimal' ? 'Optimal' : 'Low'}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white">{deep.durationHours}h</span>
            <span className="text-xs font-semibold text-indigo-400">({deep.percent}%)</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">Physical cellular & tissue repair (Target: 15–25%)</p>
        </div>

        {/* REM Sleep Card */}
        <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              REM Sleep
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/40">
              {rem.status === 'optimal' ? 'Optimal' : 'Low'}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white">{rem.durationHours}h</span>
            <span className="text-xs font-semibold text-purple-400">({rem.percent}%)</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">Memory & cognitive consolidation (Target: 20–25%)</p>
        </div>

        {/* Light Sleep Card */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-cyan-400" />
              Light Sleep (N1-N2)
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40">
              Normal
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white">{light.durationHours}h</span>
            <span className="text-xs font-semibold text-cyan-400">({light.percent}%)</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">Transitional & stabilizing sleep (Target: 45–55%)</p>
        </div>

        {/* Awake Card */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              Awake / Latency
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40">
              {awake.status === 'optimal' ? 'Low' : 'Elevated'}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white">{awake.durationMinutes}m</span>
            <span className="text-xs font-semibold text-amber-400">({awake.percent}%)</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">Onset latency & nocturnal awakenings</p>
        </div>
      </div>

      {/* Overnight Hypnogram Step Graph (11:00 PM to 07:00 AM) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            Overnight Hypnogram Cycle (11 PM – 7 AM)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">90-min ultradian cycles</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-700/60 rounded-2xl p-3 h-56 relative">
          {/* Stage Y-Axis Labels overlay on left */}
          <div className="absolute left-2 top-3 bottom-7 flex flex-col justify-between text-[9px] font-mono pointer-events-none z-10">
            <span className="text-amber-400 font-bold">Awake</span>
            <span className="text-purple-400 font-bold">REM</span>
            <span className="text-cyan-400 font-bold">Light</span>
            <span className="text-indigo-400 font-bold">Deep</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={hypnogramTimeline}
              margin={{ top: 10, right: 10, left: 32, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorHypno" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                  <stop offset="35%" stopColor="#a855f7" stopOpacity={0.6} />
                  <stop offset="65%" stopColor="#06b6d4" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fill: '#94a3b8', fontSize: 9 }}
                stroke="#334155"
                minTickGap={25}
              />
              <YAxis
                domain={[0, 3]}
                ticks={[0, 1, 2, 3]}
                tick={false}
                stroke="#334155"
                width={5}
              />
              <Tooltip content={<CustomHypnogramTooltip />} />
              <Area
                type="stepAfter"
                dataKey="stageVal"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorHypno)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Clinical Architecture Insights */}
      {insights && insights.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-3.5 space-y-2 text-xs">
          <h4 className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Clinical Restorative Sleep Insights
          </h4>
          <ul className="space-y-1.5">
            {insights.map((insight, idx) => (
              <li key={idx} className="text-[11px] text-slate-300 leading-relaxed">
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
