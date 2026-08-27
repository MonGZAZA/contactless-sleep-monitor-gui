// ============================================================================
// DreamGuard — Research-Backed Sleep Health Analysis Engine
// All thresholds are based on peer-reviewed research and clinical guidelines.
// ============================================================================

// ---------------------------------------------------------------------------
// PARAMETER CONFIGURATION — defines each adjustable sensor metric
// ---------------------------------------------------------------------------
export const PARAM_CONFIG = {
  heartRate: {
    label: 'Heart Rate',
    unit: 'bpm',
    min: 25,
    max: 160,
    step: 1,
    defaultValue: 62,
    category: 'vitals',
    description: 'Average heart rate during sleep',
    icon: 'Heart',
    sensor: '60GHz FMCW Radar (Ballistocardiography)',
  },
  breathingRate: {
    label: 'Breathing Rate',
    unit: 'breaths/min',
    min: 0,
    max: 40,
    step: 1,
    defaultValue: 15,
    category: 'vitals',
    description: 'Average respiratory rate during sleep',
    icon: 'Wind',
    sensor: '60GHz FMCW Radar (Chest Wall Motion)',
  },
  bodyMovement: {
    label: 'Body Movement Index',
    unit: 'mov/hr',
    min: 0,
    max: 50,
    step: 1,
    defaultValue: 4,
    category: 'sleep',
    description: 'Nocturnal motility & restlessness frequency (actigraphy radar)',
    icon: 'Activity',
    sensor: 'Radar / Accelerometer',
  },
  snoringPercent: {
    label: 'Snoring Frequency',
    unit: '% of sleep',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 5,
    category: 'sleep',
    description: 'Percentage of sleep duration with acoustic snoring',
    icon: 'Volume2',
    sensor: 'Microphone (Audio Analysis)',
  },
  ahi: {
    label: 'Apnea-Hypopnea Index (AHI)',
    unit: 'events/hr',
    min: 0,
    max: 60,
    step: 0.5,
    defaultValue: 2,
    category: 'sleep',
    description: 'Average breathing cessations/drops per hour (<5 Normal, 5-15 Mild, 15-30 Moderate, >30 Severe)',
    icon: 'AlertTriangle',
    sensor: 'Derived from Breathing Pattern Analysis',
  },
  sleepDuration: {
    label: 'Sleep Duration',
    unit: 'hours',
    min: 0,
    max: 14,
    step: 0.25,
    defaultValue: 7.5,
    category: 'duration',
    description: 'Total time asleep',
    icon: 'Moon',
    sensor: 'Radar Presence Detection',
  },
  sleepOnsetLatency: {
    label: 'Sleep Onset Latency',
    unit: 'min',
    min: 0,
    max: 120,
    step: 1,
    defaultValue: 12,
    category: 'duration',
    description: 'Time taken to fall asleep',
    icon: 'Timer',
    sensor: 'Movement→Stillness Transition',
  },
  waso: {
    label: 'Wake After Sleep Onset',
    unit: 'min',
    min: 0,
    max: 180,
    step: 1,
    defaultValue: 15,
    category: 'duration',
    description: 'Total minutes awake after initially falling asleep',
    icon: 'Eye',
    sensor: 'Movement Pattern Analysis',
  },
  awakenings: {
    label: 'Awakenings',
    unit: 'times',
    min: 0,
    max: 25,
    step: 1,
    defaultValue: 2,
    category: 'duration',
    description: 'Number of times woke up during the night',
    icon: 'Sunrise',
    sensor: 'Movement Spike Detection',
  },
  roomTemp: {
    label: 'Room Temperature',
    unit: '°C',
    min: 10,
    max: 38,
    step: 0.5,
    defaultValue: 21,
    category: 'environment',
    description: 'Bedroom ambient temperature',
    icon: 'Thermometer',
    sensor: 'Temperature Sensor',
  },
  roomHumidity: {
    label: 'Room Humidity',
    unit: '%',
    min: 10,
    max: 95,
    step: 1,
    defaultValue: 45,
    category: 'environment',
    description: 'Bedroom relative humidity',
    icon: 'Droplets',
    sensor: 'Humidity Sensor',
  },
  ambientNoise: {
    label: 'Ambient Noise',
    unit: 'dB',
    min: 15,
    max: 80,
    step: 1,
    defaultValue: 28,
    category: 'environment',
    description: 'Background noise level',
    icon: 'Ear',
    sensor: 'Microphone',
  },
  ambientLight: {
    label: 'Ambient Light',
    unit: 'lux',
    min: 0,
    max: 50,
    step: 0.5,
    defaultValue: 0.5,
    category: 'environment',
    description: 'Bedroom light level',
    icon: 'Sun',
    sensor: 'Light Sensor',
  },
};

// ---------------------------------------------------------------------------
// CATEGORIES — for grouping sliders in the UI
// ---------------------------------------------------------------------------
export const CATEGORIES = {
  vitals: { label: 'Vital Signs', icon: 'HeartPulse', color: 'text-red-400' },
  sleep: { label: 'Sleep Dynamics & Airway', icon: 'Activity', color: 'text-violet-400' },
  duration: { label: 'Sleep Timing', icon: 'Clock', color: 'text-cyan-400' },
  environment: { label: 'Bedroom Environment', icon: 'Thermometer', color: 'text-emerald-400' },
};

