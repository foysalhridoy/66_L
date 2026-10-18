import React, { useState } from 'react';
import type { Announcement } from '../types';
import { COURSES } from '../data/courses';
import { formatDeadlineDisplay } from '../utils/time';
import { CountdownTimer } from './CountdownTimer';
import { ProjectTopicsAccordion } from './ProjectTopicsAccordion';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface AnnouncementCardProps {
  announcement: Announcement;
  defaultExpanded?: boolean;
  priorityRank?: number;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  defaultExpanded = false,
  priorityRank,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [prevDefaultExpanded, setPrevDefaultExpanded] = useState<boolean>(defaultExpanded);

  if (prevDefaultExpanded !== defaultExpanded) {
    setPrevDefaultExpanded(defaultExpanded);
    setIsExpanded(defaultExpanded);
  }

  const course = COURSES[announcement.course];

  const formattedDeadline = formatDeadlineDisplay(
    announcement.deadline,
    announcement.hasExactTime,
    announcement.deadlineDisplayLabel
  );

  const hasExtraDetails =
    (announcement.instructions && announcement.instructions.length > 0) ||
    Boolean(announcement.syllabus) ||
    Boolean(announcement.groupRules && announcement.groupRules.length > 0) ||
    Boolean(announcement.importantNotes && announcement.importantNotes.length > 0) ||
    Boolean(announcement.projectTopics && announcement.projectTopics.length > 0);

  // Dot color matching the screenshot's circular avatar aesthetic
  const getCourseDot = (key: string) => {
    switch (key) {
      case 'AI':
        return 'bg-[#d4ff00]';
      case 'SPIC':
        return 'bg-[#a5b4fc]';
      case 'DS':
        return 'bg-[#fbbf24]';
      case 'OS Lab':
        return 'bg-[#38bdf8]';
      default:
        return 'bg-black';
    }
  };

  return (
    <article className="bg-white/95 rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 border border-black/5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between backdrop-blur-xs">
      <div>
        {/* Compact Top Header: Priority Badge + Course Full Name + Category */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          {priorityRank !== undefined && (
            <span className="inline-flex items-center justify-center text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-black text-white shrink-0">
              #{priorityRank}
            </span>
          )}

          {/* Full Course Name Badge (Clean single line, never distorted) */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-neutral-100 text-black max-w-full min-w-0">
            <span className={`w-2 h-2 rounded-full shrink-0 ${getCourseDot(announcement.course)}`} />
            <span className="truncate">{course.fullName}</span>
          </span>

          {/* Category Badge (Clean, never breaks mid-word) */}
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-neutral-50 text-neutral-600 border border-neutral-200/70 shrink-0 whitespace-nowrap">
            {announcement.category}
          </span>
        </div>

        {/* Compact Title */}
        <h3 className="text-base sm:text-lg font-extrabold text-black tracking-tight leading-snug mb-2.5 break-words [text-wrap:pretty]">
          {announcement.title}
        </h3>

        {/* Compact Deadlines & Countdown Section */}
        <div className="space-y-2 mb-2.5">
          {/* 1. Primary Deadline (e.g. Pres. Deadline) */}
          <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide shrink-0">
                {announcement.secondaryDeadline ? 'Pres. Deadline:' : 'Deadline:'}
              </span>
              <span className="font-extrabold text-black text-xs break-normal">
                {formattedDeadline}
              </span>
            </div>

            {!announcement.deadline && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef08a]/60 text-amber-950 border border-amber-200/80 shrink-0">
                Not Announced
              </span>
            )}
          </div>

          {/* 2. Live Remaining Countdown directly under Primary Deadline */}
          {announcement.deadline && (
            <div className="pt-0.5">
              <CountdownTimer deadlineIso={announcement.deadline} />
            </div>
          )}

          {/* 3. Secondary Deadline (Assignment Deadline) under Remaining Countdown */}
          {announcement.secondaryDeadline && (
            <div className="flex flex-wrap items-center justify-between gap-1 text-xs pt-1 border-t border-black/5">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide shrink-0">
                  {announcement.secondaryDeadline.label}:
                </span>
                <span className="font-bold text-neutral-700 text-xs">
                  {announcement.secondaryDeadline.displayStatus}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef08a]/60 text-amber-950 border border-amber-200/80 shrink-0">
                Not Announced
              </span>
            </div>
          )}
        </div>

        {/* Inline Expanded Content */}
        {isExpanded && hasExtraDetails && (
          <div className="pt-2 pb-1 space-y-2.5 text-xs text-neutral-800 animate-fadeIn border-t border-black/5 mt-2">
            {/* Syllabus */}
            {announcement.syllabus && (
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-900">
                <span className="font-extrabold text-[10px] uppercase tracking-wider block mb-0.5 text-neutral-500">
                  Exam Syllabus
                </span>
                <span className="font-bold text-xs break-words [text-wrap:pretty]">{announcement.syllabus}</span>
              </div>
            )}

            {/* Group Rules */}
            {announcement.groupRules && announcement.groupRules.length > 0 && (
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-900 space-y-1">
                <span className="font-extrabold text-[10px] uppercase tracking-wider block mb-0.5 text-neutral-500">
                  Group Rules
                </span>
                <ul className="space-y-1 text-xs font-medium text-neutral-800">
                  {announcement.groupRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-black font-extrabold text-xs select-none shrink-0 leading-relaxed">•</span>
                      <span className="leading-relaxed break-words [text-wrap:pretty]">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructions */}
            {announcement.instructions && announcement.instructions.length > 0 && (
              <div className="p-2.5 sm:p-3 rounded-xl bg-neutral-50/70 border border-neutral-100 space-y-1">
                <span className="font-extrabold text-[10px] uppercase tracking-wider block text-neutral-500">
                  Full Instructions
                </span>
                <ul className="space-y-1.5 font-medium text-neutral-700">
                  {announcement.instructions.map((inst, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-black font-extrabold text-xs select-none shrink-0 leading-relaxed">•</span>
                      <span className="leading-relaxed text-xs break-words [text-wrap:pretty]">{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Important Notes */}
            {announcement.importantNotes && announcement.importantNotes.length > 0 && (
              <div className="p-2.5 rounded-xl bg-[#d4ff00]/15 border border-[#d4ff00]/40 text-neutral-950 text-xs space-y-0.5">
                <span className="font-extrabold text-[10px] text-neutral-900 block uppercase tracking-wider">
                  Important Note
                </span>
                {announcement.importantNotes.map((note, idx) => (
                  <p key={idx} className="leading-relaxed font-medium break-words [text-wrap:pretty]">
                    {note}
                  </p>
                ))}
              </div>
            )}

            {/* Project Topics (OS Lab) */}
            {announcement.projectTopics && announcement.projectTopics.length > 0 && (
              <ProjectTopicsAccordion topics={announcement.projectTopics} />
            )}
          </div>
        )}
      </div>

      {/* Compact Card Footer: Read More & Links */}
      <div className="pt-2.5 mt-2 border-t border-black/5 flex flex-wrap items-center justify-between gap-2">
        {hasExtraDetails ? (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-[11px] font-extrabold text-black hover:opacity-75 transition-opacity py-0.5 cursor-pointer"
          >
            <span>{isExpanded ? 'Read Less' : 'Read Full Instructions'}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        ) : (
          <div />
        )}

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-1.5">
          {announcement.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black hover:bg-neutral-800 text-white text-[11px] font-bold transition-all shadow-xs group"
            >
              <span>{link.label}</span>
              <ExternalLink className="w-3 h-3 text-[#d4ff00] group-hover:translate-x-0.5 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};
