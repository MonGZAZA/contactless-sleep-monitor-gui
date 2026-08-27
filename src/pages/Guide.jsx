import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  SlidersHorizontal,
  BarChart3,
  Shield,
  Heart,
  Wind,
  Activity,
  AlertTriangle,
  Zap,
  Phone,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Volume2,
  ShieldAlert,
  ClipboardList,
  Settings,
} from 'lucide-react';

export default function Guide() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-violet-900/40 via-indigo-900/30 to-slate-900/60 border border-violet-700/40 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">How This Companion App Works</h2>
            <p className="text-xs text-violet-300">Interactive User Manual & Prototype Walkthrough</p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mt-2">
          This web app is a <strong>companion prototype</strong> for DreamGuard — a <strong>contactless bedside health monitor</strong>. It allows you to simulate any sleeper condition and observe how AI analyzes vitals, calculates sleep scores, detects abnormalities, and triggers emergency protocols in real time.
        </p>
      </div>

      {/* Important Clinical & Baseline Remark */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-900/80 border border-amber-500/30 rounded-2xl p-4 space-y-2 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <h4 className="text-xs font-bold text-amber-300">
            Clinical Note: Individual Baselines & Personalized Suggestions
          </h4>
        </div>
        <div className="text-[11px] text-slate-300 space-y-1.5 leading-relaxed">
          <p>
            • <strong className="text-white">Every person's body is different:</strong> Optimal heart rates, respiration, and sleep duration vary across individuals based on age, genetics, physical fitness (e.g., an athlete's resting pulse is naturally lower), and medical history.
          </p>
          <p>
            • <strong className="text-white">Example Reference Baseline:</strong> The numbers and thresholds shown in this prototype represent standard adult population reference values.
          </p>
          <p>
            • <strong className="text-white">3-Night Adaptive AI Calibration:</strong> In real-world deployment, DreamGuard first performs an automatic <strong>3-night baseline calibration</strong> to learn your personal resting physiology and bedroom environment before generating individualized health advice.
          </p>
        </div>
      </div>

      {/* Interactive Step-by-Step: How to Play */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          How to "Play" & Test This Prototype (Step-by-Step)
        </h3>

        {/* Step 1 */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-violet-500/30 text-violet-300 font-bold text-xs flex items-center justify-center border border-violet-500/40">
                1
              </span>
              <h4 className="text-sm font-bold text-white">Try Preset Scenarios</h4>
            </div>
            <Link
              to="/"
              className="text-[11px] text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1"
            >
              Go to Simulator <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-300">
            Swipe or click the preset buttons at the top of the Simulator to immediately load clinically realistic sleep profiles:
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-semibold text-emerald-400">😊 Healthy Sleeper</span>
              <p className="text-slate-400 text-[10px]">Optimal HR 62 bpm, AHI 2, 7.5h sleep</p>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-semibold text-amber-400">😐 Mild Sleep Apnea</span>
              <p className="text-slate-400 text-[10px]">Snoring 40%, AHI 10 events/hr</p>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-semibold text-orange-400">😰 Severe Apnea</span>
              <p className="text-slate-400 text-[10px]">AHI 35, cardiac stress, heavy snoring</p>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-semibold text-violet-400">😵 Insomnia Pattern</span>
              <p className="text-slate-400 text-[10px]">High sleep latency (55m), 8 awakenings</p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center justify-center border border-cyan-500/40">
                2
              </span>
              <h4 className="text-sm font-bold text-white">Tap Parameter Cards to Pop Up Sliders</h4>
            </div>
            <Link
              to="/"
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              Try Sliders <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-300">
            Instead of cluttered screen sliders, parameters are organized as <strong>interactive buttons</strong>:
          </p>
          <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
            <li><strong>Pop-Up Slider Window</strong>: Tap any metric card to open its adjustment sheet with <code>[-]</code> and <code>[+]</code> precision buttons.</li>
            <li><strong>🧬 Research-Based Physiological Cross-Coupling</strong>: When you adjust one parameter (e.g. low breathing, high AHI, hot room temperature), the AI automatically calculates coupled biological reflexes (e.g. hypoxic HR drops, airway snoring surges, thermal restlessness) and cites the medical literature!</li>
            <li><strong>Advance Emergency Warnings</strong>: If you slide near dangerous limits (e.g., HR ≤28 bpm, AHI &gt;50), a red warning banner alerts you inside the popup.</li>
            <li><strong>Safe Commit on Button Press</strong>: Changes only apply when you click <strong>"Apply & Set Parameter"</strong>, preventing accidental alarm triggers while dragging!</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
              3
            </span>
            <h4 className="text-sm font-bold text-white">Watch Embedded Live Pulse Feedback</h4>
          </div>
          <p className="text-xs text-slate-300">
            Real-time biometric animations are embedded directly inside the cards:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-red-400 animate-pulse shrink-0" />
              <div>
                <span className="font-bold text-white block">Heart Rate Pulse</span>
                <p className="text-[10px] text-slate-400">Pulses in sync with exact sleeping BPM</p>
              </div>
            </div>
            <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
              <Wind className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Breathing Wave</span>
                <p className="text-[10px] text-slate-400">Expands/contracts with respiratory rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/30 text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-500/40">
                4
              </span>
              <h4 className="text-sm font-bold text-white">Inspect the Health Dashboard</h4>
            </div>
            <Link
              to="/dashboard"
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              Open Dashboard <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-300">
            Open the <strong>Dashboard</strong> tab to view complete AI analysis and streaming charts:
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-bold text-red-400">🚨 Priority Alerts (Up Top):</span>
              <span className="text-slate-300 text-[11px] ml-1">
                If abnormal risks are detected (Sleep Apnea, Bradycardia, Tachycardia), they are highlighted immediately at the top with urgent recommendations.
              </span>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-bold text-violet-400">📊 Last 15 Mins vs 8h Overnight Charts:</span>
              <span className="text-slate-300 text-[11px] ml-1">
                Switch between high-resolution rolling telemetry (15-second intervals) and full circadian nocturnal trends.
              </span>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-bold text-cyan-400">🧠 Sleep Stages & Hypnogram (60GHz Radar):</span>
              <span className="text-slate-300 text-[11px] ml-1">
                Contactless classification of <strong>Deep Sleep (N3)</strong>, <strong>REM Dream Sleep</strong>, <strong>Light Sleep (N1-N2)</strong>, and <strong>Awake time</strong> with 90-minute ultradian hypnogram cycles!
              </span>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-bold text-emerald-400">📋 Full Health Breakdown (At Bottom):</span>
              <span className="text-slate-300 text-[11px] ml-1">
                Comprehensive evaluation of all parameters and personalized clinical recommendations.
              </span>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-500/30 text-red-300 font-bold text-xs flex items-center justify-center border border-red-500/40">
                5
              </span>
              <h4 className="text-sm font-bold text-white">Test Emergency Alarm & Dispatch Simulation</h4>
            </div>
            <Link
              to="/emergency"
              className="text-[11px] text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
            >
              Test Alert <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-300">
            Switch to the <strong>Emergency</strong> tab and tap <span className="text-red-400 font-bold">"Test Emergency Alert"</span>:
          </p>
          <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
            <li><strong>🔊 Synthesized Audio Siren</strong>: Dual-tone alarm sound via device speakers (with mute toggle).</li>
            <li><strong>⏱️ 30s Auto-Dispatch Countdown</strong>: Countdown before simulating first-responder dispatch.</li>
            <li><strong>🛡️ Simulated Dispatch Screen (Prototype Mode)</strong>: Safe demo showing automated 1669/911 protocols without placing real phone calls.</li>
            <li><strong>❌ Quick Close Button</strong>: Top-right <code>X</code> button to immediately cancel and return to normal.</li>
          </ul>
        </div>

        {/* Step 6 */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-500/40">
                6
              </span>
              <h4 className="text-sm font-bold text-white">Customize Settings & Biology Dynamics</h4>
            </div>
            <Link
              to="/settings"
              className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
            >
              Open Settings <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-300">
            On the <strong>Settings</strong> page, you can configure your preferences (auto-saved):
          </p>
          <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
            <li><strong>🧬 Connected Body Vitals (Realistic Reaction)</strong>: Toggle whether vitals naturally react to each other based on real human biology.</li>
            <li>Edit Primary & Secondary family/doctor contact names and phone numbers.</li>
            <li>Select emergency hotline presets (🇹🇭 1669, 🇺🇸 911, 🇪🇺 112, 🇬🇧 999, or custom).</li>
            <li>Adjust auto-call delay (15s, 30s, 45s, 60s) and toggle audible siren sound.</li>
          </ul>
        </div>
      </section>

      {/* Bottom Bar Sitemap Guide */}
      <section className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-700/60 pb-2">
          <BookOpen className="w-4 h-4 text-violet-400" />
          Bottom Navigation Bar Guide
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-2 font-bold text-violet-400 mb-1">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Simulator</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Interactive metric cards with pop-up sliders and preset scenario testing.
            </p>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-2 font-bold text-cyan-400 mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Sleep Score gauge, priority abnormal alerts, 15m/8h charts, and clinical breakdown.
            </p>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-2 font-bold text-violet-400 mb-1">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Test emergency alerts, toggle Connected Body Vitals, configure 1669/911, and edit contacts.
            </p>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Guide</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Interactive user manual with clinical baseline notes and step-by-step testing instructions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
