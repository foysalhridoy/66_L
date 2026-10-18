import type { ClassUpdate } from '../types';

/**
 * Class Updates & Cancellations Data for DIU CSE Section 66_L
 *
 * - When there are NO active updates, the ticker displays in Bengali (Google Sans):
 *   "কোনো ক্লাস বাতিল হয়নি, সব ক্লাস রুটিন মাফিক যথাসময়ে অনুষ্ঠিত হবে।"
 *
 * - When a class is cancelled, rescheduled, or room changed:
 *   Add or toggle an entry here with `active: true`.
 *
 * Example structure:
 * {
 *   id: 'c-1',
 *   type: 'cancelled',
 *   course: 'OS Lab',
 *   date: 'সোমবার, ১৯ অক্টোবর ২০২৬',
 *   originalTime: '১১:৩০ AM - ০২:৩০ PM',
 *   reason: 'শিক্ষক ছুটি থাকায় ল্যাব ক্লাস বন্ধ থাকবে',
 *   active: true,
 * }
 */
export const CLASS_UPDATES: ClassUpdate[] = [];
