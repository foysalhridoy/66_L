import React, { useState } from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { ROUTINE_SLOTS } from '../data/routine';

interface RoutineViewProps {
  onBackToDashboard?: () => void;
}

export const RoutineView: React.FC<RoutineViewProps> = ({ onBackToDashboard }) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Bar with Go to Dashboard Button */}
      {onBackToDashboard && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold bg-black text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-xs group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#d4ff00] group-hover:-translate-x-0.5 transition-transform" />
            <span>Go to Dashboard Section</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-xs font-bold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]" />
            <span>Official Schedule</span>
          </div>
          <h2 className="text-2xl font-extrabold text-black tracking-tight">
            Class Schedule : 66_L
          </h2>
          <p className="text-xs text-neutral-500 font-medium mt-0.5">
            DIU CSE Section 66_L Official Class Routine
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTable(!showTable)}
            className="px-4 py-2 rounded-full text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-black transition-colors cursor-pointer"
          >
            {showTable ? 'View Routine Image' : 'View Schedule Table'}
          </button>

          <a
            href="/routine.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs group"
          >
            <span>Open Image</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#d4ff00] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Routine Image */}
      {!showTable ? (
        <div className="bg-white/95 rounded-3xl p-3 sm:p-5 border border-black/5 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)] flex justify-center">
          <img
            src="/routine.jpg"
            alt="Class Schedule : 66_L DIU CSE"
            className="rounded-2xl max-w-full h-auto object-contain border border-neutral-200/60"
          />
        </div>
      ) : (
        /* Minimal Schedule Table */
        <div className="bg-white/95 rounded-3xl border border-black/5 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 text-neutral-600 uppercase font-bold border-b border-black/5">
                <tr>
                  <th className="py-3 px-4">Day</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Time Slot</th>
                  <th className="py-3 px-4">Room</th>
                  <th className="py-3 px-4">Teacher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {ROUTINE_SLOTS.map((slot, index) => (
                  <tr key={index} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-black">{slot.day}</td>
                    <td className="py-3 px-4 text-neutral-800 font-semibold">
                      {slot.course} <span className="text-neutral-400 font-bold text-[11px]">({slot.courseCode})</span>
                    </td>
                    <td className="py-3 px-4 text-neutral-700 font-semibold">{slot.timeSlot}</td>
                    <td className="py-3 px-4 font-bold text-neutral-900">{slot.room}</td>
                    <td className="py-3 px-4 font-extrabold text-black">{slot.teacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
