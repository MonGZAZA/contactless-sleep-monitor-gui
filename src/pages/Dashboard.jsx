import React, { useState, useMemo } from 'react';
import { useSleep } from '../context/SleepContext';
import SleepScoreGauge from '../components/SleepScoreGauge';
import MetricCard from '../components/MetricCard';
import LiveIndicators from '../components/LiveIndicators';
import {
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  Thermometer,
  Droplets,
  Volume2,
  Sun,
  Radio,
  Clock,
  Activity,
  Heart,
  Wind,
} from 'lucide-react';

// Clinically realistic overnight physiological time-series generator (8-hour sleep session)
const generatePhysiologicalTimeSeries = (baseValue, metricType, ahi = 0, count = 17) => {
  const data = [];
  const isHR = metricType === 'hr';
  const dipDepth = isHR ? Math.max(3, baseValue * 0.08) : Math.max(0.8, baseValue * 0.05);

  for (let i = 0; i < count; i++) {
    const progress = i / (count - 1);
    const dipFactor = 4 * Math.pow(progress - 0.55, 2);
    const circadianBaseline = baseValue - dipDepth * (1 - Math.min(1, dipFactor));
    const remCycle = Math.sin(progress * Math.PI * 8 - 0.5) * (isHR ? 2.2 : 0.5);

    let apneaSurge = 0;
    if (ahi > 5) {
      const surgeTrigger = Math.sin(i * 2.8 + ahi);
      if (surgeTrigger > 0.35) {
        apneaSurge = (Math.min(ahi, 45) / 30) * (isHR ? 5.5 : 1.8) * (surgeTrigger - 0.35);
      }
    }

    const microWander = Math.sin(i * 0.9 + 1.4) * (isHR ? 0.7 : 0.2);
    const calculated = circadianBaseline + remCycle + apneaSurge + microWander;
    const finalVal = isHR ? Math.round(calculated) : +(calculated.toFixed(1));

    const hour = (23 + Math.floor(i / 2)) % 24;
    const minute = i % 2 === 0 ? '00' : '30';
    const timeStr = `${String(hour).padStart(2, '0')}:${minute}`;

    data.push({
      time: timeStr,
      value: Math.max(isHR ? 25 : 2, finalVal),
    });
  }

  return data;
};

