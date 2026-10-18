import React, { useState } from 'react';
import type { ProjectTopic } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProjectTopicsAccordionProps {
  topics: ProjectTopic[];
}

export const ProjectTopicsAccordion: React.FC<ProjectTopicsAccordionProps> = ({ topics }) => {
  const [openIds, setOpenIds] = useState<number[]>([1]);

  const toggleTopic = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="mt-3 pt-3 border-t border-slate-100">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Approved Topics ({topics.length})
        </span>
        <button
          type="button"
          onClick={() => {
            if (openIds.length === topics.length) {
              setOpenIds([]);
            } else {
              setOpenIds(topics.map((t) => t.id));
            }
          }}
          className="text-xs font-semibold text-slate-600 hover:text-black transition-colors cursor-pointer"
        >
          {openIds.length === topics.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="space-y-1.5">
        {topics.map((topic) => {
          const isOpen = openIds.includes(topic.id);
          return (
            <div
              key={topic.id}
              className="rounded-2xl bg-neutral-50 border border-neutral-100 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className="w-full flex items-center justify-between p-3 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2 pr-2">
                  <span className="text-xs font-extrabold text-neutral-400">
                    {topic.id.toString().padStart(2, '0')}.
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900">
                    {topic.title}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-3 pb-3 pt-0 text-xs text-neutral-600 space-y-2 border-t border-neutral-100/80 bg-white/50">
                  <p className="leading-relaxed pt-2 break-words [text-wrap:pretty]">
                    {topic.description}
                  </p>
                  <p className="leading-relaxed text-neutral-800 break-words [text-wrap:pretty]">
                    <strong className="text-neutral-900 font-bold">Learning outcomes:</strong> {topic.learningOutcomes}
                  </p>
                  {topic.note && (
                    <p className="text-amber-900 bg-amber-50 p-2 rounded-xl text-[11px] font-medium border border-amber-100 break-words [text-wrap:pretty]">
                      {topic.note}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