// ---------------------------------------------------------------------------
// PRESETS — predefined scenarios for demo purposes
// ---------------------------------------------------------------------------
export const PRESETS = {
  healthy: {
    label: 'Healthy Sleeper',
    description: 'Normal adult with good sleep habits',
    emoji: '😊',
    params: {
      heartRate: 62, breathingRate: 15, bodyMovement: 4, snoringPercent: 5,
      ahi: 2, sleepDuration: 7.5, sleepOnsetLatency: 12, waso: 15,
      awakenings: 2, roomTemp: 21, roomHumidity: 45, ambientNoise: 28, ambientLight: 0.5,
    },
  },
  mildApnea: {
    label: 'Mild Sleep Apnea',
    description: 'Mild obstructive sleep apnea pattern',
    emoji: '😐',
    params: {
      heartRate: 72, breathingRate: 18, bodyMovement: 8, snoringPercent: 40,
      ahi: 10, sleepDuration: 6.5, sleepOnsetLatency: 20, waso: 35,
      awakenings: 5, roomTemp: 22, roomHumidity: 50, ambientNoise: 35, ambientLight: 2,
    },
  },
  severeApnea: {
    label: 'Severe Sleep Apnea',
    description: 'Severe OSA with cardiac stress indicators',
    emoji: '😰',
    params: {
      heartRate: 85, breathingRate: 22, bodyMovement: 15, snoringPercent: 75,
      ahi: 35, sleepDuration: 5.5, sleepOnsetLatency: 25, waso: 60,
      awakenings: 10, roomTemp: 24, roomHumidity: 55, ambientNoise: 42, ambientLight: 3,
    },
  },
  insomnia: {
    label: 'Insomnia Pattern',
    description: 'Difficulty falling and staying asleep',
    emoji: '😵',
    params: {
      heartRate: 75, breathingRate: 17, bodyMovement: 12, snoringPercent: 10,
      ahi: 3, sleepDuration: 4.5, sleepOnsetLatency: 55, waso: 80,
      awakenings: 8, roomTemp: 23, roomHumidity: 40, ambientNoise: 38, ambientLight: 8,
    },
  },
  emergency: {
    label: 'Emergency Scenario',
    description: 'Life-threatening vital signs detected',
    emoji: '🚨',
    params: {
      heartRate: 28, breathingRate: 3, bodyMovement: 0, snoringPercent: 0,
      ahi: 55, sleepDuration: 2, sleepOnsetLatency: 5, waso: 10,
      awakenings: 0, roomTemp: 20, roomHumidity: 45, ambientNoise: 25, ambientLight: 0,
    },
  },
};

// ---------------------------------------------------------------------------
// HELPER: Risk color utilities
// ---------------------------------------------------------------------------
export function getRiskColor(risk) {
  switch (risk) {
    case 'low': return 'text-emerald-400';
    case 'moderate': return 'text-amber-400';
    case 'high': return 'text-orange-400';
    case 'critical': return 'text-red-400';
    default: return 'text-slate-400';
  }
}

export function getRiskBgColor(risk) {
  switch (risk) {
    case 'low': return 'bg-emerald-400/10 border-emerald-400/30';
    case 'moderate': return 'bg-amber-400/10 border-amber-400/30';
    case 'high': return 'bg-orange-400/10 border-orange-400/30';
    case 'critical': return 'bg-red-400/10 border-red-400/30';
    default: return 'bg-slate-700/50 border-slate-600/30';
  }
}

export function getRiskLabel(risk) {
  switch (risk) {
    case 'low': return 'LOW RISK';
    case 'moderate': return 'MODERATE';
    case 'high': return 'HIGH RISK';
    case 'critical': return 'CRITICAL';
    default: return 'UNKNOWN';
  }
}

// ---------------------------------------------------------------------------
// SCORING HELPERS — each returns a score from 0-100
// ---------------------------------------------------------------------------

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// Score peaks at 100 within [idealMin, idealMax], decays linearly outside
function rangeScore(value, idealMin, idealMax, absoluteMin, absoluteMax) {
  if (value >= idealMin && value <= idealMax) return 100;
  if (value < idealMin) {
    if (value <= absoluteMin) return 0;
    return Math.round(((value - absoluteMin) / (idealMin - absoluteMin)) * 100);
  }
  // value > idealMax
  if (value >= absoluteMax) return 0;
  return Math.round(((absoluteMax - value) / (absoluteMax - idealMax)) * 100);
}

// Score decreases linearly as value increases (for "lower is better" metrics)
function inverseScore(value, goodMax, badMax) {
  if (value <= goodMax) return 100;
  if (value >= badMax) return 0;
  return Math.round(((badMax - value) / (badMax - goodMax)) * 100);
}

function calcHeartRateScore(hr) {
  // Normal sleeping HR: 40-70 bpm (AHA)
  // Critical: <30 or >130
  return rangeScore(hr, 40, 70, 28, 140);
}

function calcBreathingRateScore(br) {
  // Normal adult: 12-20 breaths/min (Cretikos et al., 2008)
  // Concern: <8 or >28
  return rangeScore(br, 12, 20, 0, 35);
}

function calcMovementScore(mov) {
  // PLMS Index: <5 normal (AASM, 2014)
  return inverseScore(mov, 5, 35);
}

function calcSnoringScore(pct) {
  // Lower is better; <10% is healthy
  return inverseScore(pct, 10, 80);
}

function calcAHIScore(ahi) {
  // AASM: <5 normal, 5-15 mild, 15-30 moderate, >30 severe
  if (ahi < 5) return 100;
  if (ahi < 15) return 70 - ((ahi - 5) / 10) * 30; // 70→40
  if (ahi < 30) return 40 - ((ahi - 15) / 15) * 30; // 40→10
  return Math.max(0, 10 - ((ahi - 30) / 30) * 10);
}

function calcDurationScore(hours) {
  // National Sleep Foundation, 2015: 7-9 hours for adults
  return rangeScore(hours, 7, 9, 2, 13);
}

function calcEnvironmentScore(temp, humidity, noise, light) {
  // Temperature: 18-22°C optimal (Okamoto-Mizuno & Mizuno, 2012)
  const tempScore = rangeScore(temp, 18, 22, 10, 32);
  // Humidity: 30-50% optimal (EPA Indoor Air Quality)
  const humidityScore = rangeScore(humidity, 30, 50, 10, 80);
  // Noise: <30dB quiet (WHO, 2018)
  const noiseScore = inverseScore(noise, 30, 65);
  // Light: <1 lux ideal (Gooley et al., 2011)
  const lightScore = inverseScore(light, 1, 30);

  return Math.round((tempScore + humidityScore + noiseScore + lightScore) / 4);
}

// ---------------------------------------------------------------------------
// CONDITION ANALYZERS — each returns a condition object or null
// ---------------------------------------------------------------------------

