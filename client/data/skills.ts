// client/data/skills.ts

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Animation';
}

export const skillsData: Skill[] = [
  // Frontend - Core skills only
  {
    name: 'React',
    level: 75,
    category: 'Frontend'
  },
  {
    name: 'TypeScript',
    level: 70,
    category: 'Frontend'
  },
  {
    name: 'JavaScript (ES6+)',
    level: 80,
    category: 'Frontend'
  },
  {
    name: 'Tailwind CSS',
    level: 70,
    category: 'Frontend'
  },
  
  // Backend - Core skills only
  {
    name: 'Node.js',
    level: 70,
    category: 'Backend'
  },
  {
    name: 'Express.js',
    level: 75,
    category: 'Backend'
  },
  {
    name: 'RESTful APIs',
    level: 70,
    category: 'Backend'
  },
  {
    name: 'Auth0',
    level: 65,
    category: 'Backend'
  },
  
  // Database
  {
    name: 'PostgreSQL',
    level: 65,
    category: 'Database'
  },
  {
    name: 'SQLite',
    level: 60,
    category: 'Database'
  },
  
  // Animation - Your specialty
  {
    name: 'GSAP',
    level: 60,
    category: 'Animation'
  },
  {
    name: 'CSS Animations',
    level: 65,
    category: 'Animation'
  },
  
  // Essential Tools
  {
    name: 'Git & GitHub',
    level: 75,
    category: 'Tools'
  },
  {
    name: 'Agile Methodologies',
    level: 70,
    category: 'Tools'
  }
];