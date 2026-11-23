import React, { useState } from 'react';
import { useSleep } from '../context/SleepContext';
import SleepScoreGauge from '../components/SleepScoreGauge';
import MetricCard from '../components/MetricCard';
import RiskAlert from '../components/RiskAlert';
import SleepStagesCard from '../components/SleepStagesCard';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  Radio,
  Clock,
  Heart,
  Wind,
  Thermometer,
  Droplets,
  Volume2,
  Sun,
  Activity,
  Zap,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
} from 'lucide-react';

function CustomLiveTooltip({ active, payload, label, unit, metricName }) {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 p-2.5 rounded-xl shadow-xl backdrop-blur-md text-xs">
        <p className="text-[10px] text-slate-400 font-mono mb-1">Time: {label}</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="font-semibold text-white">{metricName}:</span>
          <span className="font-mono font-bold text-violet-300">
            {val} {unit}
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  const { analysis, liveParams, params, telemetryHistory } = useSleep();
  const [graphMode, setGraphMode] = useState('live'); // 'live' (15 mins) vs 'session' (8h)

  // Radar Component Data
  const radarData = [
    { subject: 'Duration', score: analysis?.subScores?.duration ?? 85 },
    { subject: 'Efficiency', score: analysis?.subScores?.efficiency ?? 88 },
    { subject: 'Heart Rate', score: analysis?.subScores?.heartRate ?? 90 },
    { subject: 'Breathing', score: analysis?.subScores?.breathingRate ?? 82 },
    { subject: 'AHI Airway', score: analysis?.subScores?.ahi ?? 75 },
    { subject: 'Movement', score: analysis?.subScores?.movement ?? 85 },
    { subject: 'Environment', score: analysis?.subScores?.environment ?? 92 },
    { subject: 'Snoring', score: analysis?.subScores?.snoring ?? 90 },
  ];

  // 1. Live 15-Minute Streaming Telemetry Data
  const liveHrData = telemetryHistory.map((pt) => ({
    time: pt.time,
    value: pt.heartRate,
  }));

  const liveBrData = telemetryHistory.map((pt) => ({
    time: pt.time,
    value: pt.breathingRate,
  }));

  // 2. Realistic 8-Hour Circadian Session Data (Modeled with physiological nocturnal nadir dip + REM cycles)
  const sessionHrData = [
    { time: '23:00', value: Math.round(params.heartRate * 1.05) },
    { time: '23:30', value: Math.round(params.heartRate * 1.02) },
    { time: '00:00', value: Math.round(params.heartRate * 0.98) },
    { time: '00:30', value: Math.round(params.heartRate * 0.95) },
    { time: '01:00', value: Math.round(params.heartRate * 0.93) },
    { time: '01:30', value: Math.round(params.heartRate * 0.96) },
    { time: '02:00', value: Math.round(params.heartRate * 0.92) },
    { time: '02:30', value: Math.round(params.heartRate * 0.90) },
    { time: '03:00', value: Math.round(params.heartRate * 0.88) },
    { time: '03:30', value: Math.round(params.heartRate * 0.87) },
    { time: '04:00', value: Math.round(params.heartRate * 0.89) },
    { time: '04:30', value: Math.round(params.heartRate * 0.92) },
    { time: '05:00', value: Math.round(params.heartRate * 0.95) },
    { time: '05:30', value: Math.round(params.heartRate * 0.94) },
    { time: '06:00', value: Math.round(params.heartRate * 0.97) },
    { time: '06:30', value: Math.round(params.heartRate * 1.01) },
    { time: '07:00', value: Math.round(params.heartRate * 1.04) },
  ];

  const sessionBrData = [
    { time: '23:00', value: Math.round(params.breathingRate * 1.08) },
    { time: '23:30', value: Math.round(params.breathingRate * 1.03) },
    { time: '00:00', value: Math.round(params.breathingRate * 0.97) },
    { time: '00:30', value: Math.round(params.breathingRate * 0.94) },
    { time: '01:00', value: Math.round(params.breathingRate * 0.95) },
    { time: '01:30', value: Math.round(params.breathingRate * 1.02) },
    { time: '02:00', value: Math.round(params.breathingRate * 0.93) },
    { time: '02:30', value: Math.round(params.breathingRate * 0.92) },
    { time: '03:00', value: Math.round(params.breathingRate * 0.90) },
    { time: '03:30', value: Math.round(params.breathingRate * 0.91) },
    { time: '04:00', value: Math.round(params.breathingRate * 0.93) },
    { time: '04:30', value: Math.round(params.breathingRate * 0.97) },
    { time: '05:00', value: Math.round(params.breathingRate * 0.98) },
    { time: '05:30', value: Math.round(params.breathingRate * 0.96) },
    { time: '06:00', value: Math.round(params.breathingRate * 1.01) },
    { time: '06:30', value: Math.round(params.breathingRate * 1.04) },
    { time: '07:00', value: Math.round(params.breathingRate * 1.06) },
  ];

  const hrChartData = graphMode === 'live' ? liveHrData : sessionHrData;
  const brChartData = graphMode === 'live' ? liveBrData : sessionBrData;

  // Filter strictly abnormal conditions (critical, high, or moderate risk)
  const abnormalConditions = (analysis?.conditions || []).filter(
    (c) => c.risk === 'critical' || c.risk === 'high' || c.risk === 'moderate'
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Sleep Health Dashboard</h2>
          <p className="text-xs text-slate-400">Continuous biometric telemetry & AI diagnostics</p>
        </div>
      </div>

      {/* Primary Sleep Score Gauge & Overall Assessment */}
      <section className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 flex flex-col items-center shadow-lg">
        <SleepScoreGauge score={analysis?.sleepScore || 0} size={170} />

        <div className="w-full flex justify-between items-center mt-5 px-4 py-2.5 bg-slate-900/70 border border-slate-700/50 rounded-2xl">
          <span className="text-xs text-slate-400">Sleep Efficiency</span>
          <span className="text-base font-bold text-white font-mono">{analysis?.sleepEfficiency}%</span>
        </div>

        <p className="mt-4 text-center text-xs text-slate-300 leading-relaxed max-w-sm">
          {analysis?.overallAssessment}
        </p>
      </section>

      {/* TOP SECTION: If there are ABNORMAL conditions, promote them immediately UP here */}
      {abnormalConditions.length > 0 && (
        <section className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-red-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
              Priority Alerts: Abnormal Conditions Detected
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
              {abnormalConditions.length} Issue{abnormalConditions.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-2.5">
            {abnormalConditions
              .sort((a, b) => {
                const riskOrder = { critical: 0, high: 1, moderate: 2 };
                return (riskOrder[a.risk] ?? 3) - (riskOrder[b.risk] ?? 3);
              })
              .map((condition) => (
                <RiskAlert key={condition.id} condition={condition} />
              ))}
          </div>

          {/* Urgent Clinical Recommendations for these detected abnormalities */}
          {analysis?.tips && analysis.tips.length > 0 && (
            <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-slate-900 border border-amber-500/35 rounded-2xl p-4 space-y-2 shadow-md">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Immediate Action Recommendations
              </h4>
              <ul className="space-y-1.5">
                {analysis.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Vital Signs Grid (Embedded animated heart and respiration pulse) */}
      <section>
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-red-400" />
          Vital Signs
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="Heart Rate"
            value={liveParams.heartRate}
            unit="bpm"
            icon="HeartPulse"
            color="red"
            subtitle="Sleeping pulse rate"
          />
          <MetricCard
            label="Breathing Rate"
            value={liveParams.breathingRate}
            unit="br/min"
            icon="Wind"
            color="cyan"
            subtitle="Respiratory rate"
          />
        </div>
      </section>

      {/* Sleep Dynamics & Airway Grid */}
      <section>
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-violet-400" />
          Sleep Dynamics & Airway Health
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="AHI (Pauses / Hr)"
            value={params.ahi}
            unit="ev/hr"
            icon="AlertCircle"
            color="red"
            subtitle="Apnea-Hypopnea Index"
          />
          <MetricCard
            label="Movement Index"
            value={liveParams.bodyMovement}
            unit="mov/hr"
            icon="Activity"
            color="amber"
            subtitle="Nocturnal motility"
          />
          <MetricCard
            label="Snoring Frequency"
            value={params.snoringPercent}
            unit="%"
            icon="Volume2"
            color="amber"
            subtitle="Acoustic detection"
          />
          <MetricCard
            label="Sleep Duration"
            value={params.sleepDuration}
            unit="hrs"
            icon="Clock"
            color="violet"
            subtitle="Total time asleep"
          />
        </div>
      </section>

      {/* Bedroom Climate & Environment */}
      <section>
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
          Bedroom Climate & Noise
        </h3>
        <div
          className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide touch-pan-x overscroll-x-contain select-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex-shrink-0 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 w-28 flex flex-col items-center justify-center gap-1">
            <Thermometer className="w-5 h-5 text-orange-400" />
            <span className="text-base font-bold text-white tabular-nums">{liveParams.roomTemp}°C</span>
            <span className="text-[9px] text-slate-400 uppercase font-semibold">Temp</span>
          </div>
          <div className="flex-shrink-0 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 w-28 flex flex-col items-center justify-center gap-1">
            <Droplets className="w-5 h-5 text-blue-400" />
            <span className="text-base font-bold text-white tabular-nums">{liveParams.roomHumidity}%</span>
            <span className="text-[9px] text-slate-400 uppercase font-semibold">Humidity</span>
          </div>
          <div className="flex-shrink-0 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 w-28 flex flex-col items-center justify-center gap-1">
            <Volume2 className="w-5 h-5 text-slate-300" />
            <span className="text-base font-bold text-white tabular-nums">{liveParams.ambientNoise} dB</span>
            <span className="text-[9px] text-slate-400 uppercase font-semibold">Noise</span>
          </div>
          <div className="flex-shrink-0 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 w-28 flex flex-col items-center justify-center gap-1">
            <Sun className="w-5 h-5 text-amber-300" />
            <span className="text-base font-bold text-white tabular-nums">{liveParams.ambientLight} lx</span>
            <span className="text-[9px] text-slate-400 uppercase font-semibold">Light</span>
          </div>
        </div>
      </section>

      {/* Charts Section with Mode Switcher */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Biometric Telemetry Graphs
          </h3>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center justify-between p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setGraphMode('live')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              graphMode === 'live'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Last 15 Mins</span>
          </button>
          <button
            onClick={() => setGraphMode('session')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              graphMode === 'session'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Overnight Trend (8h)</span>
          </button>
        </div>

        {/* Heart Rate Chart Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-4 h-72">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400" />
              <h4 className="text-sm font-semibold text-slate-200">Heart Rate Stream</h4>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-white tabular-nums">
                {liveParams.heartRate}
              </span>
              <span className="text-[10px] text-slate-400 ml-1">bpm</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={hrChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 9 }} stroke="#334155" minTickGap={20} />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 9 }}
                stroke="#334155"
                domain={['dataMin - 3', 'dataMax + 3']}
              />
              <Tooltip content={<CustomLiveTooltip unit="bpm" metricName="Heart Rate" />} />
              <ReferenceLine y={60} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.4} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorHr)"
                isAnimationActive={true}
                animationDuration={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Breathing Rate Chart Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-4 h-72">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-semibold text-slate-200">Breathing Rate Stream</h4>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-white tabular-nums">
                {liveParams.breathingRate}
              </span>
              <span className="text-[10px] text-slate-400 ml-1">br/min</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={brChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 9 }} stroke="#334155" minTickGap={20} />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 9 }}
                stroke="#334155"
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip content={<CustomLiveTooltip unit="br/min" metricName="Breathing Rate" />} />
              <ReferenceLine y={15} stroke="#06b6d4" strokeDasharray="3 3" strokeOpacity={0.4} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22d3ee"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorBr)"
                isAnimationActive={true}
                animationDuration={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Sleep Stages & Hypnogram (Architecture) */}
      <SleepStagesCard sleepStages={analysis?.sleepStages} />

      {/* Radar 8-Component Breakdown */}
      <section className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-4 h-72">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          8-Component Scoring Breakdown
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.4}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
              itemStyle={{ color: '#c084fc' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </section>

      {/* BOTTOM SECTION: Full Comprehensive List of All Detected Conditions & Health Breakdown */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <ClipboardList className="w-3.5 h-3.5 text-violet-400" />
          Comprehensive Sleep Health Analysis
        </h3>

        {analysis?.conditions && analysis.conditions.length > 0 ? (
          <div className="space-y-2.5">
            {analysis.conditions
              .sort((a, b) => {
                const riskOrder = { critical: 0, high: 1, moderate: 2, low: 3 };
                return (riskOrder[a.risk] ?? 4) - (riskOrder[b.risk] ?? 4);
              })
              .map((condition) => (
                <RiskAlert key={condition.id} condition={condition} />
              ))}
          </div>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-emerald-300">All Metrics Optimal</h4>
              <p className="text-[11px] text-slate-400">All sleep dynamics and vitals are in normal reference ranges.</p>
            </div>
          </div>
        )}
      </section>

      {/* BOTTOM SECTION: Full Clinical Recommendations & AI Tips */}
      {analysis?.tips && analysis.tips.length > 0 && (
        <section className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            Full Clinical Recommendations & Sleep Optimization
          </h3>
          <ul className="space-y-2">
            {analysis.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-violet-400 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Clinical Disclaimer */}
      <div className="text-center pt-2">
        <p className="text-[10px] text-slate-500 max-w-xs mx-auto leading-relaxed">
          DreamGuard health scoring is calibrated based on AASM, AHA, and NSF clinical guidelines for research and prototype demonstration.
        </p>
      </div>
    </div>
  );
}