function analyzeSleepApnea(params) {
  const { ahi, snoringPercent } = params;
  const combined = ahi + (snoringPercent > 50 ? 5 : 0); // snoring elevates risk

  if (combined >= 30) {
    return {
      id: 'sleep-apnea',
      name: 'Obstructive Sleep Apnea',
      risk: 'critical',
      detail: `AHI of ${ahi} events/hour with ${snoringPercent}% snoring indicates severe obstructive sleep apnea. This means breathing stops or becomes dangerously shallow approximately ${ahi} times per hour during sleep.`,
      recommendation: 'Urgent referral to a sleep specialist recommended. Continuous Positive Airway Pressure (CPAP) therapy is the first-line treatment. Polysomnography (PSG) should be conducted for definitive diagnosis.',
      reference: 'American Academy of Sleep Medicine (AASM) Clinical Practice Guideline for Diagnostic Testing for OSA, 2017; Kapur et al., J Clin Sleep Med, 2017',
      category: 'respiratory',
    };
  }
  if (ahi >= 15) {
    return {
      id: 'sleep-apnea',
      name: 'Obstructive Sleep Apnea',
      risk: 'high',
      detail: `AHI of ${ahi} events/hour indicates moderate obstructive sleep apnea. Breathing is interrupted ${ahi} times per hour, causing fragmented sleep and potential oxygen desaturation.`,
      recommendation: 'Consult a sleep specialist. Treatment options include CPAP therapy, oral appliance therapy, or positional therapy depending on severity and patient factors.',
      reference: 'AASM Clinical Practice Guideline, 2017; Epstein et al., J Clin Sleep Med, 2009',
      category: 'respiratory',
    };
  }
  if (ahi >= 5) {
    return {
      id: 'sleep-apnea',
      name: 'Mild Sleep Apnea Risk',
      risk: 'moderate',
      detail: `AHI of ${ahi} events/hour suggests mild obstructive sleep apnea. Breathing interruptions are above the normal threshold of 5 events/hour.`,
      recommendation: 'Consider lifestyle modifications: weight management, sleeping on your side, and avoiding alcohol before bed. Follow-up sleep evaluation recommended.',
      reference: 'AASM Scoring Manual v2.6, 2017; Peppard et al., Am J Epidemiol, 2013',
      category: 'respiratory',
    };
  }
  return {
    id: 'sleep-apnea',
    name: 'Sleep Apnea Screening',
    risk: 'low',
    detail: `AHI of ${ahi} events/hour is within normal range (<5 events/hour). No significant sleep-disordered breathing detected.`,
    recommendation: 'No action required. Continue monitoring.',
    reference: 'AASM Scoring Manual v2.6, 2017',
    category: 'respiratory',
  };
}

function analyzeCardiac(params) {
  const { heartRate } = params;
  const conditions = [];

  if (heartRate < 30) {
    conditions.push({
      id: 'bradycardia-critical',
      name: 'Severe Bradycardia',
      risk: 'critical',
      detail: `Heart rate of ${heartRate} bpm during sleep is dangerously low. Resting heart rate below 30 bpm may indicate serious cardiac conduction abnormalities.`,
      recommendation: 'EMERGENCY: This may indicate a life-threatening cardiac event. Immediate medical attention required. Consider cardiac monitoring and potential pacemaker evaluation.',
      reference: 'American Heart Association (AHA) — Bradycardia Guidelines; Kusumoto et al., Circulation, 2019',
      category: 'cardiac',
    });
  } else if (heartRate < 40) {
    conditions.push({
      id: 'bradycardia',
      name: 'Bradycardia',
      risk: 'high',
      detail: `Heart rate of ${heartRate} bpm during sleep is below the expected range. While trained athletes may have lower resting HR, values below 40 bpm warrant medical evaluation.`,
      recommendation: 'Consult a cardiologist if you are not a trained athlete. An ECG evaluation is recommended to rule out conduction disorders.',
      reference: 'AHA Heart Rate Guidelines; Kusumoto et al., Circulation, 2019',
      category: 'cardiac',
    });
  }

  if (heartRate > 130) {
    conditions.push({
      id: 'tachycardia-critical',
      name: 'Severe Tachycardia',
      risk: 'critical',
      detail: `Heart rate of ${heartRate} bpm during sleep is dangerously elevated. Sustained tachycardia during sleep may indicate arrhythmia, autonomic dysfunction, or other serious conditions.`,
      recommendation: 'EMERGENCY: Seek immediate medical evaluation. This may indicate atrial fibrillation, supraventricular tachycardia, or other cardiac arrhythmias.',
      reference: 'AHA — Tachycardia Management Guidelines; Page et al., Circulation, 2016',
      category: 'cardiac',
    });
  } else if (heartRate > 100) {
    conditions.push({
      id: 'tachycardia',
      name: 'Elevated Sleeping Heart Rate',
      risk: 'high',
      detail: `Heart rate of ${heartRate} bpm during sleep exceeds the expected range of 40–70 bpm. Elevated nocturnal heart rate is associated with increased cardiovascular risk.`,
      recommendation: 'Consult your physician. Possible causes include stress, caffeine, medications, fever, or underlying cardiac conditions. Consider Holter monitoring.',
      reference: 'AHA — Nocturnal Heart Rate and Cardiovascular Risk; Palatini et al., Hypertension, 2006',
      category: 'cardiac',
    });
  }

  if (heartRate >= 40 && heartRate <= 100) {
    conditions.push({
      id: 'cardiac-normal',
      name: 'Heart Rate',
      risk: 'low',
      detail: `Heart rate of ${heartRate} bpm is within the normal sleeping range (40–70 bpm typical, up to 100 bpm acceptable).`,
      recommendation: 'No concerns. Heart rate is within healthy limits during sleep.',
      reference: 'AHA Heart Rate Guidelines',
      category: 'cardiac',
    });
  }

  return conditions;
}

function analyzeBreathing(params) {
  const { breathingRate } = params;

  if (breathingRate <= 3) {
    return {
      id: 'breathing-critical',
      name: 'Critical Breathing Rate',
      risk: 'critical',
      detail: `Breathing rate of ${breathingRate} breaths/min is critically low. This may indicate respiratory failure, central apnea, or loss of respiratory drive.`,
      recommendation: 'EMERGENCY: Immediate medical intervention required. Check for airway obstruction and responsiveness.',
      reference: 'Cretikos et al., Resuscitation, 2008; Hodgetts et al., Resuscitation, 2002',
      category: 'respiratory',
    };
  }
  if (breathingRate < 10) {
    return {
      id: 'bradypnea',
      name: 'Bradypnea (Low Breathing Rate)',
      risk: 'high',
      detail: `Breathing rate of ${breathingRate} breaths/min is below normal. Bradypnea during sleep may indicate opioid effects, central nervous system depression, or metabolic alkalosis.`,
      recommendation: 'Medical evaluation recommended. Review medications that may depress respiratory drive. Consider monitoring with pulse oximetry.',
      reference: 'Cretikos et al., Resuscitation, 2008 — Respiratory rate as a vital sign predictor of deterioration',
      category: 'respiratory',
    };
  }
  if (breathingRate > 25) {
    return {
      id: 'tachypnea',
      name: 'Tachypnea (Elevated Breathing Rate)',
      risk: 'high',
      detail: `Breathing rate of ${breathingRate} breaths/min exceeds the normal range during sleep. Elevated respiratory rate may indicate pain, anxiety, infection, metabolic acidosis, or pulmonary conditions.`,
      recommendation: 'Medical evaluation recommended. Persistent tachypnea during sleep warrants investigation for underlying respiratory or cardiac conditions.',
      reference: 'Cretikos et al., Resuscitation, 2008; Churpek et al., J Hosp Med, 2016',
      category: 'respiratory',
    };
  }
  return {
    id: 'breathing-normal',
    name: 'Breathing Rate',
    risk: 'low',
    detail: `Breathing rate of ${breathingRate} breaths/min is within the normal adult range (12–20 breaths/min).`,
    recommendation: 'No concerns. Respiratory rate is healthy.',
    reference: 'Cretikos et al., Resuscitation, 2008',
    category: 'respiratory',
  };
}

