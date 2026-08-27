import { createContext, useContext, useState, useMemo, useEffect, useRef } from 'react';
import { PRESETS, analyzeSleep } from '../data/sleepAnalysis';
import { calculatePhysiologicalCoupling } from '../data/physiologicalCoupling';

const SleepContext = createContext(null);

// Generate initial 15-second historical telemetry data points
function generateInitialTelemetry(baseParams, count = 20) {
  const now = Date.now();
  const data = [];
  for (let i = count - 1; i >= 0; i--) {
    const timestamp = now - i * 15000;
    const date = new Date(timestamp);
    const wanderHR = Math.sin(i * 0.7) * 1.5;
    const wanderBR = Math.sin(i * 0.5) * 0.4;

    data.push({
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      timestamp,
      heartRate: Math.max(25, Math.round(baseParams.heartRate + wanderHR)),
      breathingRate: Math.max(2, +(baseParams.breathingRate + wanderBR).toFixed(1)),
      bodyMovement: Math.max(0, Math.round(baseParams.bodyMovement + (Math.sin(i * 0.3) > 0.85 ? 1 : 0))),
      roomTemp: +(baseParams.roomTemp + Math.sin(i * 0.1) * 0.2).toFixed(1),
      roomHumidity: Math.round(baseParams.roomHumidity + Math.sin(i * 0.2) * 1),
    });
  }
  return data;
}

const defaultEmergencyConfig = {
  primaryName: 'Jane Doe (Spouse)',
  primaryPhone: '+66 81 234 5678',
  secondaryName: 'Dr. Somchai (Physician)',
  secondaryPhone: '+66 89 876 5432',
  dispatchNumber: '1669',
  dispatchLabel: '1669 (Medical Emergency)',
  countdownSeconds: 30,
  vibrationEnabled: true,
  audioAlarmEnabled: true,
  autoLocationSharing: true,
};

