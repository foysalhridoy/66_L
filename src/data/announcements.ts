import type { Announcement } from '../types';

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ds-quiz-1',
    course: 'DS',
    category: 'Quiz',
    title: 'Quiz 1: Chapters 1–3',
    summary: 'Comprehensive quiz covering Chapters 1, 2, and 3 on BLC.',
    instructions: [
      'The quiz will be held on the BLC platform.',
      'Syllabus covers Chapters 1, 2, and 3.',
      'Please ensure a stable internet connection prior to attempting the quiz.',
    ],
    syllabus: 'Chapters 1, 2, and 3',
    deadline: '2026-10-20T22:19:00+06:00',
    hasExactTime: true,
    timezone: 'Asia/Dhaka',
    links: [
      {
        label: 'Online BLC Quiz Link',
        url: 'https://elearn.daffodilvarsity.edu.bd/course/section.php?id=835209',
        isExternal: true,
        type: 'blc',
      },
    ],
    isLong: false,
  },
  {
    id: 'ds-quiz-2',
    course: 'DS',
    category: 'Quiz',
    title: 'Quiz 2: Chapters 3–5',
    summary: 'Comprehensive quiz covering Chapters 3, 4, and 5 on BLC.',
    instructions: [
      'The quiz will be held on the BLC platform.',
      'Syllabus covers Chapters 3, 4, and 5.',
      'Review all lecture slides and practice problems before the deadline.',
    ],
    syllabus: 'Chapters 3, 4, and 5',
    deadline: '2026-10-20T22:56:00+06:00',
    hasExactTime: true,
    timezone: 'Asia/Dhaka',
    links: [
      {
        label: 'Online BLC Quiz Link',
        url: 'https://elearn.daffodilvarsity.edu.bd/course/section.php?id=835209',
        isExternal: true,
        type: 'blc',
      },
    ],
    isLong: false,
  },
  {
    id: 'ds-week-5-assignment',
    course: 'DS',
    category: 'Assignment',
    title: 'Week 5 Mathematics Problem-Solving Assignment',
    summary: 'Handwritten problem-solving assignment covering Week 5 mathematics problems.',
    instructions: [
      'Solve all mathematics problems provided in the Week 5 PDF on BLC.',
      'If you cannot solve any problem, write the question along with the details on the last page of your assignment.',
      'The teacher will conduct an online class to solve the questions students could not solve.',
      'The assignment must be handwritten and submitted via BLC.',
    ],
    importantNotes: [
      'The deadline refers to midnight at the beginning of 22 October 2026 (00:00 AM), not midnight at the end of that date.',
    ],
    deadline: '2026-10-22T00:00:00+06:00',
    hasExactTime: true,
    timezone: 'Asia/Dhaka',
    links: [
      {
        label: 'DS BLC Submission Link',
        url: 'https://elearn.daffodilvarsity.edu.bd/course/section.php?id=835209',
        isExternal: true,
        type: 'blc',
      },
    ],
    isLong: false,
  },
  {
    id: 'ai-presentation-group',
    course: 'AI',
    category: 'Assignment / Presentation',
    title: 'AI Assignment and Presentation Group Formation',
    summary: 'Mandatory 5-member group formation for AI presentation and assignment submission.',
    instructions: [
      'Everyone, please complete the spreadsheet.',
      'The presentation assignment topic list has been shared by Ma’am in the WhatsApp group. Students should refer to that list when selecting their presentation topics.',
      'Please complete the spreadsheet accordingly.',
    ],
    groupRules: [
      'Each group must have exactly 5 members.',
      'Groups with fewer than 5 members are not allowed.',
      'The maximum group size is 5 members.',
    ],
    importantNotes: [
      'The presentation assignment topic list is shared by Ma’am in the WhatsApp group. The actual topic list will be added to this announcement once provided.',
      'Displaying presentation deadline and assignment deadline separately as instructed.',
    ],
    deadline: '2026-10-24T23:59:59+06:00',
    hasExactTime: false,
    deadlineDisplayLabel: '24 October 2026',
    secondaryDeadline: {
      label: 'Assignment Deadline',
      deadline: null,
      hasTime: false,
      displayStatus: 'Deadline Not Announced',
    },
    timezone: 'Asia/Dhaka',
    links: [
      {
        label: 'AI Group Formation Spreadsheet',
        url: 'https://docs.google.com/spreadsheets/d/1CZYOTZ5WkrLRV3AfKDDxbehNGDbzduacKUbNGhlbhWY/edit?usp=sharing',
        isExternal: true,
        type: 'spreadsheet',
      },
    ],
    isLong: true,
  },
  {
    id: 'os-lab-project-topics',
    course: 'OS Lab',
    category: 'Project',
    title: 'OS Lab Project Group Selection and Topic List',
    summary: 'Complete spreadsheet registration and review of 11 approved project topics.',
    instructions: [
      'Students who have not yet completed the OS Lab project group spreadsheet should fill it out as soon as possible.',
      'Review the 11 project topics below with their complete specifications and learning outcomes.',
      'Choose your project topic according to your group preferences.',
    ],
    deadline: null,
    hasExactTime: false,
    deadlineDisplayLabel: 'Deadline Not Announced',
    timezone: 'Asia/Dhaka',
    links: [
      {
        label: 'OS Lab Project Group Spreadsheet',
        url: 'https://docs.google.com/spreadsheets/d/1jj7Q34qUuaHsrmtzH-LWdE7V35r52t5R8l6QpA10qmM/edit?usp=sharing',
        isExternal: true,
        type: 'spreadsheet',
      },
    ],
    projectTopics: [
      {
        id: 1,
        title: 'Setting up a Mail Server',
        description:
          'Create a fully functional mail server using software such as Postfix, Sendmail, or Exim for sending mail and Dovecot or Courier for receiving mail. Support SMTP, IMAP, and POP3, along with spam filtering, TLS/SSL encryption, and user authentication.',
        learningOutcomes:
          'Understand email protocols, configure mail services, implement email security, manage users, and configure spam filtering.',
      },
      {
        id: 2,
        title: 'Setting up a DHCP Server',
        description:
          'Configure a DHCP server using ISC DHCP or dnsmasq to assign IP addresses automatically. Configure address ranges, lease durations, DNS servers, and default gateways.',
        learningOutcomes:
          'Understand network configuration, IP address management, and DHCP operation.',
      },
      {
        id: 3,
        title: 'Setting up a Web Server',
        description:
          'Configure a web server using Apache, Nginx, or LiteSpeed. Support multiple websites through virtual hosting, HTTPS using TLS, and security tools such as firewalls or fail2ban.',
        learningOutcomes:
          'Understand web server configuration, security, SSL/TLS, and virtual hosting.',
      },
      {
        id: 4,
        title: 'Setting up a DNS Server',
        description:
          'Configure a DNS server using BIND or dnsmasq. Create zone files and configure A, AAAA, CNAME, and MX records. Explore DNSSEC where appropriate.',
        learningOutcomes:
          'Understand DNS architecture, record types, zone configuration, and DNS security.',
      },
      {
        id: 5,
        title: 'Setting up a Print Server',
        description:
          'Set up a print server using CUPS to manage multiple printers, print queues, and access permissions.',
        learningOutcomes:
          'Understand printer management, print server configuration, and network printing.',
      },
      {
        id: 6,
        title: 'Setting up an NFS Server',
        description:
          'Configure an NFS server to share directories with client machines. Set permissions and mount options to control access.',
        learningOutcomes:
          'Understand network file sharing, NFS configuration, access control, and network filesystems.',
      },
      {
        id: 7,
        title: 'Setting up a Samba Server',
        description:
          'Configure Samba to enable file and printer sharing between Unix/Linux and Windows systems. Implement authentication and share permissions, with optional Active Directory integration.',
        learningOutcomes:
          'Understand cross-platform file sharing, Samba configuration, and Windows-Linux integration.',
      },
      {
        id: 8,
        title: 'Android Application Development',
        description:
          'Develop an Android application using system APIs and features such as sensors, background services, and storage.',
        learningOutcomes:
          'Understand Android development, mobile operating system architecture, and system-level programming.',
      },
      {
        id: 9,
        title: 'Windows Application Development',
        description:
          'Develop a Windows application using .NET or C++. Explore system-level tasks, performance, processes, services, or registry operations.',
        learningOutcomes:
          'Understand Windows APIs, .NET or C++ development, and system-level programming.',
      },
      {
        id: 10,
        title: 'Shell Command Based Work',
        description:
          'Develop shell scripts or command-line tools to automate system monitoring, backups, file management, and user administration using Linux, macOS, or PowerShell.',
        learningOutcomes:
          'Understand shell scripting, automation, and system administration.',
      },
      {
        id: 11,
        title: 'Setting up a Proxy Server',
        description:
          'Configure a proxy server using Squid or Nginx. Explore caching, content filtering, access control, and optionally reverse proxying or load balancing.',
        learningOutcomes:
          'Understand proxy servers, caching, traffic filtering, and privacy-related concepts.',
        note: 'This is a comparatively small project, and students may choose it individually.',
      },
    ],
    isLong: true,
  },
  {
    id: 'spic-handwritten-assignment',
    course: 'SPIC',
    category: 'Assignment',
    title: 'The Nihilist Penguin',
    summary: 'Handwritten assignment to be scanned via CamScanner, converted to PDF, and submitted via BLC.',
    instructions: [
      'The assignment must be handwritten.',
      'Scan the completed assignment using CamScanner.',
      'Convert or save the scanned document as a PDF.',
      'Submit the PDF through BLC.',
    ],
    importantNotes: [
      'Deadline is after the mid exam. The exact date and time have not been announced.',
      'No submission URL has been provided by faculty yet. Do not guess or submit through unauthorized forms.',
    ],
    deadline: null,
    hasExactTime: false,
    deadlineDisplayLabel: 'Deadline Not Announced (After the mid exam)',
    timezone: 'Asia/Dhaka',
    links: [],
    isLong: false,
  },
];
