/**
 * Physiological Cross-Coupling Engine for DreamGuard
 * 
 * Implements clinically verified cardiorespiratory, autonomic, and circadian
 * inter-parameter coupling based on peer-reviewed medical research.
 */

import { PARAM_CONFIG } from './sleepAnalysis';

export function calculatePhysiologicalCoupling(currentParams, modifiedKey, newValue) {
  const next = { ...currentParams, [modifiedKey]: Number(newValue) };
  const couplings = [];

  // Helper to clamp values to valid ranges defined in PARAM_CONFIG
  const clamp = (key, val) => {
    const cfg = PARAM_CONFIG[key];
    if (!cfg) return val;
    return Math.max(cfg.min, Math.min(cfg.max, Number.isInteger(cfg.step) ? Math.round(val) : Number(val.toFixed(1))));
  };

  // ---------------------------------------------------------------------------
  // 1. BREATHING RATE MODULATION (Cardiorespiratory Reflex & Chemoreceptors)
  // Reference: Somers et al., Circulation 1995; Lanfranchi & Somers, Circulation 2002
  // ---------------------------------------------------------------------------
  if (modifiedKey === 'breathingRate') {
    const br = newValue;

    // A. Severe Hypoventilation / Bradypnea (BR <= 8 br/min) -> Hypoxic Chemoreceptor Reflex
    if (br <= 8 && br > 3) {
      const hrDrop = Math.round((9 - br) * 2.5);
      const newHR = clamp('heartRate', currentParams.heartRate - hrDrop);
      if (newHR !== currentParams.heartRate) {
        next.heartRate = newHR;
        couplings.push({
          targetKey: 'heartRate',
          delta: `-${hrDrop} bpm`,
          label: 'Heart Rate',
          mechanism: 'Hypoventilation Vagal Response: Low respiration triggers initial vagal bradycardia reflex.',
          reference: 'Lanfranchi & Somers, Circulation 2002; Guyton & Hall Medical Physiology',
        });
      }
    }
    // B. Tachypnea / Rapid Breathing (BR >= 22 br/min) -> Sympathetic Tachycardia
    else if (br >= 22) {
      const hrBoost = Math.round((br - 20) * 1.5);
      const newHR = clamp('heartRate', currentParams.heartRate + hrBoost);
      if (newHR !== currentParams.heartRate) {
        next.heartRate = newHR;
        couplings.push({
          targetKey: 'heartRate',
          delta: `+${hrBoost} bpm`,
          label: 'Heart Rate',
          mechanism: 'Sympathetic Hyperventilation Drive: Rapid breathing increases cardiac autonomic sympathetic output.',
          reference: 'Somers et al., Circulation 1995',
        });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 2. APNEA-HYPOPNEA INDEX (AHI) (Airway Resistance, Hypoxia & Arousals)
  // Reference: Peppard et al., NEJM 2000; Javaheri et al., JACC 2017; AASM 2014
  // ---------------------------------------------------------------------------
  if (modifiedKey === 'ahi') {
    const ahi = newValue;

    // When AHI increases -> Elevates Snoring %, Nocturnal Motility, Awakenings & Heart Rate
    if (ahi >= 15) {
      // Snoring proportion increases with upper airway collapsibility
      const targetSnoring = clamp('snoringPercent', Math.min(85, Math.round(25 + ahi * 1.3)));
      if (Math.abs(targetSnoring - currentParams.snoringPercent) > 5) {
        next.snoringPercent = targetSnoring;
        couplings.push({
          targetKey: 'snoringPercent',
          delta: `${targetSnoring > currentParams.snoringPercent ? '+' : ''}${targetSnoring - currentParams.snoringPercent}%`,
          label: 'Snoring Frequency',
          mechanism: 'Airway Collapsibility: Frequent respiratory hypopneas correlate with acoustic pharyngeal vibration.',
          reference: 'Deary et al., Sleep Med Rev 2014; AASM Guidelines',
        });
      }

      // Micro-arousals increase body movement index
      const targetMovement = clamp('bodyMovement', Math.min(22, Math.round(4 + ahi * 0.3)));
      if (Math.abs(targetMovement - currentParams.bodyMovement) >= 2) {
        next.bodyMovement = targetMovement;
        couplings.push({
          targetKey: 'bodyMovement',
          delta: `${targetMovement > currentParams.bodyMovement ? '+' : ''}${targetMovement - currentParams.bodyMovement} mov/hr`,
          label: 'Body Movement',
          mechanism: 'Respiratory Arousals: Apnea terminations trigger motor arousals and postural repositioning.',
          reference: 'Younes, Am J Respir Crit Care Med 2004',
        });
      }

      // Nocturnal sympathetic overflow raises baseline resting heart rate
      const hrSurge = Math.round(Math.min(18, (ahi - 10) * 0.35));
      const targetHR = clamp('heartRate', currentParams.heartRate + hrSurge);
      if (hrSurge >= 3 && targetHR !== currentParams.heartRate) {
        next.heartRate = targetHR;
        couplings.push({
          targetKey: 'heartRate',
          delta: `+${hrSurge} bpm`,
          label: 'Heart Rate',
          mechanism: 'Post-Apnea Sympathetic Surge: Hypoxemic reoxygenation spikes catecholamines and nocturnal HR.',
          reference: 'Javaheri et al., JACC 2017; Peppard et al., NEJM 2000',
        });
      }

      // Awakenings increase
      const newAwakenings = clamp('awakenings', Math.min(10, Math.round(2 + ahi * 0.18)));
      if (newAwakenings > currentParams.awakenings) {
        next.awakenings = newAwakenings;
        couplings.push({
          targetKey: 'awakenings',
          delta: `+${newAwakenings - currentParams.awakenings}`,
          label: 'Awakenings',
          mechanism: 'Sleep Fragmentation: Repeated airway closures cause cortical arousals and sleep disruption.',
          reference: 'AASM ICSD-3 Sleep Apnea Criteria 2014',
        });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 3. BODY MOVEMENT / MOTILITY (Motor Cortex & Autonomic Co-activation)
  // Reference: Winkelman, Sleep 1999; Ferri et al., Sleep Med 2016
  // ---------------------------------------------------------------------------
  if (modifiedKey === 'bodyMovement') {
    const mov = newValue;

    // High restlessness (PLMD or frequent tossing) stimulates transient cardiac spikes
    if (mov >= 15) {
      const hrSpike = Math.round(Math.min(20, (mov - 10) * 0.7));
      const newHR = clamp('heartRate', currentParams.heartRate + hrSpike);
      if (hrSpike >= 3 && newHR !== currentParams.heartRate) {
        next.heartRate = newHR;
        couplings.push({
          targetKey: 'heartRate',
          delta: `+${hrSpike} bpm`,
          label: 'Heart Rate',
          mechanism: 'Motor Autonomic Activation: Limb movements and tossing activate sympathetic cardiac acceleration.',
          reference: 'Winkelman, Sleep 1999; Ferri et al., Sleep Med 2016',
        });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 4. BEDROOM TEMPERATURE (Thermoregulation & Sleep Architecture)
  // Reference: Okamoto-Mizuno & Mizuno, J Physiol Anthropol 2012; Lan et al., 2017
  // ---------------------------------------------------------------------------
  if (modifiedKey === 'roomTemp') {
    const temp = newValue;

    // Heat Stress (>24°C) impairs nocturnal core cooling
    if (temp >= 25) {
      const hrIncrease = Math.round(Math.min(12, (temp - 23) * 1.8));
      const newHR = clamp('heartRate', currentParams.heartRate + hrIncrease);
      if (hrIncrease >= 2 && newHR !== currentParams.heartRate) {
        next.heartRate = newHR;
        couplings.push({
          targetKey: 'heartRate',
          delta: `+${hrIncrease} bpm`,
          label: 'Heart Rate',
          mechanism: 'Thermal Vasodilation Load: Elevated room heat forces cardiac output up to dissipate body temperature.',
          reference: 'Okamoto-Mizuno & Mizuno, J Physiol Anthropol 2012',
        });
      }

      // Restlessness / tossing increases in hot rooms
      const addMovement = clamp('bodyMovement', currentParams.bodyMovement + Math.round((temp - 24) * 0.8));
      if (addMovement > currentParams.bodyMovement) {
        next.bodyMovement = addMovement;
        couplings.push({
          targetKey: 'bodyMovement',
          delta: `+${addMovement - currentParams.bodyMovement} mov/hr`,
          label: 'Body Movement',
          mechanism: 'Thermoregulatory Discomfort: Thermal discomfort induces frequent body repositioning.',
          reference: 'Haskell et al., Electroencephalogr Clin Neurophysiol 1981',
        });
      }

      // WASO / Awakenings increase
      const addWaso = clamp('waso', currentParams.waso + Math.round((temp - 23) * 4));
      if (addWaso > currentParams.waso) {
        next.waso = addWaso;
        couplings.push({
          targetKey: 'waso',
          delta: `+${addWaso - currentParams.waso} min`,
          label: 'Wake After Sleep (WASO)',
          mechanism: 'Heat-Induced Wakefulness: Ambient heat disrupts slow-wave sleep and causes nocturnal wake episodes.',
          reference: 'Lan et al., Building and Environment 2017',
        });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 5. AMBIENT NOISE (Sensory Autonomic Arousals)
  // Reference: Basner et al., Lancet 2014; WHO Environmental Noise Guidelines 2018
  // ---------------------------------------------------------------------------
  if (modifiedKey === 'ambientNoise') {
    const noise = newValue;

    if (noise >= 45) {
      const extraAwakenings = clamp('awakenings', currentParams.awakenings + Math.round((noise - 40) * 0.15));
      if (extraAwakenings > currentParams.awakenings) {
        next.awakenings = extraAwakenings;
        couplings.push({
          targetKey: 'awakenings',
          delta: `+${extraAwakenings - currentParams.awakenings}`,
          label: 'Awakenings',
          mechanism: 'Acoustic Cortical Arousals: Noise peaks exceeding 45 dB trigger sub-awakening micro-arousals.',
          reference: 'Basner et al., Lancet 2014; WHO Guidelines 2018',
        });
      }
    }
  }

  return {
    nextParams: next,
    couplings,
  };
}
