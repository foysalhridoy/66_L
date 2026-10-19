import React from 'react';
import type { PresentationGuidelines as PresentationGuidelinesType } from '../types';
import {
  FileText,
  Cpu,
  Database,
  Lightbulb,
  BarChart3,
  AlertCircle,
  Video,
  Film,
  UploadCloud,
  Calendar,
  CheckCircle2,
  Sparkles,
  Award,
  Trophy,
  Star,
} from 'lucide-react';

interface PresentationGuidelinesProps {
  guidelines: PresentationGuidelinesType;
}

export const PresentationGuidelines: React.FC<PresentationGuidelinesProps> = ({ guidelines }) => {
  const getTopicIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Cpu className="w-4 h-4 text-emerald-600" />;
      case 2:
        return <Database className="w-4 h-4 text-sky-600" />;
      case 3:
        return <Lightbulb className="w-4 h-4 text-amber-600" />;
      case 4:
        return <BarChart3 className="w-4 h-4 text-indigo-600" />;
      case 5:
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      default:
        return <FileText className="w-4 h-4 text-neutral-600" />;
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <Video className="w-4 h-4 text-purple-600" />;
      case 2:
        return <Film className="w-4 h-4 text-blue-600" />;
      case 3:
        return <UploadCloud className="w-4 h-4 text-emerald-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-black" />;
    }
  };

  return (
    <div className="mt-3 pt-3 border-t border-black/5 space-y-3.5">
      {/* 1. IEEE Research Paper Assignment Banner */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-900 text-white shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#d4ff00] text-black flex items-center justify-center shrink-0 font-extrabold shadow-sm mt-0.5">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#d4ff00] border border-white/10">
                Paper Assignment
              </span>
              <span className="text-[10px] text-neutral-400 font-semibold">IEEE Research Paper</span>
            </div>
            <p className="text-xs sm:text-[13px] font-semibold text-neutral-100 leading-snug break-words [text-wrap:pretty]">
              {guidelines.paperNotice}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Five Mandatory Slide Topics */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <h4 className="text-xs font-extrabold text-black uppercase tracking-wider">
              5 Mandatory Slide Topics
            </h4>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
            From Your Assigned Paper
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {guidelines.slideTopics.map((topic, index) => {
            const isLast = index === guidelines.slideTopics.length - 1 && guidelines.slideTopics.length % 2 !== 0;
            return (
              <div
                key={topic.id}
                className={`p-3 rounded-xl bg-white border border-black/5 shadow-2xs hover:border-black/15 transition-all flex items-start gap-2.5 ${
                  isLast ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getTopicIcon(topic.id)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-extrabold text-neutral-400 font-mono">
                      {topic.id.toString().padStart(2, '0')}.
                    </span>
                    <h5 className="text-xs font-extrabold text-neutral-900 tracking-tight">
                      {topic.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-neutral-600 font-medium leading-relaxed break-words [text-wrap:pretty]">
                    {topic.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Video Recording & Merging Submission Workflow */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50/80 border border-black/5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-black" />
            <h4 className="text-xs font-extrabold text-black uppercase tracking-wider">
              Video Recording & Submission Workflow
            </h4>
          </div>
          <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200/60">
            Mandatory For All Members
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {guidelines.submissionFlow.map((stepItem) => (
            <div
              key={stepItem.step}
              className="p-2.5 rounded-xl bg-white border border-neutral-200/70 shadow-2xs space-y-1.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-[10px] font-extrabold">
                  {stepItem.step}
                </span>
                {getStepIcon(stepItem.step)}
              </div>
              <div>
                <h5 className="text-[11px] font-extrabold text-neutral-900 leading-snug mb-0.5">
                  {stepItem.title}
                </h5>
                <p className="text-[10.5px] text-neutral-600 font-medium leading-relaxed break-words [text-wrap:pretty]">
                  {stepItem.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Deadline callout banner */}
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#d4ff00]/20 border border-[#d4ff00]/60 text-black text-xs font-bold">
          <div className="flex items-center gap-2 min-w-0">
            <Calendar className="w-4 h-4 text-black shrink-0" />
            <span className="truncate">{guidelines.submissionDeadlineNote}</span>
          </div>
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-black text-white shrink-0">
            24 October
          </span>
        </div>
      </div>

      {/* 4. AI Assignment Implementation & Extra Marks Reward */}
      {guidelines.assignmentBonus && (
        <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-900 text-white shadow-xs border border-white/5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#d4ff00]/20 text-[#d4ff00] flex items-center justify-center shrink-0 border border-[#d4ff00]/30">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white tracking-tight">
                  {guidelines.assignmentBonus.title}
                </h4>
                <p className="text-[10px] text-neutral-400 font-medium">
                  {guidelines.assignmentBonus.description}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#d4ff00] text-black shrink-0">
              Extra Marks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {guidelines.assignmentBonus.tiers.map((tier) => (
              <div
                key={tier.id}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {tier.id === 'tier-1' ? (
                      <Trophy className="w-3.5 h-3.5 text-[#d4ff00] shrink-0" />
                    ) : (
                      <Star className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    )}
                    <h5 className="text-[11px] font-bold text-white tracking-tight truncate">
                      {tier.title}
                    </h5>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-black shrink-0 ${
                      tier.id === 'tier-1'
                        ? 'bg-[#d4ff00] text-black shadow-xs'
                        : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    }`}
                  >
                    {tier.marks}
                  </span>
                </div>
                <p className="text-[10.5px] text-neutral-300 font-medium leading-relaxed break-words [text-wrap:pretty]">
                  {tier.condition}
                </p>
              </div>
            ))}
          </div>

          {guidelines.assignmentBonus.note && (
            <div className="pt-1.5 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] shrink-0" />
              <span className="leading-relaxed">{guidelines.assignmentBonus.note}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