// Custom Tooltip for Live 15s Stream
const CustomLiveTooltip = ({ active, payload, label, unit, metricName }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 p-2.5 rounded-xl shadow-xl backdrop-blur-md text-xs">
        <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-violet-400" />
          <span>Recorded at {label}</span>
        </div>
        <div className="flex items-baseline gap-1.5 font-bold">
          <span className="text-white">{metricName}:</span>
          <span className="text-violet-400 text-sm">{value}</span>
          <span className="text-slate-400 text-[10px]">{unit}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const {
    params,
    analysis,
    liveParams,
    telemetryHistory,
  } = useSleep();

  // Mode: 'live' (15s real-time telemetry stream) or 'session' (full 8-hour overnight trend)
  const [graphMode, setGraphMode] = useState('live');

  const radarData = useMemo(() => {
    if (!analysis?.subScores) return [];
    return [
      { subject: 'Heart Rate', score: analysis.subScores.heartRate },
      { subject: 'Breathing', score: analysis.subScores.breathingRate },
      { subject: 'Movement', score: analysis.subScores.movement },
      { subject: 'Snoring', score: analysis.subScores.snoring },
      { subject: 'AHI', score: analysis.subScores.ahi },
      { subject: 'Duration', score: analysis.subScores.duration },
      { subject: 'Efficiency', score: analysis.subScores.efficiency },
      { subject: 'Environment', score: analysis.subScores.environment },
    ];
  }, [analysis]);

  // Full overnight session 8-hour data
  const sessionHrData = useMemo(
    () => generatePhysiologicalTimeSeries(params.heartRate, 'hr', params.ahi),
    [params.heartRate, params.ahi]
  );
  const sessionBrData = useMemo(
    () => generatePhysiologicalTimeSeries(params.breathingRate, 'br', params.ahi),
    [params.breathingRate, params.ahi]
  );

  // Live 15s telemetry stream mapped for Recharts
  const liveHrData = useMemo(() => {
    return telemetryHistory.map((pt) => ({
      time: pt.time,
      value: pt.heartRate,
    }));
  }, [telemetryHistory]);

  const liveBrData = useMemo(() => {
    return telemetryHistory.map((pt) => ({
      time: pt.time,
      value: pt.breathingRate,
    }));
  }, [telemetryHistory]);

  const hrChartData = graphMode === 'live' ? liveHrData : sessionHrData;
  const brChartData = graphMode === 'live' ? liveBrData : sessionBrData;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Sleep Dashboard</h2>
          <p className="text-xs text-slate-400">Continuous telemetry & sleep health insights</p>
        </div>
      </div>

      {/* Sleep Score Banner */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 flex flex-col items-center">
        <SleepScoreGauge score={analysis?.sleepScore || 0} size={160} />
      </div>

      {/* Live Monitoring Pulse Panel */}
      <LiveIndicators liveParams={liveParams} baseParams={params} />

      {/* Radar Analysis */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-4 h-72">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Component Analysis</h3>
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
      </div>

      {/* Vital Signs Grid */}
      <div>
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-red-400" />
          Vital Signs
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard label="Heart Rate" value={liveParams.heartRate} unit="bpm" icon="HeartPulse" color="red" subtitle="Pulse via Ballistocardiography" />
          <MetricCard label="Breathing Rate" value={liveParams.breathingRate} unit="br/min" icon="Wind" color="cyan" subtitle="Chest wall respiratory motion" />
        </div>
      </div>

      {/* Sleep Dynamics & Airway Grid */}
      <div>
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-violet-400" />
          Sleep Dynamics & Airway
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricCard label="Apnea-Hypopnea Index" value={params.ahi} unit="ev/hr" icon="AlertCircle" color="red" subtitle="AHI — Breathing pauses/hr" />
          <MetricCard label="Movement Index" value={liveParams.bodyMovement} unit="mov/hr" icon="Activity" color="amber" subtitle="Nocturnal motility" />
          <MetricCard label="Snoring" value={params.snoringPercent} unit="%" icon="Volume2" color="amber" subtitle="Acoustic detection" />
          <MetricCard label="Efficiency" value={analysis?.sleepEfficiency} unit="%" icon="Zap" color="emerald" subtitle="Time asleep / bed time" />
        </div>
      </div>

      {/* Charts Section with Mode Switcher */}
      <div className="space-y-4">
        {/* Mode Switcher Tabs */}
        <div className="flex items-center justify-between p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setGraphMode('live')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
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
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
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
              <h3 className="text-sm font-semibold text-slate-200">Heart Rate</h3>
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
              <Tooltip
                content={
                  <CustomLiveTooltip
                    unit="bpm"
                    metricName="Heart Rate"
                  />
                }
              />
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
              <h3 className="text-sm font-semibold text-slate-200">Breathing Rate</h3>
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
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 9 }} stroke="#334155" minTickGap={20} />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 9 }}
                stroke="#334155"
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip
                content={
                  <CustomLiveTooltip
                    unit="br/min"
                    metricName="Breathing Rate"
                  />
                }
              />
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
      </div>

      {/* Environment Summary */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Room Environment</h3>
        <div
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide touch-pan-x overscroll-x-contain select-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex-shrink-0 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 w-32 flex flex-col items-center justify-center gap-2">
            <Thermometer className="w-6 h-6 text-orange-400" />
            <span className="text-lg font-bold text-white tabular-nums">{liveParams.roomTemp}°C</span>
            <span className="text-[10px] text-slate-400 uppercase">Temperature</span>
          </div>
          <div className="flex-shrink-0 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 w-32 flex flex-col items-center justify-center gap-2">
            <Droplets className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-white tabular-nums">{liveParams.roomHumidity}%</span>
            <span className="text-[10px] text-slate-400 uppercase">Humidity</span>
          </div>
          <div className="flex-shrink-0 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 w-32 flex flex-col items-center justify-center gap-2">
            <Volume2 className="w-6 h-6 text-slate-300" />
            <span className="text-lg font-bold text-white tabular-nums">{liveParams.ambientNoise} dB</span>
            <span className="text-[10px] text-slate-400 uppercase">Noise</span>
          </div>
          <div className="flex-shrink-0 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 w-32 flex flex-col items-center justify-center gap-2">
            <Sun className="w-6 h-6 text-amber-300" />
            <span className="text-lg font-bold text-white tabular-nums">{liveParams.ambientLight} lx</span>
            <span className="text-[10px] text-slate-400 uppercase">Light</span>
          </div>
        </div>
      </div>
    </div>
  );
}
