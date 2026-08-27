import { useMemo } from 'react';
import { Heart, Wind, Activity, Thermometer, Droplets, Ear, Sun } from 'lucide-react';

/**
 * Animated live monitoring panel.
 * Heart pulses at HR rate, breathing circle expands/contracts at BR rate,
 * environment indicators respond to current values.
 */
export default function LiveIndicators({ liveParams, baseParams }) {
  // Animation durations derived from vital signs
  const heartBeatDuration = useMemo(
    () => Math.max(0.3, 60 / (liveParams.heartRate || 60)),
    [liveParams.heartRate]
  );
  const breathDuration = useMemo(
    () => Math.max(0.5, 60 / (liveParams.breathingRate || 15)),
    [liveParams.breathingRate]
  );

  // Movement intensity (0-1)
  const movementIntensity = Math.min(1, (liveParams.bodyMovement || 0) / 20);

  // Environment quality indicators
  const tempStatus = getTempStatus(liveParams.roomTemp);
  const humidityStatus = getHumidityStatus(liveParams.roomHumidity);
  const noiseStatus = getNoiseStatus(liveParams.ambientNoise);
  const lightStatus = getLightStatus(liveParams.ambientLight);

  return (
    <div className="glass-card p-4 relative overflow-hidden">
      {/* Ambient light glow effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms]"
        style={{
          background: `radial-gradient(ellipse at center, rgba(251, 191, 36, ${Math.min(0.12, liveParams.ambientLight / 80)}) 0%, transparent 70%)`,
          opacity: liveParams.ambientLight > 1 ? 1 : 0,
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 relative">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest">
          Live Monitoring
        </span>
      </div>

      {/* Vital Signs Row */}
      <div className="grid grid-cols-3 gap-3 mb-4 relative">
        {/* Heartbeat */}
        <div className="flex flex-col items-center">
          <div className="relative mb-1.5">
            <Heart
              className="w-7 h-7 text-red-400 fill-red-400/30"
              style={{
                animation: `heartbeat ${heartBeatDuration}s ease-in-out infinite`,
              }}
            />
            {/* ECG-like ring pulse */}
            <div
              className="absolute inset-0 rounded-full border border-red-400/40"
              style={{
                animation: `ping-slow ${heartBeatDuration}s ease-out infinite`,
                transform: 'scale(1.5)',
              }}
            />
          </div>
          <span className="text-xl font-bold text-white tabular-nums transition-all duration-500">
            {liveParams.heartRate}
          </span>
          <span className="text-[9px] text-slate-500 uppercase">bpm</span>
        </div>

        {/* Breathing */}
        <div className="flex flex-col items-center">
          <div className="relative mb-1.5 flex items-center justify-center">
            <div
              className="absolute w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/30"
              style={{
                animation: `breathe ${breathDuration}s ease-in-out infinite`,
              }}
            />
            <Wind className="w-6 h-6 text-cyan-400 relative z-10" />
          </div>
          <span className="text-xl font-bold text-white tabular-nums transition-all duration-500 mt-1">
            {liveParams.breathingRate}
          </span>
          <span className="text-[9px] text-slate-500 uppercase">br/min</span>
        </div>

        {/* Movement */}
        <div className="flex flex-col items-center">
          <div className="mb-1.5">
            <Activity
              className={`w-7 h-7 transition-colors duration-500 ${
                movementIntensity > 0.5 ? 'text-amber-400' : 'text-violet-400'
              }`}
              style={{
                animation: movementIntensity > 0.3
                  ? `shake ${Math.max(0.3, 1 - movementIntensity)}s ease-in-out infinite`
                  : 'none',
              }}
            />
          </div>
          <span className="text-xl font-bold text-white tabular-nums transition-all duration-500">
            {liveParams.bodyMovement}
          </span>
          <span className="text-[9px] text-slate-500 uppercase">mov/hr</span>
        </div>
      </div>

      {/* Environment Row */}
      <div className="grid grid-cols-4 gap-2 relative">
        <EnvIndicator
          icon={Thermometer}
          value={liveParams.roomTemp}
          unit="°C"
          status={tempStatus}
        />
        <EnvIndicator
          icon={Droplets}
          value={liveParams.roomHumidity}
          unit="%"
          status={humidityStatus}
          animate={liveParams.roomHumidity > 60}
        />
        <EnvIndicator
          icon={Ear}
          value={liveParams.ambientNoise}
          unit="dB"
          status={noiseStatus}
        />
        <EnvIndicator
          icon={Sun}
          value={liveParams.ambientLight}
          unit="lx"
          status={lightStatus}
          glow={liveParams.ambientLight > 5}
        />
      </div>
    </div>
  );
}

function EnvIndicator({ icon: Icon, value, unit, status, animate, glow }) {
  return (
    <div className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-700 ${
      status === 'good' ? 'bg-emerald-400/5' :
      status === 'warn' ? 'bg-amber-400/5' :
      status === 'bad' ? 'bg-red-400/5' : ''
    }`}>
      <Icon
        className={`w-4 h-4 mb-1 transition-colors duration-700 ${
          status === 'good' ? 'text-emerald-400' :
          status === 'warn' ? 'text-amber-400' :
          status === 'bad' ? 'text-red-400' : 'text-slate-400'
        } ${animate ? 'animate-bounce-subtle' : ''} ${glow ? 'drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]' : ''}`}
      />
      <span className="text-sm font-bold text-white tabular-nums transition-all duration-500">
        {value}
      </span>
      <span className="text-[8px] text-slate-500">{unit}</span>
    </div>
  );
}

// --- Status helpers ---
function getTempStatus(temp) {
  if (temp >= 18 && temp <= 22) return 'good';
  if (temp >= 15 && temp <= 26) return 'warn';
  return 'bad';
}
function getHumidityStatus(h) {
  if (h >= 30 && h <= 50) return 'good';
  if (h >= 20 && h <= 60) return 'warn';
  return 'bad';
}
function getNoiseStatus(n) {
  if (n <= 30) return 'good';
  if (n <= 45) return 'warn';
  return 'bad';
}
function getLightStatus(l) {
  if (l <= 1) return 'good';
  if (l <= 5) return 'warn';
  return 'bad';
}