function analyzeMovement(params) {
  const { bodyMovement } = params;

  if (bodyMovement > 25) {
    return {
      id: 'plmd',
      name: 'Excessive Limb Movements',
      risk: 'high',
      detail: `Body movement index of ${bodyMovement}/hr is significantly elevated. A Periodic Limb Movement Index (PLMI) >25 is classified as moderate-to-severe PLMD.`,
      recommendation: 'Consult a sleep specialist. May indicate Periodic Limb Movement Disorder (PLMD) or Restless Legs Syndrome (RLS). Iron studies and dopaminergic therapy may be considered.',
      reference: 'AASM Practice Parameters for PLMD, 2014; Ferri et al., Sleep Medicine, 2016',
      category: 'movement',
    };
  }
  if (bodyMovement > 15) {
    return {
      id: 'plmd-mild',
      name: 'Elevated Body Movement',
      risk: 'moderate',
      detail: `Body movement index of ${bodyMovement}/hr is above normal. Frequent position changes and limb movements can fragment sleep architecture.`,
      recommendation: 'Monitor trends. If persistent, consider evaluation for restless legs syndrome or other movement disorders. Reducing caffeine and ensuring adequate iron intake may help.',
      reference: 'AASM Practice Parameters for PLMD, 2014',
      category: 'movement',
    };
  }
  if (bodyMovement > 5) {
    return {
      id: 'movement-mild',
      name: 'Body Movement',
      risk: 'low',
      detail: `Body movement index of ${bodyMovement}/hr is within acceptable range. Some movement during sleep is normal.`,
      recommendation: 'Normal range. No action needed.',
      reference: 'AASM Practice Parameters, 2014',
      category: 'movement',
    };
  }
  return {
    id: 'movement-normal',
    name: 'Body Movement',
    risk: 'low',
    detail: `Body movement index of ${bodyMovement}/hr is low, indicating restful sleep with minimal disturbance.`,
    recommendation: 'Excellent. Minimal movement suggests consolidated sleep.',
    reference: 'AASM Practice Parameters, 2014',
    category: 'movement',
  };
}

function analyzeInsomnia(params) {
  const { sleepOnsetLatency, waso, awakenings, sleepDuration } = params;

  // Calculate sleep efficiency
  const totalBedTime = sleepDuration + sleepOnsetLatency / 60 + waso / 60;
  const efficiency = totalBedTime > 0 ? (sleepDuration / totalBedTime) * 100 : 0;

  // DSM-5 / ICSD-3 insomnia criteria indicators
  let criteriaCount = 0;
  const details = [];

  if (sleepOnsetLatency > 30) {
    criteriaCount++;
    details.push(`Sleep onset latency of ${sleepOnsetLatency} min (>30 min threshold)`);
  }
  if (waso > 30) {
    criteriaCount++;
    details.push(`Wake after sleep onset of ${waso} min (>30 min threshold)`);
  }
  if (efficiency < 85) {
    criteriaCount++;
    details.push(`Sleep efficiency of ${efficiency.toFixed(1)}% (<85% threshold)`);
  }
  if (awakenings > 5) {
    criteriaCount++;
    details.push(`${awakenings} awakenings (>5 threshold)`);
  }

  if (criteriaCount >= 3) {
    return {
      id: 'insomnia',
      name: 'Insomnia Pattern Detected',
      risk: 'high',
      detail: `Multiple insomnia indicators present: ${details.join('; ')}. This pattern is consistent with clinical insomnia criteria.`,
      recommendation: 'Consider Cognitive Behavioral Therapy for Insomnia (CBT-I), the first-line treatment recommended by the AASM. Improve sleep hygiene: consistent sleep/wake times, limit screen exposure before bed, create a cool dark environment.',
      reference: 'Diagnostic criteria per DSM-5 (APA, 2013) & ICSD-3 (AASM, 2014); Qaseem et al., Ann Intern Med, 2016',
      category: 'sleep-quality',
    };
  }
  if (criteriaCount >= 2) {
    return {
      id: 'insomnia',
      name: 'Mild Insomnia Indicators',
      risk: 'moderate',
      detail: `Some insomnia indicators present: ${details.join('; ')}. Sleep quality may be affected.`,
      recommendation: 'Focus on sleep hygiene: maintain consistent sleep schedule, avoid caffeine after 2 PM, limit blue light exposure 1 hour before bed, keep bedroom cool (18–22°C).',
      reference: 'DSM-5 & ICSD-3 criteria; Irish et al., Sleep Med Rev, 2015',
      category: 'sleep-quality',
    };
  }
  if (criteriaCount === 1) {
    return {
      id: 'insomnia',
      name: 'Sleep Quality',
      risk: 'low',
      detail: `Minor sleep quality indicator: ${details.join('; ')}. Overall sleep pattern is acceptable.`,
      recommendation: 'Minor area for improvement noted. Maintain good sleep habits.',
      reference: 'DSM-5 & ICSD-3 criteria',
      category: 'sleep-quality',
    };
  }
  return null;
}

