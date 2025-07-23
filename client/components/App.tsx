// import React from 'react';
import Hero from './Hero'
import Skills from './skills'
import About from './About';
import Projects from './Projects';

export default function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <Hero />
      <Skills />
      <About />
      <Projects />
    </div>
  );
}