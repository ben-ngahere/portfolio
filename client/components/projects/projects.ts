export interface Project {
  id: string;
  title: string;
  tagline: string;
  status: 'Live' | 'In Development';
  description: string;
  role?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  features: string[];
}

export const projectsData: Project[] = [
  {
    id: 'fono',
    title: 'FONO',
    tagline: 'Secure messaging platform with real-time encryption',
    status: 'In Development',
    description: "Building a privacy-first communication platform that explores modern security principles. It's been a proper deep dive into real-time messaging, encryption and user experience design. This ones going to keep me busy for a while...",
    techStack: ['React', 'TypeScript', 'Node.js', 'Auth0', 'PostgreSQL', 'Docker', 'Pusher', 'Tailwind CSS'],
    githubUrl: 'https://github.com/ben-ngahere/fono',
    images: [
      '/client/public/images/fono-1.png',
      '/client/public/images/fono-2.png',
      '/client/public/images/fono-3.png',
      '/client/public/images/fono-4.png',
      '/client/public/images/fono-5.png'
    ],
    features: [
      'End-to-end encrypted messaging',
      'Real-time communication with Pusher',
      'Modern privacy-first design',
      'Containerised development environment'
    ]
  },
  {
    id: 'fitquest',
    title: 'Fit Quest',
    tagline: 'Real-world fitness RPG built in one week',
    status: 'Live',
    description: "Our final group project where we gamified fitness using RPG mechanics. Users earn STR, DEX and INT points through daily quest completion. I served as Agile Facilitator, which basically meant keeping everyone organised and making sure we had something functional in a week.",
    role: 'Agile Facilitator',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Auth0', 'Tailwind CSS', 'Express.js', 'Knex.js'],
    githubUrl: 'https://github.com/ben-ngahere/fit-quest',
    liveUrl: 'https://fitquest-wupo.onrender.com/',
    images: ['/client/public/images/fitquest-screenshot.png'],
    features: [
      'RPG-style character progression',
      'Daily quest system',
      'Team collaboration in 7-day sprint',
      'Full-stack CRUD operations'
    ]
  },
  {
    id: 'thunk',
    title: 'thunk.',
    tagline: 'Digital notebook for capturing ideas',
    status: 'Live',
    description: "My first full-stack CRUD app. A secure thought and idea management platform where you can organise your random ideas without them disappearing. Built solo during bootcamp as my first attempt at connecting the dots between React, Node.js, databases and authentication/authorisation.",
    techStack: ['React', 'TypeScript', 'Node.js', 'SQLite', 'Auth0', 'Bulma CSS', 'Express.js', 'Knex.js'],
    githubUrl: 'https://github.com/ben-ngahere/thunk',
    liveUrl: 'https://thunk-jx31.onrender.com/',
    images: ['/client/public/images/thunk-screenshot.png'],
    features: [
      'Secure user authentication',
      'Intuitive content organization',
      'Responsive design',
      'Complete CRUD functionality'
    ]
  }
];