function analyzeSleepDuration(params) {
  const { sleepDuration } = params;

  if (sleepDuration < 3) {
    return {
      id: 'duration',
      name: 'Critically Short Sleep',
      risk: 'critical',
      detail: `Only ${sleepDuration} hours of sleep recorded. Severe sleep deprivation impairs cognitive function, immune response, and cardiovascular health.`,
      recommendation: 'Immediate attention to sleep schedule required. Chronic short sleep (<4h) is associated with significantly increased mortality risk.',
      reference: 'National Sleep Foundation Sleep Duration Recommendations, 2015; Cappuccio et al., Sleep, 2010',
      category: 'sleep-quality',
    };
  }
  if (sleepDuration < 5) {
    return {
      id: 'duration',
      name: 'Insufficient Sleep Duration',
      risk: 'high',
      detail: `${sleepDuration} hours of sleep is below the minimum recommended duration. Adults need 7–9 hours for optimal health.`,
      recommendation: 'Aim for at least 7 hours of sleep. Short sleep duration is linked to obesity, diabetes, hypertension, and impaired immune function.',
      reference: 'National Sleep Foundation, 2015; Watson et al., Sleep, 2015',
      category: 'sleep-quality',
    };
  }
  if (sleepDuration < 7 || sleepDuration > 9) {
    return {
      id: 'duration',
      name: 'Sleep Duration Outside Recommended Range',
      risk: 'moderate',
      detail: `${sleepDuration} hours of sleep is ${sleepDuration < 7 ? 'below' : 'above'} the recommended 7–9 hours for adults aged 26–64.${sleepDuration > 9 ? ' Excessive sleep may indicate underlying health conditions.' : ''}`,
      recommendation: sleepDuration < 7
        ? 'Try to increase sleep duration to 7–9 hours for optimal cognitive performance and health.'
        : 'If consistently sleeping >9 hours, discuss with your physician to rule out sleep disorders or other health conditions.',
      reference: 'National Sleep Foundation Sleep Duration Recommendations (Hirshkowitz et al., Sleep Health, 2015)',
      category: 'sleep-quality',
    };
  }
  return {
    id: 'duration',
    name: 'Sleep Duration',
    risk: 'low',
    detail: `${sleepDuration} hours of sleep is within the recommended range of 7–9 hours for adults.`,
    recommendation: 'Excellent sleep duration. Maintain your current schedule.',
    reference: 'National Sleep Foundation, 2015',
    category: 'sleep-quality',
  };
}

function analyzeSnoring(params) {
  const { snoringPercent, ahi } = params;

  if (snoringPercent > 50) {
    return {
      id: 'snoring',
      name: 'Heavy Snoring',
      risk: ahi > 5 ? 'high' : 'moderate',
      detail: `Snoring detected during ${snoringPercent}% of sleep time. ${ahi > 5 ? `Combined with an AHI of ${ahi}, this strongly suggests obstructive sleep apnea.` : 'Heavy snoring is a significant risk factor for obstructive sleep apnea.'}`,
      recommendation: 'Sleep study recommended. Positional therapy (sleeping on side), weight management, and avoiding alcohol before sleep may reduce snoring. Consider mandibular advancement device.',
      reference: 'Deary et al., Sleep Medicine Reviews, 2014; Stuck et al., Sleep & Breathing, 2015',
      category: 'respiratory',
    };
  }
  if (snoringPercent > 25) {
    return {
      id: 'snoring',
      name: 'Regular Snoring',
      risk: 'moderate',
      detail: `Snoring detected during ${snoringPercent}% of sleep time. Regular snoring may indicate increased upper airway resistance.`,
      recommendation: 'Monitor for worsening. Try sleeping on your side, elevating the head of your bed, and avoiding alcohol within 3 hours of bedtime.',
      reference: 'Deary et al., Sleep Medicine Reviews, 2014',
      category: 'respiratory',
    };
  }
  if (snoringPercent > 10) {
    return {
      id: 'snoring',
      name: 'Occasional Snoring',
      risk: 'low',
      detail: `Snoring detected during ${snoringPercent}% of sleep time. Occasional snoring is common and usually benign.`,
      recommendation: 'No significant concern. Occasional snoring is normal.',
      reference: 'Deary et al., Sleep Medicine Reviews, 2014',
      category: 'respiratory',
    };
  }
  return null;
}

