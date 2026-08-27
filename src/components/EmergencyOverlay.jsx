import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  Phone,
  X,
  Volume2,
  VolumeX,
  ShieldCheck,
  Radio,
  CheckCircle,
  MapPin,
  MessageSquare,
  RotateCcw,
  Info,
} from 'lucide-react';
import { useSleep } from '../context/SleepContext';

export default function EmergencyOverlay({ emergency, onDismiss }) {
  const { emergencyConfig, liveParams, params } = useSleep();
  const initialSeconds = emergencyConfig?.countdownSeconds || 30;
  const [countdown, setCountdown] = useState(initialSeconds);
  const [isMuted, setIsMuted] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);

  const audioCtxRef = useRef(null);
  const soundIntervalRef = useRef(null);

  // Reset state when emergency opens
  useEffect(() => {
    if (emergency?.isEmergency) {
      setIsDispatched(false);
      setCountdown(initialSeconds);
    }
  }, [emergency?.isEmergency, initialSeconds]);

  // Synthesized Alarm Siren (Web Audio API)
  useEffect(() => {
    if (!emergency?.isEmergency || isMuted || !emergencyConfig?.audioAlarmEnabled || isDispatched) {
      if (soundIntervalRef.current) clearInterval(soundIntervalRef.current);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();

        const playTone = (freq, duration, type = 'sine') => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
          gain.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + duration);
          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);
          osc.start();
          osc.stop(audioCtxRef.current.currentTime + duration);
        };

        const playAlarmSequence = () => {
          playTone(880, 0.25, 'sawtooth');
          setTimeout(() => playTone(660, 0.25, 'sawtooth'), 300);
        };

        playAlarmSequence();
        soundIntervalRef.current = setInterval(playAlarmSequence, 1000);
      }
    } catch (e) {
      console.warn('Web Audio alarm error:', e);
    }

    return () => {
      if (soundIntervalRef.current) clearInterval(soundIntervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, [emergency, isMuted, emergencyConfig?.audioAlarmEnabled, isDispatched]);

  // Countdown Timer (When reaching 0 -> Switch to Simulation Dispatched View)
  useEffect(() => {
    if (!emergency?.isEmergency || isDispatched) return;

    setCountdown(initialSeconds);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsDispatched(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [emergency, initialSeconds, isDispatched]);

  if (!emergency?.isEmergency) return null;

  const dispatchNumber = emergencyConfig?.dispatchNumber || '1669';
  const primaryPhone = emergencyConfig?.primaryPhone || '+66 81 234 5678';
  const primaryName = emergencyConfig?.primaryName || 'Jane Doe (Spouse)';
  const secondaryPhone = emergencyConfig?.secondaryPhone || '+66 89 876 5432';
  const secondaryName = emergencyConfig?.secondaryName || 'Dr. Somchai (Physician)';

  const handleDismiss = () => {
    setIsDispatched(false);
    onDismiss();
  };

  const handleTriggerDispatchSimulation = () => {
    setIsDispatched(true);
  };

  // --------------------------------------------------------------------------
  // SCREEN 2: SIMULATED DISPATCH SCREEN (Prototype Demo Mode)
  // --------------------------------------------------------------------------
  if (isDispatched) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-fade-in overflow-y-auto">
        <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-3xl w-full max-w-sm p-6 flex flex-col items-center text-center shadow-[0_0_60px_rgba(16,185,129,0.3)] relative z-10 animate-slide-up my-auto">
          {/* Top-Right Quick Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
            title="Dismiss and return"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Success Icon */}
          <div className="bg-emerald-500/20 p-4 rounded-full mb-3 border border-emerald-500/40 relative">
            <ShieldCheck className="w-12 h-12 text-emerald-400" />
          </div>

          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold uppercase tracking-wider mb-2 border border-emerald-500/40">
            Prototype Demo Simulation
          </span>

          <h2 className="text-xl font-black text-white mb-1">
            Emergency Dispatch Simulated
          </h2>

          {/* Prototype disclaimer notice */}
          <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 mb-3.5 text-left flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-200 leading-snug">
              <strong>Notice:</strong> This is a prototype demo. <u>No actual phone call or emergency service was dialed</u>.
            </p>
          </div>

          {/* Simulated Actions Breakdown */}
          <div className="w-full bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/80 text-left space-y-2.5 mb-4 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold border-b border-slate-700 pb-1.5">
              <Radio className="w-4 h-4" />
              <span>In real deployment, DreamGuard executes:</span>
            </div>

            <div className="flex items-start gap-2 text-slate-300 text-[11px]">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Auto-Dial Medical Dispatch:</strong>
                <p className="text-slate-400">Emergency voice call initiated to <strong>{dispatchNumber}</strong> with automated TTS speech synthesizer.</p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-slate-300 text-[11px]">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Priority SMS & Push Alerts:</strong>
                <p className="text-slate-400">Sent to <strong>{primaryName}</strong> ({primaryPhone}) & <strong>{secondaryName}</strong>.</p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-slate-300 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Biometric Telemetry Stream:</strong>
                <p className="text-slate-400">Sent HR: {liveParams.heartRate} bpm, BR: {liveParams.breathingRate} br/min & GPS coordinates.</p>
              </div>
            </div>
          </div>

          {/* Dismiss and Reset Button */}
          <button
            onClick={handleDismiss}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/40 text-xs"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Simulation & Return to Normal
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 1: ACTIVE EMERGENCY COUNTDOWN ALERT
  // --------------------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/95 backdrop-blur-lg">
      <div className="absolute inset-0 bg-red-600/15 animate-pulse pointer-events-none" />

      <div className="bg-slate-900 border-2 border-red-500 rounded-3xl w-full max-w-sm p-6 flex flex-col items-center text-center shadow-[0_0_60px_rgba(239,68,68,0.5)] relative z-10 animate-slide-up">
        {/* Top-Right Quick Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
          title="Dismiss Alert"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Pulsing Alarm Icon */}
        <div className="bg-red-500/25 p-4 rounded-full mb-3 animate-pulse relative">
          <span className="absolute inset-0 rounded-full border border-red-400/60 animate-ping" />
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>

        {/* Alarm Controls: Mute Siren Sound */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
              isMuted
                ? 'bg-slate-800 border-slate-700 text-slate-400'
                : 'bg-red-900/40 border-red-500/40 text-red-300'
            }`}
            title="Toggle siren sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="text-[10px]">{isMuted ? 'Alarm Muted' : 'Siren Active'}</span>
          </button>
        </div>

        <h2 className="text-2xl font-black text-white tracking-wide mb-1">EMERGENCY ALERT</h2>
        <h3 className="text-sm font-semibold text-red-400 mb-3 px-3 py-1 bg-red-950/60 rounded-full border border-red-800">
          {emergency.type}
        </h3>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">{emergency.message}</p>

        {/* Countdown Box */}
        <div className="w-full bg-red-950/70 rounded-2xl p-3.5 mb-4 border border-red-800/80">
          <p className="text-red-400 font-mono font-bold text-base mb-2">
            🚨 Auto-Dispatch in {countdown}s...
          </p>
          <ul className="text-[11px] text-slate-400 text-left space-y-1 list-disc pl-4">
            <li>Dispatch destination: <strong>{dispatchNumber}</strong></li>
            <li>Alerting {primaryName} ({primaryPhone})</li>
            {emergencyConfig?.autoLocationSharing && <li>Sharing GPS location with responders</li>}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2.5">
          <button
            className="w-full bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/40 text-xs"
            onClick={handleTriggerDispatchSimulation}
          >
            <Phone className="w-4 h-4" />
            Simulate Immediate Dispatch Call
          </button>

          <button
            className="w-full bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-slate-700 text-xs"
            onClick={handleDismiss}
          >
            <X className="w-4 h-4" />
            Cancel & Reset Alert
          </button>
        </div>

        <div className="mt-4 p-2 bg-slate-900/80 rounded-lg">
          <p className="text-[9px] text-slate-500">
            Prototype mode: No actual phone calls are placed to emergency services.
          </p>
        </div>
      </div>
    </div>
  );
}
