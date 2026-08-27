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
  Vibrate,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Volume2,
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
          This web app is a <strong>companion prototype</strong> for DreamGuard — a <strong>contactless bedside health monitor</strong>. It allows you to simulate any sleeper condition and see how the AI analyzes health vitals, calculates sleep quality, and triggers emergency alerts in real time.
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
            • <strong className="text-white">Every person's body is different:</strong> Optimal heart rates, respiration, and sleep duration vary across individuals based on age, genetics, physical fitness (e.g., an athlete's resting pulse is naturally lower), and existing medical conditions.
          </p>
          <p>
            • <strong className="text-white">Example Reference Baseline:</strong> The numbers and thresholds shown in this prototype represent a standard adult population reference.
          </p>
          <p>
            • <strong className="text-white">3-Night Adaptive AI Calibration:</strong> In real-world operation, DreamGuard first performs an automatic <strong>3-night baseline calibration</strong> to learn your personal resting physiology and bedroom environment before generating custom, individualized health advice.
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
            Tap preset scenario buttons to immediately load clinically realistic sleep profiles:
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
              <h4 className="text-sm font-bold text-white">Adjust the 13 Sensor Sliders</h4>
            </div>
            <Link
              to="/"
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              Try Sliders <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-300">
            Drag any slider on the Simulator to dynamically customize the sleeper's vitals & bedroom environment:
          </p>
          <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
            <li><strong>Heart Rate & Breathing</strong>: Change pulse (25–160 bpm) or respiration (0–40 br/min).</li>
            <li><strong>AHI (Breathing Pauses)</strong>: Test airway interruptions from 0 to 60 pauses/hr.</li>
            <li><strong>Movement & Snoring</strong>: Adjust actigraphy restlessness and acoustic snoring %.</li>
            <li><strong>Room Environment</strong>: Change temperature, humidity, noise level, and ambient lux.</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
              3
            </span>
            <h4 className="text-sm font-bold text-white">Watch Live Animated Feedback</h4>
          </div>
          <p className="text-xs text-slate-300">
            As you tweak parameters, the live monitoring indicators update in real time:
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <Heart className="w-4 h-4 text-red-400 mx-auto mb-1 animate-pulse" />
              <span className="font-bold text-white">Heart Icon</span>
              <p className="text-[10px] text-slate-400 mt-0.5">Pulses at your exact BPM rate</p>
            </div>
            <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <Wind className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <span className="font-bold text-white">Breathing Ring</span>
              <p className="text-[10px] text-slate-400 mt-0.5">Expands/contracts with breaths</p>
            </div>
            <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <Activity className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="font-bold text-white">Movement Jitter</span>
              <p className="text-[10px] text-slate-400 mt-0.5">Shakes when movement is high</p>
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
              <h4 className="text-sm font-bold text-white">Explore Dashboard Graphs</h4>
            </div>
            <Link
              to="/dashboard"
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              Open Dashboard <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-300">
            Open the <strong>Dashboard</strong> tab to inspect your simulated sleep data:
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-bold text-violet-400">📊 Last 15 Mins Tab:</span>
              <span className="text-slate-300 text-[11px] ml-1">
                Real-time streaming telemetry recorded every 15 seconds. Touch or hover to inspect exact data points!
              </span>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-bold text-cyan-400">🌙 Overnight Trend (8h) Tab:</span>
              <span className="text-slate-300 text-[11px] ml-1">
                Circadian nocturnal dipping curve across the full 8-hour sleep session (11 PM – 7 AM).
              </span>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <span className="font-bold text-emerald-400">🎯 Radar Chart:</span>
              <span className="text-slate-300 text-[11px] ml-1">
                Breaks down your overall Sleep Score (0–100) into 8 sub-scores.
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
              <h4 className="text-sm font-bold text-white">Test Emergency Alarm & Phone Vibration</h4>
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
            <li><strong>📳 Phone Vibration</strong>: Your phone will pulse in an emergency SOS pattern.</li>
            <li><strong>🔊 Siren Sound</strong>: Dual-tone audio alarm beeps through your device speakers.</li>
            <li><strong>⏱️ 30s Countdown</strong>: Counts down to auto-dialing <strong>1669</strong> / <strong>911</strong> with vital telemetry.</li>
            <li><strong>Cancel / Call Buttons</strong>: Test cancelling the alert or clicking to place a call.</li>
          </ul>
        </div>

        {/* Step 6 */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-500/40">
                6
              </span>
              <h4 className="text-sm font-bold text-white">Customize Contacts & Settings</h4>
            </div>
            <Link
              to="/emergency"
              className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
            >
              Edit Contacts <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-300">
            On the Emergency page, you can customize everything and changes are <strong>auto-saved to your phone</strong>:
          </p>
          <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
            <li>Edit Primary & Secondary family contact names and numbers.</li>
            <li>Select emergency hotline preset (🇹🇭 1669, 🇺🇸 911, 🇪🇺 112, 🇬🇧 999, or custom).</li>
            <li>Change auto-call delay (15s, 30s, 45s, 60s).</li>
            <li>Toggle phone vibration and audible siren on/off.</li>
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
              Adjust 13 sleeper parameters, choose preset scenarios, and see real-time AI condition diagnosis.
            </p>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-2 font-bold text-cyan-400 mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Inspect the 15-min live telemetry graphs, 8-hour circadian trends, radar chart, and environmental cards.
            </p>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-2 font-bold text-red-400 mb-1">
              <Shield className="w-4 h-4" />
              <span>Emergency</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Test full emergency alerts with phone vibration & sound, edit contact numbers, and configure 1669/911.
            </p>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Guide</span>
            </div>
            <p className="text-[11px] text-slate-400">
              This interactive manual explaining what everything does and how to test every feature.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