function analyzeEnvironment(params) {
  const { roomTemp, roomHumidity, ambientNoise, ambientLight } = params;
  const conditions = [];

  // Temperature
  if (roomTemp < 12 || roomTemp > 28) {
    conditions.push({
      id: 'env-temp',
      name: 'Room Temperature',
      risk: 'high',
      detail: `Room temperature of ${roomTemp}°C is ${roomTemp < 12 ? 'too cold' : 'too hot'} for optimal sleep. The ideal range is 18–22°C.`,
      recommendation: `${roomTemp < 12 ? 'Increase room temperature. Cold environments disrupt REM sleep and may cause vasoconstriction.' : 'Decrease room temperature. Heat exposure increases wakefulness and reduces slow-wave and REM sleep.'}`,
      reference: 'Okamoto-Mizuno & Mizuno, Sleep Medicine Reviews, 2012',
      category: 'environment',
    });
  } else if (roomTemp < 16 || roomTemp > 24) {
    conditions.push({
      id: 'env-temp',
      name: 'Room Temperature',
      risk: 'moderate',
      detail: `Room temperature of ${roomTemp}°C is ${roomTemp < 16 ? 'below' : 'above'} the optimal range of 18–22°C for sleep.`,
      recommendation: 'Adjust thermostat to 18–22°C for optimal sleep environment.',
      reference: 'Okamoto-Mizuno & Mizuno, Sleep Medicine Reviews, 2012',
      category: 'environment',
    });
  }

  // Humidity
  if (roomHumidity < 15 || roomHumidity > 70) {
    conditions.push({
      id: 'env-humidity',
      name: 'Room Humidity',
      risk: 'high',
      detail: `Room humidity of ${roomHumidity}% is ${roomHumidity < 15 ? 'critically low — may cause dry airways, nosebleeds, and skin irritation' : 'too high — promotes mold growth, dust mites, and respiratory discomfort'}.`,
      recommendation: roomHumidity < 15 ? 'Use a humidifier to bring humidity to 30–50%.' : 'Use a dehumidifier or improve ventilation. Clean for potential mold.',
      reference: 'EPA Guide to Indoor Air Quality; Arundel et al., Environmental Health Perspectives, 1986',
      category: 'environment',
    });
  } else if (roomHumidity < 20 || roomHumidity > 60) {
    conditions.push({
      id: 'env-humidity',
      name: 'Room Humidity',
      risk: 'moderate',
      detail: `Room humidity of ${roomHumidity}% is outside the optimal range of 30–50%.`,
      recommendation: 'Adjust humidity to 30–50% for optimal respiratory comfort during sleep.',
      reference: 'EPA Guide to Indoor Air Quality',
      category: 'environment',
    });
  }

  // Noise
  if (ambientNoise > 55) {
    conditions.push({
      id: 'env-noise',
      name: 'Ambient Noise',
      risk: 'high',
      detail: `Ambient noise level of ${ambientNoise} dB exceeds WHO recommended limits. Noise above 55 dB significantly disrupts sleep architecture and increases arousal events.`,
      recommendation: 'Address noise sources. Consider earplugs, white noise machines, or acoustic insulation. WHO recommends <40 dB for uninterrupted sleep.',
      reference: 'WHO Environmental Noise Guidelines for the European Region, 2018; Basner et al., Noise & Health, 2011',
      category: 'environment',
    });
  } else if (ambientNoise > 40) {
    conditions.push({
      id: 'env-noise',
      name: 'Ambient Noise',
      risk: 'moderate',
      detail: `Ambient noise level of ${ambientNoise} dB is above the WHO recommended threshold of 40 dB for nighttime. This may cause sleep fragmentation.`,
      recommendation: 'Consider reducing noise sources or using a white noise machine to mask disruptive sounds.',
      reference: 'WHO Environmental Noise Guidelines, 2018',
      category: 'environment',
    });
  }

  // Light
  if (ambientLight > 15) {
    conditions.push({
      id: 'env-light',
      name: 'Ambient Light',
      risk: 'high',
      detail: `Ambient light of ${ambientLight} lux significantly suppresses melatonin production. Even moderate light exposure (<100 lux) before and during sleep can delay circadian rhythms.`,
      recommendation: 'Use blackout curtains, remove or cover all light-emitting devices. Aim for <1 lux during sleep.',
      reference: 'Gooley et al., J Clin Endocrinol Metab, 2011; Cho et al., Chronobiology International, 2015',
      category: 'environment',
    });
  } else if (ambientLight > 5) {
    conditions.push({
      id: 'env-light',
      name: 'Ambient Light',
      risk: 'moderate',
      detail: `Ambient light of ${ambientLight} lux is above the optimal level. Light exposure during sleep can suppress melatonin onset and disrupt circadian rhythms.`,
      recommendation: 'Reduce light exposure in the bedroom. Use dim red/amber nightlights if needed. Avoid blue light from screens.',
      reference: 'Gooley et al., J Clin Endocrinol Metab, 2011',
      category: 'environment',
    });
  }

  return conditions;
}

// ---------------------------------------------------------------------------
// EMERGENCY DETECTION
// ---------------------------------------------------------------------------
function checkEmergency(params) {
  const { heartRate, breathingRate, ahi, bodyMovement } = params;

  if (heartRate <= 28 || heartRate >= 150) {
    return {
      isEmergency: true,
      type: heartRate <= 28 ? 'Cardiac Emergency — Severe Bradycardia' : 'Cardiac Emergency — Severe Tachycardia',
      message: heartRate <= 28
        ? `Heart rate at ${heartRate} bpm is critically low. Risk of cardiac arrest. Immediate intervention required.`
        : `Heart rate at ${heartRate} bpm is dangerously elevated. Risk of cardiac arrhythmia. Immediate medical attention required.`,
      actions: [
        'Contacting emergency services (1669)',
        'Alerting registered emergency contacts',
        'Transmitting vital signs data to responders',
        'Activating GPS location sharing',
      ],
    };
  }

  if (breathingRate <= 3 && breathingRate >= 0) {
    return {
      isEmergency: true,
      type: 'Respiratory Emergency — Breathing Cessation',
      message: `Breathing rate at ${breathingRate} breaths/min indicates possible respiratory failure or prolonged apnea event. Immediate intervention required.`,
      actions: [
        'Contacting emergency services (1669)',
        'Alerting registered emergency contacts',
        'Transmitting respiratory data to responders',
        'Activating GPS location sharing',
      ],
    };
  }

  if (ahi > 50) {
    return {
      isEmergency: true,
      type: 'Severe Sleep Apnea Emergency',
      message: `Apnea-Hypopnea Index of ${ahi} events/hour indicates extremely severe sleep apnea with high risk of sustained oxygen desaturation and cardiovascular complications.`,
      actions: [
        'Contacting emergency services (1669)',
        'Alerting registered emergency contacts',
        'Transmitting sleep data to responders',
      ],
    };
  }

  if (bodyMovement === 0 && breathingRate < 5 && heartRate < 35) {
    return {
      isEmergency: true,
      type: 'Unresponsive — No Movement Detected',
      message: `No body movement detected with critically low breathing (${breathingRate}/min) and heart rate (${heartRate} bpm). Patient may be unresponsive.`,
      actions: [
        'Contacting emergency services (1669)',
        'Alerting registered emergency contacts',
        'Activating audible alarm on device',
        'Transmitting all vital signs to responders',
      ],
    };
  }

  return { isEmergency: false, type: '', message: '', actions: [] };
}

// ---------------------------------------------------------------------------
// TIPS GENERATOR
// ---------------------------------------------------------------------------
function generateTips(params, conditions) {
  const tips = [];
  const risks = conditions.filter(c => c.risk === 'high' || c.risk === 'critical');

  if (params.sleepDuration < 7) {
    tips.push('Aim for 7–9 hours of sleep. Set a consistent bedtime alarm to build a routine.');
  }
  if (params.sleepOnsetLatency > 30) {
    tips.push('Taking too long to fall asleep? Try a warm bath, reading, or relaxation exercises 30 minutes before bed.');
  }
  if (params.roomTemp < 18 || params.roomTemp > 22) {
    tips.push(`Adjust your room temperature to 18–22°C (currently ${params.roomTemp}°C) for optimal sleep.`);
  }
  if (params.ambientLight > 1) {
    tips.push('Darken your room — even small amounts of light can suppress melatonin. Use blackout curtains.');
  }
  if (params.snoringPercent > 25) {
    tips.push('Try sleeping on your side to reduce snoring. Avoid alcohol within 3 hours of bedtime.');
  }
  if (params.ambientNoise > 40) {
    tips.push('Consider a white noise machine or earplugs to reduce ambient noise disruption.');
  }
  if (params.waso > 30) {
    tips.push('Waking up often? Avoid caffeine after 2 PM and limit fluids 2 hours before bed.');
  }
  if (params.bodyMovement > 15) {
    tips.push('High body movement may indicate discomfort. Check your mattress and pillow support.');
  }
  if (risks.length === 0 && tips.length === 0) {
    tips.push('Great sleep habits! Keep maintaining your consistent schedule and dark, cool environment.');
    tips.push('Regular exercise (but not within 3 hours of bedtime) can further improve sleep quality.');
  }

  return tips.slice(0, 5);
}

