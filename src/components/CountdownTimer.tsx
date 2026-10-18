import React, { useState, useEffect } from 'react';
import type { CountdownResult } from '../utils/time';
import { getCountdown } from '../utils/time';
import { AlertCircle } from 'lucide-react';

interface CountdownTimerProps {
  deadlineIso: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadlineIso }) => {
  const [prevIso, setPrevIso] = useState<string>(deadlineIso);
  const [countdown, setCountdown] = useState<CountdownResult>(() => getCountdown(deadlineIso));

  if (prevIso !== deadlineIso) {
    setPrevIso(deadlineIso);
    setCountdown(getCountdown(deadlineIso));
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(getCountdown(deadlineIso));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [deadlineIso]);

  if (countdown.isPassed) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200/60 font-sans">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>Deadline Passed</span>
      </span>
    );
  }

  const isUrgent = countdown.days === 0 && countdown.hours < 12;

  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-all font-sans ${
      isUrgent
        ? 'bg-[#d4ff00] text-black border border-lime-300'
        : 'bg-black text-white'
    }`}>
      {/* Neon dot matching screenshot */}
      <span className={`w-2 h-2 rounded-full ${
        isUrgent ? 'bg-black animate-ping' : 'bg-[#d4ff00] animate-pulse'
      }`} />
      <span className="text-[11px] opacity-75 font-medium">Remaining:</span>
      <span className="tracking-wide font-extrabold">
        {countdown.days > 0 && `${countdown.days}d `}
        {`${countdown.hours.toString().padStart(2, '0')}h `}
        {`${countdown.minutes.toString().padStart(2, '0')}m `}
        {`${countdown.seconds.toString().padStart(2, '0')}s`}
      </span>
    </div>
  );
};
