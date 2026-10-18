# 66_L Announcements

Official course announcements, assignments, quizzes, project topic lists, live countdown deadlines, and class routine portal for **DIU CSE Section 66_L** (Department of Computer Science & Engineering, Daffodil International University).

## Features

- **Clean & Modern White/Light Design**: Built with React, Vite, TypeScript, Tailwind CSS, and Lucide React.
- **Top Navigation Bar**: Seamless navigation between **Dashboard**, **SPIC**, **AI**, **OS**, **OS Lab**, **DS**, and **Class Routine**.
- **Course-level Filtering**: Selecting any course filters the announcements on the fly; Dashboard shows all notices.
- **Dual Section Organization**:
  - **Upcoming Deadlines**: Sorted by nearest deadline first with live ticking countdown timers (Days, Hours, Minutes, Seconds) in Asia/Dhaka (BST) time.
  - **Other Announcements**: Notices without a confirmed date/time or scheduled after exams.
- **Inline Expansion (Read Full / Read Less)**:
  - OS Lab includes all **11 approved project topics** in an interactive accordion with descriptions and learning outcomes.
  - Expands inline directly on the card without modals or page navigations.
- **Accurate Timezone Calculations**: All deadlines are computed using Bangladesh Standard Time (`Asia/Dhaka`, UTC+06:00).
- **Class Routine Section**:
  - Displays the original section class routine image without cropping and preserves aspect ratio.
  - High-resolution viewer with Zoom In, Zoom Out, Reset, Fullscreen Lightbox, and Open Raw Image.
  - Companion interactive timetable filterable by day (Monday to Thursday).
- **Deploy Ready**: Zero configuration needed for free static hosting (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Project Setup & Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   The static production bundle is generated in the `dist/` directory.

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```
