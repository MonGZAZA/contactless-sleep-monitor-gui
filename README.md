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

---

## Recognition

- **2nd Runner-Up** — *The 1st Health Innovation Science Hackathon* by **Faculty of Allied Health Sciences, Chulalongkorn University (AHS CU)**.

---

## Clinical & Research References

The condition thresholds, sub-score curves, and physiological cross-coupling rules in [src/data/sleepAnalysis.js](src/data/sleepAnalysis.js) and [src/data/physiologicalCoupling.js](src/data/physiologicalCoupling.js) are grounded in the following clinical guidelines and peer-reviewed studies:

- **Sleep Apnea (AHI) & Sleep Staging**
  - American Academy of Sleep Medicine (AASM) Clinical Practice Guideline for Diagnostic Testing for OSA (2017); Kapur et al., *J Clin Sleep Med*, 2017; Epstein et al., *J Clin Sleep Med*, 2009
  - AASM Scoring Manual v2.6 (2017) & ICSD-3 Sleep Apnea Criteria (2014)
  - Peppard et al., *NEJM*, 2000; *Am J Epidemiol*, 2013; Javaheri et al., *JACC*, 2017; Younes, *Am J Respir Crit Care Med*, 2004
  - Zhao et al., *ICML*, 2017 (mmWave sleep staging)
- **Cardiac & Respiratory Vitals**
  - American Heart Association (AHA) Bradycardia & Tachycardia Guidelines; Kusumoto et al., *Circulation*, 2019; Page et al., *Circulation*, 2016; Palatini et al., *Hypertension*, 2006
  - Somers et al., *Circulation*, 1995; Lanfranchi & Somers, *Circulation*, 2002; Guyton & Hall Medical Physiology
  - Cretikos et al., *Resuscitation*, 2008; Churpek et al., *J Hosp Med*, 2016; Hodgetts et al., *Resuscitation*, 2002
- **Insomnia, Sleep Duration & Nocturnal Movement (PLMD)**
  - DSM-5 (APA, 2013) & ICSD-3 (AASM, 2014); Qaseem et al., *Ann Intern Med*, 2016; Irish et al., *Sleep Med Rev*, 2015
  - National Sleep Foundation (Hirshkowitz et al., *Sleep Health*, 2015); Watson et al., *Sleep*, 2015; Cappuccio et al., *Sleep*, 2010
  - AASM Practice Parameters for PLMD (2014); Winkelman, *Sleep*, 1999; Ferri et al., *Sleep Med*, 2016
- **Snoring & Bedroom Environment**
  - Deary et al., *Sleep Med Rev*, 2014; Stuck et al., *Sleep & Breathing*, 2015
  - Okamoto-Mizuno & Mizuno, *Sleep Med Rev*, 2012 & *J Physiol Anthropol*, 2012; Lan et al., *Building and Environment*, 2017; Haskell et al., *Electroencephalogr Clin Neurophysiol*, 1981
  - EPA Guide to Indoor Air Quality; Arundel et al., *Environ Health Perspect*, 1986
  - WHO Environmental Noise Guidelines (2018); Basner et al., *Lancet*, 2014 & *Noise & Health*, 2011
  - Gooley et al., *J Clin Endocrinol Metab*, 2011; Cho et al., *Chronobiol Int*, 2015
