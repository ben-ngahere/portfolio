// import React from 'react';
import Hero from './Hero'
import Skills from './skills'
import About from './About'
import Projects from './projects'
import Navigation from './Navigation'
import Contact from './Contact'
import { FaReact } from 'react-icons/fa';
import { SiTypescript, SiVite, SiTailwindcss, SiGreensock } from 'react-icons/si';

export default function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer className="text-center text-gray-400 py-6">
        <p className="text-sm">
          © {new Date().getFullYear()} Ben Ngahere
        </p>
        <p className="text-xs mt-2">
          Built with <FaReact className="inline w-4 h-4 text-blue-400 mx-1" /> 
          <SiTypescript className="inline w-4 h-4 text-blue-400 mx-1" /> 
          <SiVite className="inline w-4 h-4 text-purple-400 mx-1" /> 
          <SiTailwindcss className="inline w-4 h-4 text-teal-400 mx-1" />
          <SiGreensock className="inline w-4 h-4 text-green-400 mx-1" />
        </p>
      </footer>
    </div>
  );
}