// ---------------------------------------------------------------------------
// OVERALL ASSESSMENT GENERATOR
// ---------------------------------------------------------------------------
function generateAssessment(sleepScore, conditions, emergency) {
  if (emergency.isEmergency) {
    return `⛔ EMERGENCY DETECTED: ${emergency.type}. Immediate medical attention required.`;
  }

  const critical = conditions.filter(c => c.risk === 'critical').length;
  const high = conditions.filter(c => c.risk === 'high').length;
  const moderate = conditions.filter(c => c.risk === 'moderate').length;

  if (critical > 0) {
    return `Critical health concerns detected. ${critical} condition(s) require urgent medical attention. Please review the alerts below and consult a healthcare provider immediately.`;
  }
  if (high > 0) {
    return `${high} high-risk condition(s) identified from your sleep data. Medical consultation recommended. Review the detailed findings below.`;
  }
  if (sleepScore >= 90) {
    return 'Excellent sleep quality! Your vital signs, sleep duration, and environment are all within optimal ranges. Keep up your healthy sleep habits.';
  }
  if (sleepScore >= 75) {
    return `Good sleep quality overall (score: ${sleepScore}/100). ${moderate > 0 ? `${moderate} area(s) could be improved.` : 'Minor adjustments could help optimize your sleep further.'} See recommendations below.`;
  }
  if (sleepScore >= 60) {
    return `Fair sleep quality (score: ${sleepScore}/100). Several factors are affecting your sleep. Review the insights below for personalized recommendations.`;
  }
  return `Poor sleep quality detected (score: ${sleepScore}/100). Multiple factors are significantly impacting your sleep. Consider consulting a sleep specialist and reviewing the recommendations below.`;
}

// ---------------------------------------------------------------------------
// SLEEP STAGES & HYPNOGRAM CLASSIFIER (Radar Ballistocardiography & Micromotion)
// Based on AASM Scoring Manual & mmWave Sleep Staging (Zhao et al. ICML 2017)
// ---------------------------------------------------------------------------
export function calculateSleepStages(params) {
  const duration = params.sleepDuration || 7.5;
  const latencyMin = params.sleepOnsetLatency || 12;
  const wasoMin = params.waso || 15;
  const awakenings = params.awakenings || 1;
  const ahi = params.ahi || 2;
  const temp = params.roomTemp || 20;
  const mov = params.bodyMovement || 4;
  const hr = params.heartRate || 62;

  // 1. Calculate Awake Time %
  const totalBedMinutes = Math.max(60, Math.round(duration * 60 + latencyMin + wasoMin));
  const awakeMinutes = latencyMin + wasoMin + awakenings * 3;
  const awakePercent = Math.min(35, Math.max(3, Math.round((awakeMinutes / totalBedMinutes) * 100)));

  // 2. Base Deep Sleep (N3) % calculation (Target: 18 - 25%)
  let baseDeepPct = 22;
  if (temp > 24) baseDeepPct -= Math.min(8, (temp - 24) * 2);
  if (ahi > 15) baseDeepPct -= Math.min(10, (ahi - 15) * 0.35);
  if (mov > 10) baseDeepPct -= Math.min(6, (mov - 10) * 0.3);
  if (awakenings > 3) baseDeepPct -= Math.min(6, (awakenings - 3) * 1.2);
  if (hr > 75) baseDeepPct -= Math.min(5, (hr - 75) * 0.2);
  const deepPercent = Math.max(5, Math.min(28, Math.round(baseDeepPct)));

  // 3. Base REM Sleep % calculation (Target: 20 - 25%)
  let baseRemPct = 23;
  if (duration < 6.5) baseRemPct -= Math.min(10, (6.5 - duration) * 4);
  if (ahi > 20) baseRemPct -= Math.min(8, (ahi - 20) * 0.25);
  if (wasoMin > 30) baseRemPct -= Math.min(6, (wasoMin - 30) * 0.15);
  const remPercent = Math.max(8, Math.min(28, Math.round(baseRemPct)));

  // 4. Light Sleep (N1 - N2) makes up the remaining sleep budget
  const lightPercent = Math.max(30, 100 - (awakePercent + deepPercent + remPercent));

  // Compute exact durations in hours & minutes
  const totalSleepHours = duration;
  const deepHours = +(totalSleepHours * (deepPercent / 100)).toFixed(1);
  const remHours = +(totalSleepHours * (remPercent / 100)).toFixed(1);
  const lightHours = +(totalSleepHours * (lightPercent / 100)).toFixed(1);
  const awakeHours = +(awakeMinutes / 60).toFixed(1);

  // 5. Generate 8-Hour Overnight Hypnogram Timeline (11:00 PM to 07:00 AM)
  const timeLabels = [
    '23:00', '23:30', '00:00', '00:30', '01:00', '01:30',
    '02:00', '02:30', '03:00', '03:30', '04:00', '04:30',
    '05:00', '05:30', '06:00', '06:30', '07:00'
  ];

  const hypnogramTimeline = timeLabels.map((time, idx) => {
    let stage = 'Light';
    let stageVal = 1; // 0: Deep, 1: Light, 2: REM, 3: Awake
    let stageColor = '#06b6d4';

    if (idx === 0 || idx === 16) {
      stage = 'Awake';
      stageVal = 3;
      stageColor = '#f59e0b';
    } else if (idx === 2 || idx === 3) {
      if (deepPercent >= 12) {
        stage = 'Deep';
        stageVal = 0;
        stageColor = '#6366f1';
      } else {
        stage = 'Light';
        stageVal = 1;
        stageColor = '#06b6d4';
      }
    } else if (idx === 4) {
      stage = 'REM';
      stageVal = 2;
      stageColor = '#a855f7';
    } else if (idx === 6 || idx === 7) {
      if (deepPercent >= 16) {
        stage = 'Deep';
        stageVal = 0;
        stageColor = '#6366f1';
      } else {
        stage = 'Light';
        stageVal = 1;
        stageColor = '#06b6d4';
      }
    } else if (idx === 8) {
      stage = 'REM';
      stageVal = 2;
      stageColor = '#a855f7';
    } else if (idx === 9 && (ahi > 25 || wasoMin > 40)) {
      stage = 'Awake';
      stageVal = 3;
      stageColor = '#f59e0b';
    } else if (idx === 10 && deepPercent >= 20) {
      stage = 'Deep';
      stageVal = 0;
      stageColor = '#6366f1';
    } else if (idx === 11 || idx === 13 || idx === 14) {
      if (remPercent >= 15) {
        stage = 'REM';
        stageVal = 2;
        stageColor = '#a855f7';
      } else {
        stage = 'Light';
        stageVal = 1;
        stageColor = '#06b6d4';
      }
    } else if (idx === 12 && awakenings >= 5) {
      stage = 'Awake';
      stageVal = 3;
      stageColor = '#f59e0b';
    }

    return {
      time,
      stage,
      stageVal,
      stageColor,
      heartRate: Math.round(params.heartRate * (stageVal === 0 ? 0.88 : stageVal === 2 ? 1.02 : stageVal === 3 ? 1.10 : 0.95)),
      breathingRate: +(params.breathingRate * (stageVal === 0 ? 0.90 : stageVal === 2 ? 1.08 : stageVal === 3 ? 1.15 : 0.98)).toFixed(1),
    };
  });

  const insights = [];
  if (deepPercent >= 16) {
    insights.push(`🔋 Physical Recovery: Deep slow-wave sleep is optimal at ${deepPercent}% (${deepHours}h), supporting cellular and tissue restoration.`);
  } else {
    insights.push(`⚠️ Reduced Deep Sleep: Deep slow-wave sleep reached only ${deepPercent}% (${deepHours}h). ${temp > 24 ? 'Bedroom heat (>24°C) is suppressing slow-wave delta cycles.' : 'Sleep fragmentation is disrupting physical restoration.'}`);
  }

  if (remPercent >= 20) {
    insights.push(`🧠 Cognitive Restoration: REM dream sleep accounted for ${remPercent}% (${remHours}h), promoting memory consolidation and mental clarity.`);
  } else {
    insights.push(`⚠️ Shortened REM Sleep: REM sleep was low at ${remPercent}% (${remHours}h). ${duration < 7 ? 'Extending sleep duration allows longer 2nd-half REM cycles.' : 'Acoustic snoring or arousals are curtailing dream states.'}`);
  }

  return {
    deep: {
      percent: deepPercent,
      durationHours: deepHours,
      status: deepPercent >= 16 ? 'optimal' : deepPercent >= 10 ? 'fair' : 'low',
      label: 'Deep (N3)',
      desc: 'Physical repair & immunity',
      color: '#6366f1',
    },
    rem: {
      percent: remPercent,
      durationHours: remHours,
      status: remPercent >= 20 ? 'optimal' : remPercent >= 14 ? 'fair' : 'low',
      label: 'REM',
      desc: 'Memory & cognitive restoration',
      color: '#a855f7',
    },
    light: {
      percent: lightPercent,
      durationHours: lightHours,
      status: 'normal',
      label: 'Light (N1-N2)',
      desc: 'Baseline transitional rest',
      color: '#06b6d4',
    },
    awake: {
      percent: awakePercent,
      durationHours: awakeHours,
      durationMinutes: awakeMinutes,
      status: awakePercent <= 12 ? 'optimal' : awakePercent <= 20 ? 'caution' : 'high',
      label: 'Awake',
      desc: 'Latency & nocturnal awakenings',
      color: '#f59e0b',
    },
    hypnogramTimeline,
    insights,
  };
}

