import React, { useState, useEffect, useMemo } from 'react';
import type { Announcement, CourseKey } from '../types';
import { COURSES } from '../data/courses';
import { AnnouncementCard } from './AnnouncementCard';
import { History, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

interface DashboardViewProps {
  announcements: Announcement[];
  selectedCourse: CourseKey | 'ALL';
  onResetCourseFilter: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  announcements,
  selectedCourse,
  onResetCourseFilter,
}) => {
  const [currentTime, setCurrentTime] = useState<number>(() => Date.now());
  const [showExpired, setShowExpired] = useState<boolean>(false);

  // Live timer tick to automatically expire deadlines in real time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter announcements by course
  const filtered = useMemo(() => {
    if (selectedCourse === 'ALL') return announcements;
    return announcements.filter((a) => a.course === selectedCourse);
  }, [announcements, selectedCourse]);

  // Section 1: Active Upcoming Deadlines (Priority sorted: nearest deadline first, auto-removed when expired)
  const activeUpcomingDeadlines = useMemo(() => {
    return filtered
      .filter((a) => {
        if (!a.deadline) return false;
        const targetTime = a.deadline.includes('T')
          ? new Date(a.deadline).getTime()
          : new Date(`${a.deadline}T23:59:59+06:00`).getTime();
        return targetTime > currentTime;
      })
      .sort((a, b) => {
        const timeA = a.deadline!.includes('T')
          ? new Date(a.deadline!).getTime()
          : new Date(`${a.deadline!}T23:59:59+06:00`).getTime();
        const timeB = b.deadline!.includes('T')
          ? new Date(b.deadline!).getTime()
          : new Date(`${b.deadline!}T23:59:59+06:00`).getTime();
        return timeA - timeB;
      });
  }, [filtered, currentTime]);

  // Expired / Passed Deadlines (collected cleanly so students can check past tasks if needed)
  const expiredDeadlines = useMemo(() => {
    return filtered
      .filter((a) => {
        if (!a.deadline) return false;
        const targetTime = a.deadline.includes('T')
          ? new Date(a.deadline).getTime()
          : new Date(`${a.deadline}T23:59:59+06:00`).getTime();
        return targetTime <= currentTime;
      })
      .sort((a, b) => {
        const timeA = a.deadline!.includes('T')
          ? new Date(a.deadline!).getTime()
          : new Date(`${a.deadline!}T23:59:59+06:00`).getTime();
        const timeB = b.deadline!.includes('T')
          ? new Date(b.deadline!).getTime()
          : new Date(`${b.deadline!}T23:59:59+06:00`).getTime();
        return timeB - timeA; // Most recently expired first
      });
  }, [filtered, currentTime]);

  // Section 2: Other Announcements (without a confirmed deadline)
  const otherAnnouncements = useMemo(() => {
    return filtered.filter((a) => a.deadline === null);
  }, [filtered]);

  const activeCourseMeta = selectedCourse !== 'ALL' ? COURSES[selectedCourse] : null;
  const isCourseView = selectedCourse !== 'ALL';

  return (
    <div className="space-y-6 transition-all duration-300">
      {/* Course Header with "Go to Dashboard Section" button */}
      {activeCourseMeta ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/95 rounded-2xl p-3.5 sm:p-4 border border-black/5 shadow-2xs">
          <button
            type="button"
            onClick={onResetCourseFilter}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold bg-black text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-xs group self-start"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#d4ff00] group-hover:-translate-x-0.5 transition-transform" />
            <span>Go to Dashboard Section</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-black">
              {activeCourseMeta.fullName}
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              ({activeCourseMeta.code})
            </span>
          </div>
        </div>
      ) : (
        <div className="pt-1 pb-0.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse shrink-0" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight">
              Announcements & <span className="bg-[#d4ff00] text-black px-2 py-0.2 rounded-lg">Deadlines</span>
            </h1>
          </div>
        </div>
      )}

      {/* SECTION 1: UPCOMING DEADLINES (Active only, auto-removed when expired) */}
      {activeUpcomingDeadlines.length > 0 && (
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="text-xs sm:text-sm font-extrabold text-black tracking-tight uppercase tracking-wider">
              Active Priority Deadlines
            </h2>
            <span className="text-[11px] font-bold text-neutral-500">
              {activeUpcomingDeadlines.length} remaining
            </span>
          </div>

          {/* Compact 2-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
            {activeUpcomingDeadlines.map((announcement, index) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                defaultExpanded={isCourseView}
                priorityRank={index + 1}
              />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: OTHER ANNOUNCEMENTS (Without a confirmed deadline) */}
      {otherAnnouncements.length > 0 && (
        <section className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a5b4fc]" />
              <h2 className="text-xs sm:text-sm font-extrabold text-black tracking-tight uppercase tracking-wider">
                Other Notices
              </h2>
            </div>
            <span className="text-[11px] font-bold text-neutral-500">
              {otherAnnouncements.length} {otherAnnouncements.length === 1 ? 'notice' : 'notices'}
            </span>
          </div>

          {/* Compact 2-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
            {otherAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                defaultExpanded={isCourseView}
              />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: EXPIRED / PASSED DEADLINES (Collapsed by default, keeps data accessible) */}
      {expiredDeadlines.length > 0 && (
        <section className="pt-2">
          <div className="flex items-center justify-between border-t border-black/5 pt-3">
            <button
              type="button"
              onClick={() => setShowExpired(!showExpired)}
              className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-black transition-colors cursor-pointer py-1"
            >
              <History className="w-3.5 h-3.5" />
              <span>
                {showExpired ? 'Hide' : 'View'} Past / Expired Tasks ({expiredDeadlines.length})
              </span>
              {showExpired ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <span className="text-[10px] text-neutral-400 font-medium">
              Automatically archived after deadline
            </span>
          </div>

          {showExpired && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 opacity-80">
              {expiredDeadlines.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  defaultExpanded={isCourseView}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Empty State */}
      {activeUpcomingDeadlines.length === 0 && otherAnnouncements.length === 0 && (
        <div className="bg-white/90 rounded-2xl p-8 text-center border border-black/5">
          <p className="text-xs font-bold text-neutral-600">
            No active announcements found for this view.
          </p>
        </div>
      )}
    </div>
  );
};
