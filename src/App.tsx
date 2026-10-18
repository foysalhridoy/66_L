import React, { useState, useEffect, useMemo } from 'react';
import type { NavTab, CourseKey, Announcement } from './types';
import { ANNOUNCEMENTS } from './data/announcements';
import { COURSES } from './data/courses';
import { Navbar } from './components/Navbar';
import { ClassUpdateTicker } from './components/ClassUpdateTicker';
import { DashboardView } from './components/DashboardView';
import { RoutineView } from './components/RoutineView';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('Dashboard');
  const [currentTime, setCurrentTime] = useState<number>(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute active announcement counts per tab
  const announcementCounts = useMemo(() => {
    const isAnnouncementActive = (a: Announcement) => {
      if (!a.deadline) return true;
      const targetTime = a.deadline.includes('T')
        ? new Date(a.deadline).getTime()
        : new Date(`${a.deadline}T23:59:59+06:00`).getTime();
      return targetTime > currentTime;
    };

    const activeList = ANNOUNCEMENTS.filter(isAnnouncementActive);
    const counts: Record<string, number> = {
      Dashboard: activeList.length,
    };
    (Object.keys(COURSES) as CourseKey[]).forEach((key) => {
      counts[key] = activeList.filter((a) => a.course === key).length;
    });
    return counts;
  }, [currentTime]);

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetCourseFilter = () => {
    setCurrentTab('Dashboard');
  };

  const selectedCourse: CourseKey | 'ALL' =
    currentTab !== 'Dashboard' && currentTab !== 'Class Routine'
      ? (currentTab as CourseKey)
      : 'ALL';

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 flex flex-col font-sans selection:bg-[#d4ff00] selection:text-black relative overflow-x-hidden">
      {/* Ambient gradient auras matching the screenshot */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(circle 600px at 85% 10%, rgba(199, 210, 254, 0.5), transparent 65%),
            radial-gradient(circle 550px at 5% 55%, rgba(217, 249, 157, 0.4), transparent 60%),
            radial-gradient(circle 450px at 70% 85%, rgba(224, 231, 255, 0.35), transparent 60%)
          `,
        }}
      />

      {/* Fixed Top Navigation */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          announcementCounts={announcementCounts}
        />

        {/* Main Content Area with top padding for fixed navbar */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-6 pt-20 sm:pt-24 pb-4 sm:pb-6 space-y-5 sm:space-y-6">
          {/* Cute Class Cancellation / Routine Update Announcement Ticker */}
          <ClassUpdateTicker />

          {currentTab === 'Class Routine' ? (
            <RoutineView onBackToDashboard={() => handleSelectTab('Dashboard')} />
          ) : (
            <DashboardView
              announcements={ANNOUNCEMENTS}
              selectedCourse={selectedCourse}
              onResetCourseFilter={handleResetCourseFilter}
            />
          )}
        </main>

        {/* Minimal Clean Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