// ---------------------------------------------------------------------------
// MAIN ANALYSIS FUNCTION
// ---------------------------------------------------------------------------
export function analyzeSleep(params) {
  // 1. Calculate sleep efficiency
  const totalBedTime = params.sleepDuration + params.sleepOnsetLatency / 60 + params.waso / 60;
  const sleepEfficiency = totalBedTime > 0 ? (params.sleepDuration / totalBedTime) * 100 : 0;

  // 2. Calculate sub-scores
  const subScores = {
    heartRate: calcHeartRateScore(params.heartRate),
    breathingRate: calcBreathingRateScore(params.breathingRate),
    movement: calcMovementScore(params.bodyMovement),
    snoring: calcSnoringScore(params.snoringPercent),
    ahi: Math.round(calcAHIScore(params.ahi)),
    duration: calcDurationScore(params.sleepDuration),
    efficiency: Math.round(clamp(sleepEfficiency, 0, 100)),
    environment: calcEnvironmentScore(params.roomTemp, params.roomHumidity, params.ambientNoise, params.ambientLight),
  };

  // 3. Weighted sleep score
  const weights = {
    duration: 0.20,
    efficiency: 0.15,
    heartRate: 0.15,
    breathingRate: 0.15,
    ahi: 0.15,
    movement: 0.08,
    snoring: 0.05,
    environment: 0.07,
  };

  let sleepScore = 0;
  for (const [key, weight] of Object.entries(weights)) {
    sleepScore += subScores[key] * weight;
  }
  sleepScore = Math.round(clamp(sleepScore, 0, 100));

  // 4. Gather all conditions
  const conditions = [];
  conditions.push(analyzeSleepApnea(params));
  conditions.push(...analyzeCardiac(params));
  conditions.push(analyzeBreathing(params));
  conditions.push(analyzeMovement(params));
  const insomniaResult = analyzeInsomnia(params);
  if (insomniaResult) conditions.push(insomniaResult);
  conditions.push(analyzeSleepDuration(params));
  const snoringResult = analyzeSnoring(params);
  if (snoringResult) conditions.push(snoringResult);
  conditions.push(...analyzeEnvironment(params));

  // 5. Check emergency
  const emergency = checkEmergency(params);

  // 6. Sleep Stages & Hypnogram Classification
  const sleepStages = calculateSleepStages(params);

  // 7. Generate assessment and tips
  const overallAssessment = generateAssessment(sleepScore, conditions, emergency);
  const tips = generateTips(params, conditions);

  return {
    sleepScore,
    sleepEfficiency: Math.round(sleepEfficiency * 10) / 10,
    subScores,
    conditions,
    emergency,
    overallAssessment,
    tips,
    sleepStages,
  };
}

