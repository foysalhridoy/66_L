import React from 'react';
import type { ClassUpdate } from '../types';
import { CLASS_UPDATES } from '../data/classUpdates';
import { COURSES } from '../data/courses';
import { AlertTriangle, Clock } from 'lucide-react';

interface ClassUpdateTickerProps {
  updates?: ClassUpdate[];
}

export const ClassUpdateTicker: React.FC<ClassUpdateTickerProps> = ({
  updates = CLASS_UPDATES,
}) => {
  const activeUpdates = updates.filter((u) => u.active);
  const hasUpdates = activeUpdates.length > 0;

  const defaultNotice =
    'Enjoy your Puja vacation and prepare well for the upcoming midterm examinations!';

  const renderNoticeContent = () => {
    if (hasUpdates) {
      return activeUpdates.map((item) => {
        const courseInfo = COURSES[item.course];
        const isCancelled = item.type === 'cancelled';
        const isRescheduled = item.type === 'rescheduled';

        return (
          <span key={item.id} className="inline-flex items-center gap-1.5">
            {isCancelled ? (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-extrabold uppercase">
                <AlertTriangle className="w-2.5 h-2.5" /> CANCELLED
              </span>
            ) : isRescheduled ? (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[9px] font-extrabold uppercase">
                <Clock className="w-2.5 h-2.5" /> TIME UPDATED
              </span>
            ) : null}

            <strong className="text-black font-extrabold">
              {courseInfo?.fullName || item.course} ({item.course})
            </strong>
            <span>• Date: <strong>{item.date}</strong></span>
            {item.originalTime && <span>• Time: {item.originalTime}</span>}
            {item.newTime && (
              <span className="text-amber-700 font-bold">
                • New Time: {item.newTime}
              </span>
            )}
            {item.reason && (
              <span className="text-neutral-500 italic">({item.reason})</span>
            )}
          </span>
        );
      });
    }

    return <span>{defaultNotice}</span>;
  };

  return (
    <div className="w-full">
      <div className="h-8 sm:h-9 bg-white/95 backdrop-blur-md rounded-full px-2.5 sm:px-3 border border-black/10 shadow-2xs flex items-center gap-2 sm:gap-2.5 overflow-hidden transition-all">
        {/* Status Badge in English */}
        <div className="shrink-0 flex items-center">
          {hasUpdates ? (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold shadow-2xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              <span>UPDATE</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-extrabold shadow-2xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4ff00] opacity-80" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d4ff00]" />
              </span>
              <span>NOTICE</span>
            </div>
          )}
        </div>

        {/* Continuous Smooth Right-to-Left Ticker in Lexend Font */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee-rtl flex items-center gap-4 font-sans text-xs sm:text-[13px] font-semibold text-neutral-800 tracking-normal select-none">
            {/* Iteration 1 */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-amber-500 text-xs shrink-0 select-none">✨</span>
              {renderNoticeContent()}
            </div>

            {/* Iteration 2 */}
            <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
              <span className="text-amber-500 text-xs shrink-0 select-none">✨</span>
              {renderNoticeContent()}
            </div>

            {/* Iteration 3 */}
            <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
              <span className="text-amber-500 text-xs shrink-0 select-none">✨</span>
              {renderNoticeContent()}
            </div>

            {/* Iteration 4 */}
            <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
              <span className="text-amber-500 text-xs shrink-0 select-none">✨</span>
              {renderNoticeContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
