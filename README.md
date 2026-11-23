# DreamGuard

**DreamGuard** is an interactive, **GUI-only** companion web prototype for a contactless bedside sleep health monitor. It simulates physiological and environmental sleep metrics in real time, evaluates sleep quality and stage architecture, models cardiorespiratory cross-coupling, and demonstrates automated emergency alerting.

> **GUI-Only Prototype Disclaimer:** This project is a **frontend-only GUI simulation** with no backend server, database, or physical radar/sensor hardware integration. All sensor readings, 15-second telemetry streams, emergency dispatches, and alerts are simulated client-side in the browser using standard adult population reference thresholds. It is not a medical device and is not intended for clinical diagnosis or treatment.

**Live Demo (GitHub Pages):** https://mongzaza.github.io/DreamGuard/

---

## Features

- **Sleep Condition Simulator (`/`)**
  - **5 Clinical Presets:** Healthy Sleeper, Mild Sleep Apnea, Severe Sleep Apnea, Insomnia Pattern, and Emergency Scenario.
  - **13 Adjustable Parameters** across four categories:
    - *Vitals:* Heart Rate (`bpm`), Breathing Rate (`breaths/min`)
    - *Sleep & Airway:* Body Movement Index (`mov/hr`), Snoring Frequency (`%`), Apnea-Hypopnea Index (`AHI`, `events/hr`)
    - *Duration & Continuity:* Sleep Duration (`hours`), Sleep Onset Latency (`min`), Wake After Sleep Onset (`WASO`, `min`), Awakenings (`times`)
    - *Environment:* Room Temperature (`°C`), Room Humidity (`%`), Ambient Noise (`dB`), Ambient Light (`lux`)
- **Physiological Cross-Coupling Engine**
  - Optional realistic biological coupling (`Connected Body Vitals`): adjusting one metric (such as `breathingRate`, `ahi`, `bodyMovement`, `roomTemp`, or `ambientNoise`) automatically updates connected vitals and explains the physiological mechanism.
- **Analytics Dashboard (`/dashboard`)**
  - Overall **Sleep Score Gauge** (0–100) and **8-axis Sub-Score Radar Chart** (Duration, Efficiency, Heart Rate, Breathing, AHI Airway, Movement, Environment, Snoring).
  - **Live 15-Minute Telemetry** (1.2s layered sine-wave vital fluctuations recorded every 15s, up to 60 samples) vs. **8-Hour Circadian Session** view.
  - **Sleep Stages & Hypnogram:** Estimates Deep (`N3`), `REM`, Light (`N1–N2`), and `Awake` breakdown with a `23:00–07:00` hypnogram timeline.
- **Emergency Alerting & Settings (`/settings`, `/emergency`)**
  - Full-screen **Emergency Overlay** triggered by critical vital thresholds, featuring a synthesized **Web Audio API** alarm siren, mute toggle, and configurable dispatch countdown.
  - Persistent `localStorage` configuration for primary/secondary contacts, regional emergency numbers (`1669`, `911`, `112`, `999`), countdown duration, and simulation dynamics.
- **Interactive Guide (`/guide`)**
  - Built-in walkthrough explaining presets, sliders, graphs, and emergency testing.

---

## Tech Stack

- **Framework:** React 18 (`react`, `react-dom`) + React Router v6 (`react-router-dom`)
- **Build Tool:** Vite 6 (`@vitejs/plugin-react`)
- **Styling:** Tailwind CSS 3
- **Charts & Icons:** Recharts, Lucide React
- **Deployment:** Configured for Vercel SPA routing (`vercel.json`)

---

## Project Structure

```text
DreamGuard/
├── public/
│   ├── logo.png
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── EmergencyOverlay.jsx    # Critical alert modal + Web Audio siren
│   │   ├── Layout.jsx              # Fixed header & bottom navigation bar
│   │   ├── LiveIndicators.jsx
│   │   ├── MetricCard.jsx
│   │   ├── ParameterButton.jsx
│   │   ├── RiskAlert.jsx
│   │   ├── SleepScoreGauge.jsx
│   │   ├── SleepStagesCard.jsx
│   │   ├── SliderControl.jsx
│   │   └── SliderModal.jsx
│   ├── context/
│   │   └── SleepContext.jsx        # Global state, 1.2s live engine & 15s recorder
│   ├── data/
│   │   ├── physiologicalCoupling.js # Cross-parameter biological coupling rules
│   │   └── sleepAnalysis.js        # Presets, scoring, conditions & stage model
│   ├── hooks/
│   │   └── useLiveSimulation.js
│   ├── pages/
│   │   ├── Simulator.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Emergency.jsx
│   │   └── Guide.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended) and `npm`

### Installation & Development

```bash
# Install dependencies
npm install

# Start the development server (runs on http://localhost:3000)
npm run dev
```

### Production Build

```bash
# Build for production (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```