export function SleepProvider({ children }) {
  const [params, setParams] = useState({ ...PRESETS.healthy.params });
  const [activePreset, setActivePreset] = useState('healthy');

  // Editable Emergency Configuration with localStorage persistence
  const [emergencyConfig, setEmergencyConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('dreamguard_emergency_config');
      return saved ? { ...defaultEmergencyConfig, ...JSON.parse(saved) } : defaultEmergencyConfig;
    } catch (e) {
      return defaultEmergencyConfig;
    }
  });

  const updateEmergencyConfig = (key, value) => {
    setEmergencyConfig((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem('dreamguard_emergency_config', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const resetEmergencyConfig = () => {
    setEmergencyConfig(defaultEmergencyConfig);
    try {
      localStorage.removeItem('dreamguard_emergency_config');
    } catch (e) {}
  };

  // Live fluctuating sensor state
  const [liveParams, setLiveParams] = useState({ ...PRESETS.healthy.params });

  // 15-second recorded telemetry stream (up to 60 samples = 15 minutes of live telemetry)
  const [telemetryHistory, setTelemetryHistory] = useState(() =>
    generateInitialTelemetry(PRESETS.healthy.params, 30)
  );

  // Countdown timer in seconds (15 -> 0)
  const [countdown, setCountdown] = useState(15);
  const [lastSampleTime, setLastSampleTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  const startRef = useRef(Date.now());
  const liveParamsRef = useRef(liveParams);
  liveParamsRef.current = liveParams;

  // 1. Live fluctuation engine (runs every 1.2s to fluctuate around user's base params)
  useEffect(() => {
    const interval = setInterval(() => {
      const t = (Date.now() - startRef.current) / 1000;

      setLiveParams({
        // Heart rate: natural sinus arrhythmia ±2.5 bpm
        heartRate: Math.round(
          params.heartRate +
          Math.sin(t * 0.7) * 1.8 +
          Math.sin(t * 1.9 + 0.5) * 0.8 +
          Math.sin(t * 3.3 + 1.2) * 0.4
        ),

        // Breathing rate: gentle respiratory oscillation ±1 br/min
        breathingRate: Math.max(0, +(
          params.breathingRate +
          Math.sin(t * 0.35) * 0.8 +
          Math.sin(t * 0.9 + 0.8) * 0.4
        ).toFixed(1)),

        // Body movement
        bodyMovement: Math.max(0, Math.round(
          params.bodyMovement +
          Math.sin(t * 0.12) * 1.0 +
          (Math.sin(t * 0.03) > 0.85 ? 2 : 0)
        )),

        // Environmental metrics
        roomTemp: +(params.roomTemp + Math.sin(t * 0.04) * 0.25).toFixed(1),
        roomHumidity: Math.round(params.roomHumidity + Math.sin(t * 0.06) * 1.5),
        ambientNoise: Math.max(15, Math.round(params.ambientNoise + Math.sin(t * 0.5) * 1.5 + Math.sin(t * 1.7) * 0.8)),
        ambientLight: Math.max(0, +(params.ambientLight + Math.sin(t * 0.05) * 0.15).toFixed(1)),

        // Session constants
        snoringPercent: params.snoringPercent,
        ahi: params.ahi,
        sleepDuration: params.sleepDuration,
        sleepOnsetLatency: params.sleepOnsetLatency,
        waso: params.waso,
        awakenings: params.awakenings,
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [params]);

  // 2. Continuous 15-Second Telemetry Recorder Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Time to record a new 15-second telemetry point!
          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const currentLive = liveParamsRef.current;

          const newPoint = {
            time: timeStr,
            timestamp: now.getTime(),
            heartRate: currentLive.heartRate,
            breathingRate: currentLive.breathingRate,
            bodyMovement: currentLive.bodyMovement,
            roomTemp: currentLive.roomTemp,
            roomHumidity: currentLive.roomHumidity,
          };

          setTelemetryHistory((history) => [...history.slice(-59), newPoint]);
          setLastSampleTime(timeStr);
          return 15; // reset countdown to 15 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Manual immediate sample trigger
  const recordImmediateSample = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const currentLive = liveParamsRef.current;

    const newPoint = {
      time: timeStr,
      timestamp: now.getTime(),
      heartRate: currentLive.heartRate,
      breathingRate: currentLive.breathingRate,
      bodyMovement: currentLive.bodyMovement,
      roomTemp: currentLive.roomTemp,
      roomHumidity: currentLive.roomHumidity,
    };

    setTelemetryHistory((history) => [...history.slice(-59), newPoint]);
    setLastSampleTime(timeStr);
    setCountdown(15);
  };

  const analysis = useMemo(() => analyzeSleep(params), [params]);

  // Immediately release touch/mouse focus whenever an emergency is triggered
  useEffect(() => {
    if (analysis?.emergency?.isEmergency) {
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    }
  }, [analysis?.emergency?.isEmergency]);

  // Connected Body Vitals (Realistic Reaction) toggle — ON by default with localStorage persistence
  const [autoCrossCoupling, setAutoCrossCouplingState] = useState(() => {
    try {
      const saved = localStorage.getItem('dreamguard_cross_coupling');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  const setAutoCrossCoupling = (val) => {
    setAutoCrossCouplingState(val);
    try {
      localStorage.setItem('dreamguard_cross_coupling', JSON.stringify(val));
    } catch (e) {}
  };

  const [recentCouplings, setRecentCouplings] = useState([]);

  const dismissCouplingAlert = () => setRecentCouplings([]);

  const updateParam = (key, value) => {
    // If emergency alert is currently active, freeze slider inputs so holding/dragging cannot dismiss it
    if (analysis?.emergency?.isEmergency) return;
    setActivePreset(null);
    const numVal = Number(value);

    if (autoCrossCoupling) {
      const { nextParams, couplings } = calculatePhysiologicalCoupling(params, key, numVal);
      setParams(nextParams);
      setRecentCouplings(couplings);
    } else {
      setParams((prev) => ({ ...prev, [key]: numVal }));
      setRecentCouplings([]);
    }
  };

  const applyPreset = (presetKey) => {
    setActivePreset(presetKey);
    setRecentCouplings([]);
    setParams({ ...PRESETS[presetKey].params });
  };

  const resetToDefault = () => applyPreset('healthy');

  const value = {
    params,
    setParams,
    liveParams,
    updateParam,
    analysis,
    activePreset,
    applyPreset,
    resetToDefault,
    telemetryHistory,
    countdown,
    lastSampleTime,
    recordImmediateSample,
    emergencyConfig,
    updateEmergencyConfig,
    resetEmergencyConfig,
    autoCrossCoupling,
    setAutoCrossCoupling,
    recentCouplings,
    dismissCouplingAlert,
  };

  return (
    <SleepContext.Provider value={value}>
      {children}
    </SleepContext.Provider>
  );
}

export function useSleep() {
  const context = useContext(SleepContext);
  if (!context) throw new Error('useSleep must be used within SleepProvider');
  return context;
}
