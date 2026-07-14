export const profile = {
  name: 'Balappa Goudi',
  shortName: 'Balappa',
  title: 'React Native Developer',
  tagline:
    'I design, build, and ship production mobile apps end-to-end — from idea to Play Store & App Store.',
  location: 'Nagawara, Manyata Tech Park, Bangalore',
  phone: '+91 93805 52833',
  phoneHref: 'tel:+919380552833',
  email: 'balusgoudi@gmail.com',
  emailHref: 'mailto:balusgoudi@gmail.com',
  github: 'https://github.com/BaluG123',
  experienceYears: 4,
  appsLive: 16,
  installs: '15K+',
  education: {
    school: 'PES University, Bangalore',
    degree: 'B.Tech in Electronics and Communication Engineering',
    dates: 'Aug 2018 – Sep 2022',
  },
}

export type Experience = {
  company: string
  role: string
  dates: string
  current?: boolean
  highlights: string[]
  stack?: string[]
}

export const experience: Experience[] = [
  {
    company: 'Infobell IT Solutions Pvt. Ltd.',
    role: 'React Native Developer',
    dates: 'Nov 2025 – Present',
    current: true,
    stack: [
      'React Native',
      'iOS',
      'Android',
      'AI Chatbot',
      'Voice UI',
      'eKYC',
      'Face Liveness',
      'WebRTC',
    ],
    highlights: [
      'Sole developer for Vivah.ai (Android & iOS) — built the full matrimonial app end-to-end alone.',
      'Integrated AI chatbot; voice-only profile create & edit so users can manage details hands-free.',
      'Implemented eKYC, face liveness, profile liking, chat, and audio/video calling.',
      'Android & iOS builds submitted and currently in Play Store & App Store review (not live yet).',
    ],
  },
  {
    company: 'EpicMinds IT Pvt. Ltd.',
    role: 'React Native Developer',
    dates: 'Mar 2025 – Jul 2025',
    stack: ['React Native', 'Vision Camera', 'SQLite', 'GPS'],
    highlights: [
      'Built KAAMS (Karnataka Advanced Attendance Management System) for E-Governance, Government of Karnataka.',
      'Shipped face-recognition check-in/out with react-native-vision-camera and GPS lat/long verification.',
      'Integrated SQLite for offline sync across Android & iOS; delivered attendance lists, reports, and calendar views.',
      'Managed complete App Store & Play Store release: signing, metadata, and compliance.',
    ],
  },
  {
    company: 'Block Stack Pvt. Ltd.',
    role: 'React Native Developer',
    dates: 'Jun 2024 – Jan 2025',
    stack: ['React Native', 'Victory Charts', 'Biometrics', 'PDF'],
    highlights: [
      'Chain CRM: real-time analytics dashboard with Victory Charts; bulk ops handling 500+ records/min (+60% efficiency).',
      'Skeleton loading states improved perceived load time by ~40%; biometric 2FA for sensitive client data.',
      'HRMS: PDF viewer with annotation support using react-native-pdf for review & approval workflows.',
    ],
  },
  {
    company: 'Kibbcom India Pvt. Ltd.',
    role: 'Full Stack & React Native Developer',
    dates: 'Jun 2022 – Jun 2024',
    stack: ['React Native', 'Node.js', 'Maps', 'JWT', 'OTP'],
    highlights: [
      'Fleet Management: real-time vehicle tracking for 200+ vehicles with maps, battery/fuel monitoring, and trip history (1000+ trips).',
      'Driver QR check-in with geolocation verification; OTP password reset via Node.js + SMS gateway.',
      'JWT + refresh-token auth, employee directory with advanced filters for 1000+ employees.',
    ],
  },
]

/** Current company product — kept separate from personal Play Store apps */
export const vivah = {
  name: 'Vivah.ai',
  company: 'Infobell IT Solutions Pvt. Ltd.',
  role: 'Sole React Native Developer (Android & iOS)',
  dates: 'Nov 2025 – Present',
  status: 'In review — Play Store & App Store (not live yet)',
  logo: 'vivah-logo.png',
  summary:
    'AI matrimonial platform I built alone for Android and iOS — from core features to store submission.',
  features: [
    {
      title: 'AI chatbot',
      detail: 'Integrated conversational AI assistant inside the app for guided help and engagement.',
    },
    {
      title: 'Voice-only profile',
      detail: 'Users can add and edit profile details entirely through voice — hands-free onboarding & updates.',
    },
    {
      title: 'eKYC',
      detail: 'Identity verification flow with eKYC for trusted, verified matrimonial profiles.',
    },
    {
      title: 'Face liveness',
      detail: 'Face liveness detection to prevent spoofing and keep verification secure.',
    },
    {
      title: 'Profile liking',
      detail: 'Discover and interact with people by liking profiles across the network.',
    },
    {
      title: 'Chat system',
      detail: 'Real-time chat so matches can talk securely inside the app.',
    },
    {
      title: 'Audio & video calls',
      detail: 'In-app audio and video calling for richer, real-time conversations.',
    },
    {
      title: 'Solo Android & iOS',
      detail: 'Full ownership of both platforms — development through Play Store & App Store review submission.',
    },
  ],
  stack: [
    'React Native',
    'AI Chatbot',
    'Voice UI',
    'eKYC',
    'Face Liveness',
    'Chat',
    'Audio/Video Calls',
    'Android',
    'iOS',
  ],
}

