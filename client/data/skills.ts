
export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Animation';
}

export const skillsData: Skill[] = [
  // Frontend
  {
    name: 'React',
    level: 45,
    category: 'Frontend'
  },
  {
    name: 'TypeScript',
    level: 40, 
    category: 'Frontend'
  },
  {
    name: 'JavaScript (ES6+)',
    level: 50,
    category: 'Frontend'
  },
  {
    name: 'Vite',
    level: 40,
    category: 'Frontend'
  },
  {
    name: 'Tailwind CSS',
    level: 35,
    category: 'Frontend'
  },
  {
    name: 'Bulma CSS',
    level: 45,
    category: 'Frontend'
  },
  
  // Backend
  {
    name: 'Node.js',
    level: 40, 
    category: 'Backend'
  },
  {
    name: 'Express.js',
    level: 45, 
    category: 'Backend'
  },
  {
    name: 'RESTful APIs',
    level: 40, 
    category: 'Backend'
  },
  {
    name: 'Knex.js',
    level: 40, 
    category: 'Backend'
  },
  {
    name: 'Auth0',
    level: 40, 
    category: 'Backend'
  },
  
  // Database
  {
    name: 'PostgreSQL',
    level: 35, 
    category: 'Database'
  },
  {
    name: 'SQLite',
    level: 40, 
    category: 'Database'
  },
  
  // Animation 
  {
    name: 'GSAP',
    level: 40,
    category: 'Animation'
  },
  {
    name: 'Framer Motion',
    level: 35,
    category: 'Animation'
  },
  
  // Essential Tools
  {
    name: 'Git & GitHub',
    level: 45,
    category: 'Tools'
  },
  {
    name: 'Agile Methodologies',
    level: 50, 
    category: 'Tools'
  },
  {
    name: 'Docker',
    level: 20,
    category: 'Tools'
  },
  {
    name: 'Render',
    level: 40,
    category: 'Tools'
  },
  {
    name: 'Vercel',
    level: 10,
    category: 'Tools'
  }
];