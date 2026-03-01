import React, { useState, useEffect } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Terminal,
  GraduationCap,
  Award,
  Phone,
  FileText,
  Menu,
  X,
} from 'lucide-react';

// --- Types ---
interface Skill {
  category: string;
  items: string[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  role?: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  points: string[];
  appLink?: string;
}

// --- Components ---

const Section = ({ id, className = "", children }: { id: string, className?: string, children: React.ReactNode }) => (
  <section id={id} className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-4xl md:text-6xl font-bold mb-20 tracking-tighter text-center grok-glow-text">
    {children}
  </h2>
);

const ExperienceCard = ({ exp, index }: { exp: Experience, index: number }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const distance = centerY - cardCenterY;
        setScrollY(distance * 0.05); // Parallax intensity
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const companyLinks: Record<string, string> = {
    'Jolt': 'https://www.thejoltapp.com',
    'SecNinjaz Technologies LLP': 'https://www.secninjaz.com',
    'Deva Consultancy Services': 'https://devaconsultancy.com',
    'StapuBox Pvt Ltd': 'https://stapubox.com/'
  };

  const link = companyLinks[exp.company];

  return (
    <div
      ref={cardRef}
      className={`relative pb-16 pl-8 md:pl-12 transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transform: `translateY(${scrollY}px)`,
        transition: 'transform 0.1s ease-out, opacity 0.4s ease-out'
      }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-8 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10" />

      {/* Timeline line */}
      {index < 5 && (
        <div className="absolute left-[5px] top-11 w-0.5 h-full bg-white/20" />
      )}

      {/* Floating Card */}
      <div
        className="relative border border-white/10 rounded-2xl p-8 bg-black/40 backdrop-blur-sm hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 hover:-translate-y-2 active:scale-110 active:-translate-y-3 transition-all duration-300 group cursor-pointer"
      >
        {/* Promotion Badge (Removed) */}

        {/* Period */}
        <div className="mb-3 text-xs text-neutral-500 font-display uppercase tracking-widest">{exp.period}</div>

        {/* Role */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:grok-glow-text transition-all duration-300">{exp.role}</h3>

        {/* Company & Type */}
        <div className="text-neutral-400 mb-6 flex items-center gap-2 text-sm font-display">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-2 group/link"
              onClick={(e) => e.stopPropagation()}
            >
              {exp.company}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
          ) : (
            exp.company
          )}
          <span className="text-white/20">•</span> {exp.type}
        </div>

        {/* Points */}
        <ul className="space-y-3 text-neutral-400 text-sm leading-relaxed font-sans">
          {exp.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        {/* Play Store Badge */}
        {exp.appLink && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <a
              href={exp.appLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all group/badge"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <span className="text-sm font-display uppercase tracking-wider text-white">View on Play Store</span>
              <ExternalLink className="w-4 h-4 opacity-60 group-hover/badge:opacity-100 transition-opacity" />
            </a>
          </div>
        )}

        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const projectImages: Record<string, string> = {
    // Images removed as requested
  };

  const image = projectImages[project.title];

  const handleCardClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group h-full flex flex-col relative overflow-hidden border border-white/10 rounded-2xl bg-black/40 backdrop-blur-sm hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 transition-all duration-300 cursor-pointer p-6"
    >
      {/* Top Section: Icon + Name */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-6">
        {/* Icon */}
        {image && (
          <img
            src={image}
            alt={project.title}
            className="w-full h-48 md:w-32 md:h-32 flex-shrink-0 object-contain bg-black rounded-2xl group-hover:scale-110 transition-transform duration-500"
          />
        )}

        {/* Name */}
        <div className="flex-1 w-full">
          <h3 className="text-2xl font-bold text-white group-hover:grok-glow-text transition-all duration-300 mt-4 md:mt-0">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-neutral-400 mb-6 leading-relaxed text-sm font-sans">
        {project.description}
      </p>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full border border-white/10 text-neutral-400 font-display uppercase tracking-wider hover:border-white/30 hover:text-white transition-colors"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Decorative corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills: Skill[] = [
    { category: "Languages", items: ["C++", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"] },
    { category: "Frontend", items: ["React.js", "React Native", "Next.js", "TailwindCSS", "Vite", "Redux"] },
    { category: "Backend & Tools", items: ["Node.js", "Express.js", "Spring Boot", "MySQL", "Socket.io", "MongoDB", "Firebase", "Git", "GitHub", "AWS (EC2)", "Postman", "Vercel", "Render", "VS Code"] },
  ];

  const experience: Experience[] = [
    {
      role: "Full-Stack Intern",
      company: "StapuBox Pvt Ltd",
      period: "Jan 2026 - Present",
      type: "Internship",
      points: [
        "Architecting a newly designed, highly optimized home page for the platform to drive better user retention and elevate the overall user experience.",
        "Engineered dynamic profile previews for seamless sharing across social platforms like WhatsApp and Instagram, boosting organic user acquisition.",
        "Developing scalable full-stack features—including player/coach profiles, squad creation, and event management—leveraging React Native, Java Spring Boot, and MySQL."
      ],
      appLink: "https://play.google.com/store/apps/details?id=com.stapubox.stapubox&hl=en_IN"
    },
    {
      role: "Front End Developer Intern",
      company: "SchoolForAll",
      period: "Nov 2023 - Jan 2024",
      type: "Internship",
      points: [
        "Architected mobile-optimized website for TheFutureClassroom project, increasing monthly pageviews by 20% (estimated 500-600 users).",
        "Spearheaded a social media content calendar including 7 posts weekly, which drove over 500 organic website referrals and boosted brand awareness by 40% in 3 months.",
        "Delivered an enterprise-grade WordPress solution through advanced theme customization and strategic plugin integration, achieving 95%+ client satisfaction.",
        "Earned LinkedIn recommendation from the CEO Dr. Surojit Saha for delivering projects 25% ahead of schedule and mentoring 2 junior team members."
      ]
    }
  ];

  const projects: Project[] = [
    {
      title: "anonyKIET",
      description: "Built end-to-end anonymous chat system using Socket.io (persistent WebSocket connections) and Redux state management, facilitating real-time bi-directional messaging for 50+ concurrent connections and maintaining 90 sec availability. Designed high-performance user discovery engine using MongoDB Aggregation Pipelines ($match, $sample operators), streaming query results that automatically exclude all existing chat partners. Engineered a secure authentication system using JSON Web Tokens (JWT) and bcrypt for password hashing, ensuring stateless session management and data integrity.",
      tech: ["React.js", "Node.js", "Redux", "Socket.io", "MongoDB", "SendGrid", "Cloudinary"],
      link: "https://anonykiet.vercel.app"
    },
    {
      title: "Brilliance Shopping Gems",
      description: "Developed a responsive e-commerce interface featuring dynamic product filtering, search functionality, and persistent cart management, ensuring a seamless modular user experience across all devices. Architected a modular codebase using TypeScript to enforce strict type safety and React Context API for efficient global state management, streamlining data flow without external libraries. Optimized frontend performance by leveraging Vite's modern build tooling and TailwindCSS, establishing a reusable component library that accelerated development and ensured consistent design standards.",
      tech: ["React.js", "TypeScript", "Vite", "TailwindCSS"],
      link: "#"
    },
    {
      title: "SmartGov",
      description: "Architected an AI-driven civic grievance platform utilizing Google Gemini to support 8 major Indian languages, achieving 90% classification accuracy during internal validation testing across diverse inputs. Engineered a high-performance Next.js frontend with Server-Side Rendering (SSR), optimizing Core Web Vitals to secure a 95/100 Google Lighthouse score. Developed a scalable grievance routing engine capable of handling 500+ concurrent requests, incorporating automated email/SMS notifications to reduce manual tracking overhead by approximately 40%.",
      tech: ["Next.js", "Google Gemini"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || isMobileMenuOpen ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="#" className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2 grok-glow-text cursor-pointer z-50">
            PRATYUSH.DEV
          </a>

          <div className="hidden md:flex gap-12">
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <a href="#contact" className="nav-link text-white">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <a href="#about" className="text-2xl font-display uppercase tracking-widest text-neutral-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#experience" className="text-2xl font-display uppercase tracking-widest text-neutral-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
          <a href="#projects" className="text-2xl font-display uppercase tracking-widest text-neutral-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
          <a href="#testimonials" className="text-2xl font-display uppercase tracking-widest text-neutral-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
          <a href="#contact" className="text-2xl font-display uppercase tracking-widest text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col lg:flex-row items-center h-full">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20 pt-12 lg:pt-0">
            <h1 className="text-5xl md:text-8xl lg:text-[100px] font-display font-bold leading-[0.9] tracking-tighter mb-8 grok-glow-text animate-fade-in select-none">
              PRATYUSH <br />
              <span className="text-neutral-500">SHARMA</span>
            </h1>

            <p className="text-xl md:text-2xl text-white max-w-xl mb-12 font-display tracking-wide leading-relaxed animate-slide-up">
              Crafting <span className="text-neutral-400">modern web applications</span> and <span className="text-neutral-400">full-stack solutions</span> with cutting-edge technologies.
            </p>

            <div className="flex flex-wrap gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <a
                href="#contact"
                className="btn-grok relative z-0"
              >
                Start a Project
              </a>
              <a
                href="#about"
                className="px-8 py-3 rounded-full border border-transparent text-neutral-400 hover:text-white font-display font-medium tracking-wide uppercase text-sm transition-colors flex items-center gap-2 group relative z-0"
              >
                View Portfolio <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Right Image - Extended Height */}
          <div className="w-full lg:absolute lg:right-0 lg:top-0 lg:w-[55%] lg:h-full h-[50vh] md:h-[700px] flex justify-end items-center z-10 mt-12 lg:mt-0 pointer-events-none">
            <div className="relative w-full h-[175%] group pointer-events-auto">
              {/* Image with blending and hover effect */}
              <img
                src="/heroPic.jpg"
                alt="Pratyush Sharma"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                style={{
                  objectPosition: '70% 60%',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to top, transparent 0%, black 60%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to top, transparent 0%, black 60%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in'
                }}
              />
              {/* Gradient Overlays for seamless blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60" />

              {/* Decorative Glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-[100px] -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Education & Skills */}
      <Section id="about">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-5">
            <h3 className="text-3xl font-display font-bold mb-12 flex items-center gap-4">
              <GraduationCap className="w-8 h-8 text-white" />
              EDUCATION
            </h3>
            <div className="space-y-12">
              <div className="group">
                <div className="text-xs text-neutral-500 font-display uppercase tracking-widest mb-2">Nov 2022 - Present</div>
                <h4 className="text-xl font-bold text-white mb-1">B.Tech Computer Science</h4>
                <p className="text-neutral-400 text-sm mb-2">KIET Group of Institutions</p>
                <div className="inline-block px-3 py-1 border border-white/10 text-white text-xs font-display uppercase tracking-wider">
                  76%
                </div>
              </div>
              <div className="group">
                <div className="text-xs text-neutral-500 font-display uppercase tracking-widest mb-2">Apr 2020 - Jul 2021</div>
                <h4 className="text-xl font-bold text-white mb-1">Intermediate (CBSE Board)</h4>
                <p className="text-neutral-400 text-sm mb-2">Oxford Public School</p>
                <div className="inline-block px-3 py-1 border border-white/10 text-white text-xs font-display uppercase tracking-wider">
                  79.6%
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-display font-bold mb-12 mt-24 flex items-center gap-4">
              <Award className="w-8 h-8 text-white" />
              ACHIEVEMENTS
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                <span className="text-neutral-400 text-sm leading-relaxed group-hover:text-white transition-colors font-sans"><strong>Core Lead, CPBYTE</strong>, KIET Group of Institutions (Nov 2024 - Oct 2025): Mentored 15+ junior developers in React.js and modern web development through 8 technical workshops and 20+ code reviews covering component architecture, state management, and performance optimization; 80% of mentees deployed production projects within 3 months.</span>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                <span className="text-neutral-400 text-sm leading-relaxed group-hover:text-white transition-colors font-sans">Led team operations and communication infrastructure for 50+ active members and 12+ technical events; achieved 95% attendance rates and facilitated 30+ successful project submissions.</span>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                <span className="text-neutral-400 text-sm leading-relaxed group-hover:text-white transition-colors font-sans"><strong>2nd Runner-Up, Hack With India</strong> (Microsoft Office, Gurugram, Apr 2024): Architected high-performance, modular solution demonstrating full-stack development and system design expertise; showcased to 500+ attendees and industry judges.</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-7">
            <h3 className="text-3xl font-display font-bold mb-12 flex items-center gap-4">
              <Terminal className="w-8 h-8 text-white" />
              TECHNICAL ARSENAL
            </h3>
            <div className="grid sm:grid-cols-2 gap-12">
              {skills.map((skill, i) => (
                <div key={i} className="space-y-6">
                  <h4 className="text-sm font-display font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4">{skill.category}</h4>
                  <div className={skill.category === "Tools" ? "grid grid-cols-3 gap-3 auto-rows-auto" : "grid grid-cols-2 gap-3"}>
                    {skill.items.map((item, j) => {
                      const techLinks: Record<string, string> = {
                        'C++': 'https://en.cppreference.com/w/cpp',
                        'Java': 'https://www.java.com',
                        'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                        'TypeScript': 'https://www.typescriptlang.org',
                        'SQL': 'https://www.mysql.com',
                        'HTML': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
                        'CSS': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
                        'React.js': 'https://react.dev',
                        'React Native': 'https://reactnative.dev',
                        'Next.js': 'https://nextjs.org',
                        'TailwindCSS': 'https://tailwindcss.com',
                        'Vite': 'https://vitejs.dev',
                        'Redux': 'https://redux.js.org',
                        'Node.js': 'https://nodejs.org',
                        'Express.js': 'https://expressjs.com',
                        'Spring Boot': 'https://spring.io/projects/spring-boot',
                        'MySQL': 'https://www.mysql.com',
                        'Socket.io': 'https://socket.io',
                        'MongoDB': 'https://www.mongodb.com',
                        'Firebase': 'https://firebase.google.com',
                        'Git': 'https://git-scm.com',
                        'GitHub': 'https://github.com',
                        'AWS (EC2)': 'https://aws.amazon.com/ec2',
                        'Postman': 'https://www.postman.com',
                        'Vercel': 'https://vercel.com',
                        'Render': 'https://render.com',
                        'VS Code': 'https://code.visualstudio.com',
                      };
                      const iconMap: Record<string, string> = {
                        'C++': 'cplusplus',
                        'Java': 'coffeescript',
                        'JavaScript': 'javascript',
                        'TypeScript': 'typescript',
                        'SQL': 'mysql',
                        'HTML': 'html5',
                        'CSS': 'css',
                        'React.js': 'react',
                        'React Native': 'react',
                        'Next.js': 'nextdotjs',
                        'TailwindCSS': 'tailwindcss',
                        'Vite': 'vite',
                        'Redux': 'redux',
                        'Node.js': 'nodedotjs',
                        'Express.js': 'express',
                        'Spring Boot': 'springboot',
                        'MySQL': 'mysql',
                        'Socket.io': 'socketdotio',
                        'MongoDB': 'mongodb',
                        'Firebase': 'firebase',
                        'Git': 'git',
                        'GitHub': 'github',
                        'AWS (EC2)': 'amazonaws',
                        'Postman': 'postman',
                        'Vercel': 'vercel',
                        'Render': 'render',
                        'VS Code': 'visualstudiocode',
                      };
                      const iconSlug = iconMap[item] || 'code';
                      const url = techLinks[item] || '#';
                      return (
                        <a
                          key={j}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2.5 border border-white/10 text-xs text-neutral-400 hover:border-white hover:text-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all cursor-pointer font-display uppercase tracking-wider flex items-center gap-2 group no-underline justify-start min-w-fit"
                        >
                          <img
                            src={`https://cdn.simpleicons.org/${iconSlug}/ffffff`}
                            alt={item}
                            className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <span className="whitespace-nowrap">{item}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" className="bg-white/[0.02]">
        <SectionTitle>EXPERIENCE</SectionTitle>
        <div className="max-w-4xl mx-auto">
          {experience.map((exp, i) => {

            return (
              <ExperienceCard
                key={i}
                exp={exp}
                index={i}
              />
            );
          })}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <SectionTitle>PROJECTS</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </Section>


      {/* Testimonials */}
      <Section id="testimonials" className="bg-white/[0.02]">
        <SectionTitle>TESTIMONIALS</SectionTitle>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div
            className="group border border-white/10 rounded-2xl p-8 bg-black/40 backdrop-blur-sm hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Dr. Surojit Saha</h3>
              <p className="text-sm text-neutral-500 mb-2 font-display">Co-Founder SchoolForAll</p>
              <p className="text-xs text-neutral-600 font-display">January 17, 2024 · Pratyush's mentor</p>
            </div>

            <div className="text-6xl font-bold text-white/20 leading-none mb-2">"</div>

            <blockquote className="text-neutral-400 leading-relaxed text-sm font-sans italic relative">
              <div className="max-h-32 group-hover:max-h-[1000px] overflow-hidden transition-all duration-500">
                Pratyush is just not one average Engg student. He has got a phenomenal bright ideas in trouble shooting any Technology related challenge, we have come across. His selflessly effort both as a team player and Individual Contributor is just unparallel. I wish him the very best. We are simply inspired by his indomitable spirit. He is a rare breed of Technocrats who doesn't talk about the best practise but the next practise. He took charge of the team, when we were lagging behind the deadline with one of our International project. He ensured with his team to deliver it without any challenge. Any Organisation who really values raw talent, Pratush will be 1 In a million. Wish you an extraordinary success, Pratush. Keep Inspiring me and our team at SchoolForall.
              </div>
            </blockquote>

            <div className="text-6xl font-bold text-white/20 leading-none text-right mt-2">"</div>
          </div>

        </div>
      </Section>


      {/* Contact */}
      < Section id="contact" >
        <div className="text-center py-24 px-6 relative overflow-hidden max-w-5xl mx-auto border-y border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-white opacity-[0.02] blur-3xl pointer-events-none" />

          <h2 className="text-4xl md:text-5xl lg:text-8xl font-display font-bold mb-12 grok-glow-text tracking-tighter">
            LET'S BUILD
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
            <a
              href="tel:+917269066998"
              className="flex items-center justify-center gap-4 px-8 py-6 border border-white/10 hover:border-white hover:bg-white/5 transition-all group relative z-0"
            >
              <Phone className="w-6 h-6 text-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <span className="font-display tracking-wider">+91 72690 66998</span>
            </a>
            <a
              href="mailto:pratyushsharma25feb@gmail.com"
              className="flex items-center justify-center gap-4 px-8 py-6 border border-white/10 hover:border-white hover:bg-white/5 transition-all group relative z-0"
            >
              <Mail className="w-6 h-6 text-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <span className="font-display tracking-wider">pratyushsharma25feb@gmail.com</span>
            </a>
          </div>

          <div className="flex justify-center gap-8">
            <a
              href="https://github.com/Pratyush2529"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-neutral-500 hover:text-black transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white overflow-hidden"
            >
              <Github className="w-8 h-8 transition-colors duration-300" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-display uppercase text-sm tracking-wider">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/pratyushsharma2520"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-neutral-500 hover:text-black transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white overflow-hidden"
            >
              <Linkedin className="w-8 h-8 transition-colors duration-300" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-display uppercase text-sm tracking-wider">LinkedIn</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1vs5d7SJDBgSpXCvWdEkV6KMpOTAesd3F/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-neutral-500 hover:text-black transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white overflow-hidden"
            >
              <FileText className="w-8 h-8 transition-colors duration-300" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-display uppercase text-sm tracking-wider">Resume</span>
            </a>
          </div>
        </div>
      </Section >

      {/* Footer */}
      < footer className="py-12 text-center text-neutral-600 text-xs font-display uppercase tracking-widest" >
        <p>© {new Date().getFullYear()} Pratyush Sharma. All rights reserved.</p>
      </footer >
    </div >
  );
}

export default App;
