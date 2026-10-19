export type CourseKey = 'SPIC' | 'AI' | 'OS' | 'OS Lab' | 'DS';

export type NavTab = 'Dashboard' | CourseKey | 'Class Routine';

export interface CourseMeta {
  key: CourseKey;
  code: string;
  fullName: string;
  shortName: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  lightBg: string;
}

export type AnnouncementCategory =
  | 'Project'
  | 'Assignment'
  | 'Quiz'
  | 'Presentation'
  | 'Assignment / Presentation'
  | 'General';

export interface LinkItem {
  label: string;
  url: string;
  isExternal: boolean;
  type?: 'spreadsheet' | 'blc' | 'pdf' | 'other';
}

export interface ProjectTopic {
  id: number;
  title: string;
  description: string;
  learningOutcomes: string;
  note?: string;
}

export interface SecondaryDeadline {
  label: string;
  deadline: string | null;
  hasTime: boolean;
  displayStatus: string;
}

export interface SlideTopic {
  id: number;
  title: string;
  description: string;
  keyPoints?: string[];
}

export interface PresentationStep {
  step: number;
  title: string;
  instruction: string;
}

export interface AssignmentBonusTier {
  id: string;
  marks: string;
  title: string;
  condition: string;
  badge: string;
}

export interface AssignmentBonus {
  title: string;
  description: string;
  tiers: AssignmentBonusTier[];
  note?: string;
}

export interface PresentationGuidelines {
  paperNotice: string;
  slideTopics: SlideTopic[];
  submissionFlow: PresentationStep[];
  submissionDeadlineNote: string;
  assignmentBonus?: AssignmentBonus;
}

export interface Announcement {
  id: string;
  course: CourseKey;
  category: AnnouncementCategory;
  title: string;
  summary: string;
  instructions: string[];
  // ISO string with offset (e.g., "2026-10-20T22:19:00+06:00") or null
  deadline: string | null;
  // If true, deadline includes hour and minute
  hasExactTime: boolean;
  // Fallback human label when deadline is null or special (e.g. "Deadline Not Announced", "After the mid exam")
  deadlineDisplayLabel?: string;
  // Secondary deadline (e.g. for AI Assignment vs Presentation)
  secondaryDeadline?: SecondaryDeadline;
  timezone: string;
  links: LinkItem[];
  // Special inline components / data
  projectTopics?: ProjectTopic[];
  presentationGuidelines?: PresentationGuidelines;
  groupRules?: string[];
  syllabus?: string;
  importantNotes?: string[];
  isLong?: boolean;
}

export interface RoutineSlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
  course: string;
  courseCode: string;
  section: string;
  timeSlot: string;
  room: string;
  teacher: string;
  category: CourseKey;
}

export type ClassUpdateType = 'cancelled' | 'rescheduled' | 'room_change';

export interface ClassUpdate {
  id: string;
  type: ClassUpdateType;
  course: CourseKey;
  date: string; // e.g. "সোমবার, ১৯ অক্টোবর ২০২৬" or "19 October 2026"
  originalTime?: string;
  newTime?: string;
  room?: string;
  reason?: string;
  active: boolean;
}
