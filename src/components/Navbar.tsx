import React, { useState, useRef, useEffect } from 'react';
import type { NavTab, CourseKey } from '../types';
import { COURSES } from '../data/courses';
import { ChevronDown, Calendar, Check } from 'lucide-react';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  announcementCounts: Record<string, number>;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  announcementCounts,
}) => {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const courseKeys: CourseKey[] = ['SPIC', 'AI', 'OS', 'OS Lab', 'DS'];

  const isCourseActive = courseKeys.includes(currentTab as CourseKey);
  const selectedCourseName = isCourseActive ? (currentTab as CourseKey) : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCoursesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCourseSelect = (key: CourseKey) => {
    onSelectTab(key);
    setCoursesOpen(false);
  };

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5 shadow-2xs">
      <div className="max-w-5xl mx-auto px-3.5 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand - 66_L (Directly navigates to Dashboard) */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('Dashboard');
              setCoursesOpen(false);
            }}
            className="flex items-center text-left cursor-pointer group shrink-0"
            title="Go to Dashboard"
          >
            <span className="font-extrabold text-2xl text-black tracking-tight group-hover:opacity-80 transition-opacity">
              66_L
            </span>
          </button>

          {/* Nav Controls: Courses Dropdown & Highlighted Routine */}
          <div className="flex items-center gap-2">
            {/* Courses Dropdown Box */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCoursesOpen(!coursesOpen)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCourseActive
                    ? 'bg-black text-white shadow-xs'
                    : 'text-neutral-800 hover:text-black hover:bg-black/5 border border-black/10'
                }`}
                aria-expanded={coursesOpen}
              >
                <span>{selectedCourseName ? `Course: ${selectedCourseName}` : 'Courses'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    coursesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Backdrop overlay for mobile */}
              {coursesOpen && (
                <div
                  className="fixed inset-0 bg-black/25 backdrop-blur-2xs z-40 sm:hidden"
                  onClick={() => setCoursesOpen(false)}
                  aria-hidden="true"
                />
              )}

              {/* Dropdown Menu */}
              {coursesOpen && (
                <div className="fixed inset-x-3.5 top-[68px] max-w-sm mx-auto sm:max-w-none sm:mx-0 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80 bg-white rounded-3xl p-2.5 sm:p-2 border border-black/10 shadow-2xl z-50 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-black/5 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
                      Select Course
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTab('Dashboard');
                        setCoursesOpen(false);
                      }}
                      className="text-[11px] font-bold text-neutral-600 hover:text-black transition-colors cursor-pointer"
                    >
                      All Announcements
                    </button>
                  </div>

                  <div className="py-1 space-y-0.5 max-h-[60vh] sm:max-h-80 overflow-y-auto">
                    {courseKeys.map((key) => {
                      const meta = COURSES[key];
                      const isSelected = currentTab === key;
                      const count = announcementCounts[key] || 0;

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleCourseSelect(key)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-100 font-extrabold text-black'
                              : 'hover:bg-neutral-50 text-neutral-800'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${getCourseDot(key)}`} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-xs text-black">
                                  {key}
                                </span>
                                <span className="text-[10px] font-mono text-neutral-400">
                                  ({meta.code})
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-500 truncate leading-tight mt-0.5">
                                {meta.fullName}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {count > 0 && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#d4ff00] text-black">
                                {count}
                              </span>
                            )}
                            {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Highlighted Class Routine Button */}
            <button
              type="button"
              onClick={() => {
                onSelectTab('Class Routine');
                setCoursesOpen(false);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                currentTab === 'Class Routine'
                  ? 'bg-black text-white border-2 border-black ring-2 ring-[#d4ff00]'
                  : 'bg-[#d4ff00] text-black hover:bg-[#c4ec00] border border-lime-300'
              }`}
              title="View Class Routine"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Routine</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
