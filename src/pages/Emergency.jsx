import React, { useState } from 'react';
import { useSleep } from '../context/SleepContext';
import {
  Shield,
  Activity,
  Zap,
  BatteryFull,
  HeartPulse,
  Wind,
  AlertCircle,
  Eye,
  Wifi,
  Power,
  Phone,
  User,
  Clock,
  Volume2,
  MapPin,
  RotateCcw,
  Check,
  Settings,
  Sparkles,
} from 'lucide-react';
import EmergencyOverlay from '../components/EmergencyOverlay';

const COUNTRY_PRESETS = [
  { label: '🇹🇭 Thailand', number: '1669', desc: 'National Medical Emergency' },
  { label: '🇺🇸 USA / CA', number: '911', desc: 'Emergency Dispatch' },
  { label: '🇪🇺 Europe', number: '112', desc: 'EU Emergency Service' },
  { label: '🇬🇧 UK', number: '999', desc: 'Emergency Services' },
];

export default function Emergency() {
  const {
    analysis,
    applyPreset,
    resetToDefault,
    emergencyConfig,
    updateEmergencyConfig,
    resetEmergencyConfig,
    autoCrossCoupling,
    setAutoCrossCoupling,
  } = useSleep();

  const isEmergency = analysis?.emergency?.isEmergency;
  const [savedBadge, setSavedBadge] = useState(false);

  const handleFieldChange = (key, value) => {
    updateEmergencyConfig(key, value);
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <EmergencyOverlay emergency={analysis?.emergency} onDismiss={resetToDefault} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-violet-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Settings & Safety</h2>
            <p className="text-xs text-slate-400">Configure simulation dynamics, safety thresholds & dispatch</p>
          </div>
        </div>
        {savedBadge && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 animate-fade-in font-medium">
            <Check className="w-3 h-3" /> Auto-saved
          </span>
        )}
      </div>

      {/* Active Critical Emergency Alert Banner (only visible during an active emergency) */}
      {isEmergency && (
        <div className="p-4 rounded-2xl border bg-red-500/20 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] backdrop-blur-xl animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-red-500 animate-pulse" />
            <h3 className="font-semibold text-red-400">CRITICAL ALERT DETECTED</h3>
          </div>
          <p className="text-sm text-red-200 mt-1">{analysis?.emergency?.message}</p>
        </div>
      )}

      {/* Test Emergency Button */}
      <button
        onClick={() => applyPreset('emergency')}
        className="w-full bg-gradient-to-r from-red-600/30 to-rose-600/30 hover:from-red-600/40 hover:to-rose-600/40 border border-red-500/50 text-red-300 font-bold py-4 px-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-95"
      >
        <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
        <span>Test Emergency Alert (Audio Siren & Visual Strobe)</span>
      </button>

      {/* Simulation AI Dynamics & Body Reaction Settings */}
      <section className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-slate-700/50 pb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Simulation Biology Dynamics
        </h3>

        <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 cursor-pointer">
          <div className="flex items-start gap-2.5 text-xs pr-3">
            <Activity className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white text-xs">
                Connected Body Vitals (Realistic Reaction)
              </div>
              <p className="text-[10px] text-slate-400 leading-snug mt-0.5">
                When you adjust one vital (like breathing or temperature), connected vitals naturally react based on real human biology.
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={autoCrossCoupling}
            onChange={(e) => setAutoCrossCoupling(e.target.checked)}
            className="w-4 h-4 rounded text-cyan-500 accent-cyan-500 focus:ring-0 cursor-pointer shrink-0"
          />
        </label>
      </section>

      {/* Emergency Contacts Configuration (Fully Editable) */}
      <section className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-violet-400" />
            Emergency Contacts & Dispatch
          </h3>
          <button
            onClick={resetEmergencyConfig}
            className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
            title="Reset to default contacts"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Primary Contact */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-violet-400" />
            Primary Contact (Family / Caregiver)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={emergencyConfig?.primaryName || ''}
              onChange={(e) => handleFieldChange('primaryName', e.target.value)}
              placeholder="Contact Name (e.g. Jane Doe)"
              className="bg-slate-900 border border-slate-700 focus:border-violet-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition-colors"
            />
            <input
              type="tel"
              value={emergencyConfig?.primaryPhone || ''}
              onChange={(e) => handleFieldChange('primaryPhone', e.target.value)}
              placeholder="Phone Number (+66 ...)"
              className="bg-slate-900 border border-slate-700 focus:border-violet-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition-colors"
            />
          </div>
        </div>

        {/* Secondary Contact */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            Secondary Contact (Physician / Alternate)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={emergencyConfig?.secondaryName || ''}
              onChange={(e) => handleFieldChange('secondaryName', e.target.value)}
              placeholder="Contact Name"
              className="bg-slate-900 border border-slate-700 focus:border-violet-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition-colors"
            />
            <input
              type="tel"
              value={emergencyConfig?.secondaryPhone || ''}
              onChange={(e) => handleFieldChange('secondaryPhone', e.target.value)}
              placeholder="Phone Number"
              className="bg-slate-900 border border-slate-700 focus:border-violet-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition-colors"
            />
          </div>
        </div>

        {/* Dispatch Hotlines */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-red-400" />
            Emergency Services Hotline Preset
          </label>
          <div className="grid grid-cols-2 gap-2">
            {COUNTRY_PRESETS.map((preset) => (
              <button
                key={preset.number}
                type="button"
                onClick={() => {
                  handleFieldChange('dispatchNumber', preset.number);
                  handleFieldChange('dispatchLabel', `${preset.number} (${preset.label})`);
                }}
                className={`p-2 rounded-xl border text-left text-xs transition-all ${
                  emergencyConfig?.dispatchNumber === preset.number
                    ? 'bg-violet-600/30 border-violet-500 text-white shadow-sm'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-white">{preset.label}</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {preset.number} • {preset.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Response Preferences & Hardware Alert Settings */}
      <section className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-slate-700/50 pb-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Alert Response Preferences
        </h3>

        {/* Countdown Duration */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Auto-Call Countdown Delay
            </span>
            <span className="font-bold text-violet-400 font-mono">
              {emergencyConfig?.countdownSeconds || 30} seconds
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[15, 30, 45, 60].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => handleFieldChange('countdownSeconds', sec)}
                className={`py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  emergencyConfig?.countdownSeconds === sec
                    ? 'bg-violet-600 border-violet-500 text-white shadow-md'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Switches */}
        <div className="space-y-2.5 pt-2 border-t border-slate-700/50">
          {/* Siren Sound */}
          <label className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-700/50 cursor-pointer">
            <div className="flex items-center gap-2 text-xs">
              <Volume2 className="w-4 h-4 text-red-400" />
              <div>
                <div className="font-medium text-white">Synthesized Siren Sound</div>
                <div className="text-[10px] text-slate-400">Audible alarm via device speakers</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={emergencyConfig?.audioAlarmEnabled ?? true}
              onChange={(e) => handleFieldChange('audioAlarmEnabled', e.target.checked)}
              className="w-4 h-4 rounded text-violet-600 accent-violet-600 focus:ring-0 cursor-pointer"
            />
          </label>

          {/* GPS Sharing */}
          <label className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-700/50 cursor-pointer">
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="font-medium text-white">GPS Location Sharing</div>
                <div className="text-[10px] text-slate-400">Transmit bedroom coordinates to dispatch</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={emergencyConfig?.autoLocationSharing ?? true}
              onChange={(e) => handleFieldChange('autoLocationSharing', e.target.checked)}
              className="w-4 h-4 rounded text-violet-600 accent-violet-600 focus:ring-0 cursor-pointer"
            />
          </label>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">System Capabilities</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl">
            <Eye className="w-5 h-5 text-violet-400 mb-2" />
            <h4 className="text-xs font-bold text-white mb-1">Continuous Monitoring</h4>
            <p className="text-[10px] text-slate-400">Sensor monitors vitals every second without body contact</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl">
            <Activity className="w-5 h-5 text-cyan-400 mb-2" />
            <h4 className="text-xs font-bold text-white mb-1">Anomaly Detection</h4>
            <p className="text-[10px] text-slate-400">AI recognizes apnea, bradycardia, and unresponsiveness</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl">
            <Zap className="w-5 h-5 text-amber-400 mb-2" />
            <h4 className="text-xs font-bold text-white mb-1">Auto-Alert Protocol</h4>
            <p className="text-[10px] text-slate-400">Triggers siren, strobe, and contacts dispatch</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl">
            <BatteryFull className="w-5 h-5 text-emerald-400 mb-2" />
            <h4 className="text-xs font-bold text-white mb-1">Backup Power</h4>
            <p className="text-[10px] text-slate-400">6-hour internal battery protects during blackout</p>
          </div>
        </div>
      </section>

      {/* Emergency Thresholds */}
      <section>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Emergency Triggers</h3>
        <div className="space-y-2">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">
            <HeartPulse className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-200">Heart Rate {'<'} 30 bpm or {'>'} 150 bpm</p>
              <p className="text-[10px] text-slate-500">Ref: AHA Guidelines for Bradycardia/Tachycardia</p>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">
            <Wind className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-200">Breathing Rate ≤ 3 breaths/min</p>
              <p className="text-[10px] text-slate-500">Ref: Clinical respiratory failure threshold</p>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-200">AHI {'>'} 50 events/hr or Unresponsive</p>
              <p className="text-[10px] text-slate-500">Ref: Severe Obstructive Sleep Apnea / Immobility</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
