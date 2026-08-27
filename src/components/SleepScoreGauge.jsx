import React from 'react';

export default function SleepScoreGauge({ score, size = 180 }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  let colorClass = 'text-cyan-400';
  let glowClass = 'drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]';
  
  if (score <= 40) {
    colorClass = 'text-red-500';
    glowClass = 'drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]';
  } else if (score <= 60) {
    colorClass = 'text-orange-500';
    glowClass = 'drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]';
  } else if (score <= 75) {
    colorClass = 'text-amber-400';
    glowClass = 'drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]';
  } else if (score <= 90) {
    colorClass = 'text-emerald-400';
    glowClass = 'drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]';
  }

  return (
    <div className="flex flex-col items-center justify-center relative my-6" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background track */}
        <circle
          className="text-slate-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Score progress */}
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className={`absolute flex flex-col items-center justify-center ${glowClass}`}>
        <span className={`text-5xl font-bold ${colorClass}`}>{Math.round(score)}</span>
        <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Sleep Score</span>
      </div>
    </div>
  );
}
