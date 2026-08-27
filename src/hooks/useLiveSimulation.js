import { useState, useEffect, useRef } from 'react';

/**
 * Generates smoothly fluctuating "live" sensor values around the user's base params.
 * Only real-time-readable metrics fluctuate; session-level metrics stay static.
 * Uses layered sine waves for natural, organic-looking oscillation.
 */
export function useLiveSimulation(baseParams, enabled = true) {
  const [liveParams, setLiveParams] = useState({ ...baseParams });
  const timerRef = useRef(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    // Immediately sync with base params
    if (!enabled) {
      setLiveParams({ ...baseParams });
      return;
    }

    const update = () => {
      const t = (Date.now() - startRef.current) / 1000;

      setLiveParams({
        // === REAL-TIME FLUCTUATING METRICS ===

        // Heart rate: ±3 bpm using 3 layered sine waves (natural cardiac variability)
        heartRate: Math.round(
          baseParams.heartRate +
          Math.sin(t * 0.7) * 1.8 +
          Math.sin(t * 1.9 + 0.5) * 0.8 +
          Math.sin(t * 3.3 + 1.2) * 0.4
        ),

        // Breathing rate: ±1.5 br/min (slower oscillation)
        breathingRate: Math.max(0, Math.round(
          baseParams.breathingRate +
          Math.sin(t * 0.35) * 1.0 +
          Math.sin(t * 0.9 + 0.8) * 0.5
        )),

        // Body movement: occasional small spikes
        bodyMovement: Math.max(0, Math.round(
          baseParams.bodyMovement +
          Math.sin(t * 0.12) * 1.2 +
          (Math.sin(t * 0.03) > 0.85 ? 2 : 0) // occasional spike
        )),

        // Room temperature: very slow drift ±0.3°C
        roomTemp: +(
          baseParams.roomTemp +
          Math.sin(t * 0.04) * 0.3
        ).toFixed(1),

        // Room humidity: slow drift ±2%
        roomHumidity: Math.round(
          baseParams.roomHumidity +
          Math.sin(t * 0.06) * 1.5
        ),

        // Ambient noise: ±3 dB fluctuation (environmental sounds)
        ambientNoise: Math.max(15, Math.round(
          baseParams.ambientNoise +
          Math.sin(t * 0.5) * 1.5 +
          Math.sin(t * 1.7 + 0.3) * 1.0
        )),

        // Ambient light: very slow drift ±0.2 lux
        ambientLight: Math.max(0, +(
          baseParams.ambientLight +
          Math.sin(t * 0.05) * 0.15
        ).toFixed(1)),

        // === SESSION-LEVEL METRICS (don't fluctuate in real-time) ===
        snoringPercent: baseParams.snoringPercent,
        ahi: baseParams.ahi,
        sleepDuration: baseParams.sleepDuration,
        sleepOnsetLatency: baseParams.sleepOnsetLatency,
        waso: baseParams.waso,
        awakenings: baseParams.awakenings,
      });

      timerRef.current = setTimeout(update, 1200); // update every 1.2s
    };

    update();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [baseParams, enabled]);

  return liveParams;
}