export type AppCategory =
  | 'All'
  | 'Education'
  | 'Productivity'
  | 'Fitness'
  | 'Finance'
  | 'Lifestyle'
  | 'Games'
  | 'Platform'

export type AppItem = {
  id: string
  name: string
  tagline: string
  category: Exclude<AppCategory, 'All'>
  downloads: string
  playStore: string
  packageId: string
  icon: string
  highlights: string[]
  stack: string[]
  featured?: boolean
  accent: string
}

export const apps: AppItem[] = [
  {
    id: 'bookmygrounds',
    name: 'BookMyGrounds',
    tagline: 'Sports ground booking platform — startup-grade product I built end-to-end.',
    category: 'Platform',
    downloads: '50+',
    playStore: 'https://play.google.com/store/apps/details?id=in.bookmygrounds.app',
    packageId: 'in.bookmygrounds.app',
    icon: 'app-icons/bookmygrounds.png',
    featured: true,
    accent: '#7dd3c0',
    stack: ['React Native', 'Backend', 'Razorpay', 'Maps'],
    highlights: [
      'Full marketplace: players book cricket turfs, football fields & courts with live slots.',
      'Owner dashboard, flexible pricing, analytics, and Razorpay payments.',
      'Google Sign-In, GPS directions, promo codes, favorites & booking history.',
    ],
  },
  {
    id: 'jee',
    name: 'Achieve JEE 2027',
    tagline: 'JEE Main & Advanced prep with NTA-style mocks and bilingual content.',
    category: 'Education',
    downloads: '100+',
    playStore: 'https://play.google.com/store/apps/details?id=com.jeepreparationIIT',
    packageId: 'com.jeepreparationIIT',
    icon: 'app-icons/jee.png',
    featured: true,
    accent: '#c8f542',
    stack: ['React Native', 'KaTeX', 'AdMob'],
    highlights: [
      '650+ questions across Physics, Chemistry & Maths with Hindi + English.',
      'Full 180-min mocks with JEE marking, streaks, badges & All-India leaderboard.',
      'Offline math rendering — no internet needed during tests.',
    ],
  },
  {
    id: 'neet',
    name: 'NEET 2027: NCERT Prep',
    tagline: 'NCERT-first NEET companion with chapter practice and full-length mocks.',
    category: 'Education',
    downloads: '100+',
    playStore: 'https://play.google.com/store/apps/details?id=com.neetcracker',
    packageId: 'com.neetcracker',
    icon: 'app-icons/neet.png',
    featured: true,
    accent: '#ff6b4a',
    stack: ['React Native', 'Quizzes', 'Mocks'],
    highlights: [
      'Physics, Chemistry, Botany & Zoology — Class 11 & 12 NCERT-aligned.',
      '55+ practice Qs per chapter; NEET-pattern 200Q / 200-min mocks.',
      'Daily dose, streaks, bookmarks & in-app WhatsApp support.',
    ],
  },
  {
    id: 'neuralearn',
    name: 'NeuraLearn AI',
    tagline: 'Mobile academy for Python, ML, Deep Learning, GenAI & MLOps.',
    category: 'Education',
    downloads: '10+',
    playStore: 'https://play.google.com/store/apps/details?id=com.pygrounds',
    packageId: 'com.pygrounds',
    icon: 'app-icons/neuralearn.png',
    featured: true,
    accent: '#a78bfa',
    stack: ['React Native', 'Python Labs', 'Quizzes'],
    highlights: [
      'Structured path from Python foundations to production AI systems.',
      'Theory guides, interactive lessons, offline practice labs & code labs.',
      'Built-in playground to run Python-style code on phone.',
    ],
  },
  {
    id: 'rrb',
    name: 'RailAspirant',
    tagline: 'Railway exam prep for RRB NTPC, ALP, JE & Group D.',
    category: 'Education',
    downloads: '5K+',
    playStore: 'https://play.google.com/store/apps/details?id=com.rrbje',
    packageId: 'com.rrbje',
    icon: 'app-icons/rrb.png',
    featured: true,
    accent: '#38bdf8',
    stack: ['React Native', 'Django', 'Firebase', 'AdMob'],
    highlights: [
      '4,000+ organic installs across railway exam vertical.',
      'Mocks, revision mode, leaderboard — English, Hindi & Kannada.',
      'Django REST backend + Firebase for sync & auth.',
    ],
  },
  {
    id: 'mathmaster',
    name: 'Math Master',
    tagline: 'Gamified math puzzles with XP, riddles & multilingual play.',
    category: 'Games',
    downloads: '5K+',
    playStore: 'https://play.google.com/store/apps/details?id=com.riddlex',
    packageId: 'com.riddlex',
    icon: 'app-icons/mathmaster.png',
    featured: true,
    accent: '#fbbf24',
    stack: ['React Native', 'Django', 'Algorithms', 'AdMob'],
    highlights: [
      '5K+ installs; gamification lifted engagement & retention.',
      '100+ offline riddles, daily challenges, 8-language support.',
      'Algorithmic puzzle generation + AdMob monetization.',
    ],
  },
  {
    id: 'ibacio',
    name: 'IB ACIO Prep 2026',
    tagline: '2,000+ Q&As with daily current affairs for IB ACIO Tier-1.',
    category: 'Education',
    downloads: '1K+',
    playStore: 'https://play.google.com/store/apps/details?id=com.ibacio',
    packageId: 'com.ibacio',
    icon: 'app-icons/ibacio.png',
    accent: '#34d399',
    stack: ['React Native', 'Offline', 'Current Affairs'],
    highlights: [
      'English, Quant, Reasoning & GS with shuffle-answer learning.',
      'Dynamic daily current affairs feed — not static PDFs.',
      'Full-length mocks, PYQs & premium dark-mode study UI.',
    ],
  },
  {
    id: 'qrlink',
    name: 'QR Link',
    tagline: 'Fast QR scanner & generator with history and multi-language UI.',
    category: 'Productivity',
    downloads: '1K+',
    playStore: 'https://play.google.com/store/apps/details?id=com.qrscangenerate.qrlink',
    packageId: 'com.qrscangenerate.qrlink',
    icon: 'app-icons/qrlink.png',
    accent: '#c8f542',
    stack: ['React Native', 'Vision Camera'],
    highlights: [
      'High-performance scanning via react-native-vision-camera.',
      'Generate, customize, save & share QR codes offline.',
      'Scan history, favorites & 11-language support.',
    ],
  },
  {
    id: 'mathiq',
    name: 'MathIQ',
    tagline: '1,000+ IQ questions — series, patterns, algebra & brain teasers.',
    category: 'Games',
    downloads: '100+',
    playStore: 'https://play.google.com/store/apps/details?id=com.devuniverse',
    packageId: 'com.devuniverse',
    icon: 'app-icons/mathiq.png',
    accent: '#fb7185',
    stack: ['React Native', 'Leaderboard', 'AdMob'],
    highlights: [
      'Three difficulty levels and seven IQ ranks to Grandmaster.',
      'Step-by-step solutions, streaks, hints & global leaderboard.',
      'English + Hindi with Google sign-in sync.',
    ],
  },
  {
    id: 'upsc',
    name: 'UPSC Guide Pro',
    tagline: 'UPSC exam preparation with previous-year Mains papers.',
    category: 'Education',
    downloads: '100+',
    playStore: 'https://play.google.com/store/apps/details?id=com.brainbites',
    packageId: 'com.brainbites',
    icon: 'app-icons/upsc.png',
    accent: '#94a3b8',
    stack: ['React Native', 'Education'],
    highlights: [
      'Focused UPSC prep experience for serious aspirants.',
      'Includes previous year Mains question papers.',
    ],
  },
  {
    id: 'targetgeo',
    name: 'TargetGeo',
    tagline: 'World & Indian geography quizzes with maps and progress tracking.',
    category: 'Education',
    downloads: '50+',
    playStore: 'https://play.google.com/store/apps/details?id=com.targetgeo',
    packageId: 'com.targetgeo',
    icon: 'app-icons/targetgeo.png',
    accent: '#2dd4bf',
    stack: ['React Native', 'Maps', 'Quizzes'],
    highlights: [
      'World + Indian geography for UPSC, KPSC, SSC & Railway.',
      'Interactive maps, streaks, badges & global leaderboards.',
      'Offline-friendly, ad-free learning experience.',
    ],
  },
  {
    id: 'targetpolity',
    name: 'TargetPolity',
    tagline: 'Indian Constitution & polity learning for UPSC and state PSCs.',
    category: 'Education',
    downloads: '10+',
    playStore: 'https://play.google.com/store/apps/details?id=com.targetpolity',
    packageId: 'com.targetpolity',
    icon: 'app-icons/targetpolity.png',
    accent: '#818cf8',
    stack: ['React Native', 'Offline Quizzes'],
    highlights: [
      'Articles, Fundamental Rights, DPSP, Parliament & landmark cases.',
      'India events map linking polity to historical context.',
      'Offline quizzes, bookmarks, leaderboard & dark mode.',
    ],
  },
  {
    id: 'rideflow',
    name: 'RideFlow',
    tagline: 'GPS cycle & run tracker with route share cards and social feed.',
    category: 'Fitness',
    downloads: '50+',
    playStore: 'https://play.google.com/store/apps/details?id=com.rideflow.app',
    packageId: 'com.rideflow.app',
    icon: 'app-icons/rideflow.png',
    accent: '#22d3ee',
    stack: ['React Native', 'GPS', 'Social'],
    highlights: [
      'Live GPS tracking for cycling & running with rich stats.',
      'Branded route share cards + athlete social feed.',
      'Multi-language support and cloud-synced history.',
    ],
  },
  {
    id: 'piko',
    name: 'Piko Expense Tracker',
    tagline: 'Privacy-first personal expense tracking with analytics.',
    category: 'Finance',
    downloads: '10+',
    playStore: 'https://play.google.com/store/apps/details?id=com.grocexpensetracker',
    packageId: 'com.grocexpensetracker',
    icon: 'app-icons/piko.png',
    accent: '#f59e0b',
    stack: ['React Native', 'Local Storage', 'Cloud Sync'],
    highlights: [
      'Fast entry, templates, category insights & monthly reports.',
      'Guest mode keeps data on-device; optional secure cloud sync.',
      '12 Indian languages + dark mode premium UI.',
    ],
  },
  {
    id: 'digitalprayer',
    name: 'Digital Prayer',
    tagline: 'Multi-faith prayer companion — 12 religions, 30+ languages, zero ads.',
    category: 'Lifestyle',
    downloads: '50+',
    playStore: 'https://play.google.com/store/apps/details?id=com.digitalprayer',
    packageId: 'com.digitalprayer',
    icon: 'app-icons/digitalprayer.png',
    accent: '#e879f9',
    stack: ['React Native', 'Offline', 'i18n'],
    highlights: [
      'Tasbih, Rosary, Japa, Simran & more — privacy-first & fully offline.',
      'Custom prayers, streaks, journal with PDF export.',
      'No account, no ads, no tracking — GDPR/CCPA minded.',
    ],
  },
  {
    id: 'digicounter',
    name: 'DigiCounter',
    tagline: 'Simple digital prayer counter with history and clean UX.',
    category: 'Lifestyle',
    downloads: '50+',
    playStore: 'https://play.google.com/store/apps/details?id=com.digitalcounter',
    packageId: 'com.digitalcounter',
    icon: 'app-icons/digicounter.png',
    accent: '#86efac',
    stack: ['React Native', 'Local Storage'],
    highlights: [
      'Save, edit & delete prayer counts with titles and dates.',
      'Refreshed UI focused on clarity and accessibility.',
    ],
  },
]

export const skills = {
  languages: ['TypeScript', 'JavaScript', 'Python', 'HTML/CSS'],
  frameworks: [
    'React Native',
    'React.js',
    'Redux Toolkit',
    'Node.js',
    'Express.js',
    'Django',
  ],
  tools: [
    'VS Code',
    'Git',
    'Jira',
    'Postman',
    'Firebase',
    'Azure',
    'Xcode',
    'Android Studio',
  ],
  aiTools: ['Claude.ai', 'Cursor', 'Antigravity', 'Google Gemini'],
  specialties: [
    'Play Store & App Store releases',
    'Offline-first mobile (SQLite)',
    'Vision Camera / face recognition',
    'Face liveness & eKYC',
    'Voice UI / speech flows',
    'AI chatbot integration',
    'Chat + audio/video calling',
    'Maps & GPS tracking',
    'AdMob monetization',
    'JWT / biometric auth',
    'Razorpay payments',
    'LLM-assisted rapid prototyping',
  ],
}

export const categories: AppCategory[] = [
  'All',
  'Education',
  'Platform',
  'Games',
  'Fitness',
  'Finance',
  'Lifestyle',
  'Productivity',
]
