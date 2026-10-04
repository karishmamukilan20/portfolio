import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Environment,
  Sphere,
  TorusKnot,
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Code2,
  Cpu,
  Database,
  Globe,
  Zap,
  ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- PROJECT DATA ---------------- */

const projects = [
  {
    number: "01",
    title: "Railway Track Health Monitoring",
    description:
      "A low-cost acoustic and vibration based system for detecting railway track anomalies and health conditions.",
    tags: ["IoT", "Signal Processing", "Python", "EEE"],
    category: "Engineering",
    link: "#",
    github: "#",
  },
  {
    number: "02",
    title: "Smart Portfolio",
    description:
      "A modern interactive developer portfolio designed with immersive UI, responsive layouts and smooth animations.",
    tags: ["React", "Three.js", "Tailwind", "GSAP"],
    category: "Web Development",
    link: "#",
    github: "#",
  },
  {
    number: "03",
    title: "Gold Price Tracker",
    description:
      "A clean web application concept for monitoring gold prices and presenting financial information simply.",
    tags: ["React", "API", "JavaScript", "UI/UX"],
    category: "Web Application",
    link: "#",
    github: "#",
  },
];

const skills = [
  {
    title: "Programming",
    icon: <Code2 size={22} />,
    items: ["C", "C++", "JavaScript", "Python"],
  },
  {
    title: "Frontend",
    icon: <Globe size={22} />,
    items: ["HTML", "CSS", "React", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: <Database size={22} />,
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Engineering",
    icon: <Cpu size={22} />,
    items: ["Electrical Basics", "Embedded Systems", "IoT", "EV Technology"],
  },
];

/* ---------------- 3D HERO OBJECT ---------------- */

function HeroObject() {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.rotation.x =
      state.clock.elapsedTime * 0.25;

    mesh.current.rotation.y =
      state.clock.elapsedTime * 0.35;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={1.5}
    >
      <TorusKnot
        ref={mesh}
        args={[1.15, 0.35, 128, 32]}
        scale={1.15}
      >
        <MeshDistortMaterial
          color="#8b5cf6"
          roughness={0.15}
          metalness={0.8}
          distort={0.35}
          speed={2}
        />
      </TorusKnot>
    </Float>
  );
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={1.2} />

      <pointLight
        position={[3, 3, 4]}
        intensity={30}
      />

      <pointLight
        position={[-4, -2, 2]}
        intensity={15}
      />

      <HeroObject />

      <Environment preset="city" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Work", "#work"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Contact", "#contact"],
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-5">
      <div className="max-w-7xl mx-auto glass rounded-full px-5 py-3 flex items-center justify-between">

        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight"
        >
          KM<span className="text-violet-400">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(([name, href]) => (
            <a
              key={name}
              href={href}
              className="text-sm text-white/60 hover:text-white transition"
            >
              {name}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-violet-200 transition"
        >
          Let's Talk
          <ArrowUpRight size={16} />
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 glass rounded-3xl p-6">
          {links.map(([name, href]) => (
            <a
              key={name}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-4 text-lg"
            >
              {name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 grid-background opacity-40" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-32 pb-20 relative z-10">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-white/60 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for opportunities
            </div>

            <p className="text-violet-300 uppercase tracking-[0.25em] text-sm mb-5">
              EEE Student • Developer • Builder
            </p>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              Building
              <br />
              <span className="text-gradient">
                ideas
              </span>
              <br />
              into reality.
            </h1>

            <p className="mt-8 text-white/55 max-w-xl text-base md:text-lg leading-relaxed">
              I'm Karishma Mukilan, an Electrical and Electronics
              Engineering student exploring software, embedded systems,
              IoT and modern digital experiences.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">

              <a
                href="#work"
                className="bg-white text-black px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-violet-200 transition"
              >
                View Projects
                <ArrowUpRight size={18} />
              </a>

              <a
                href="#contact"
                className="glass px-6 py-3 rounded-full font-medium hover:bg-white/10 transition"
              >
                Contact Me
              </a>

            </div>

            <div className="flex gap-4 mt-10">
              <a
                href="https://www.linkedin.com/in/karishma-mukilan-5151373b/"
                target="_blank"
                rel="noreferrer"
                className="text-white/50 hover:text-white transition"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white/50 hover:text-white transition"
              >
                <Github size={20} />
              </a>

              <a
                href="mailto:your-email@example.com"
                className="text-white/50 hover:text-white transition"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="h-[450px] md:h-[600px]">
            <HeroScene />
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */

function Marquee() {
  const items = [
    "EEE",
    "WEB DEVELOPMENT",
    "EMBEDDED SYSTEMS",
    "IoT",
    "REACT",
    "AI",
    "AUTOMOTIVE EV",
  ];

  return (
    <div className="marquee border-y border-white/10 py-5">
      <div className="marquee-track gap-10">

        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-10 text-white/30 font-display font-semibold tracking-widest"
          >
            <span>{item}</span>
            <span className="text-violet-400">✦</span>
          </div>
        ))}

      </div>
    </div>
  );
}

/* ---------------- PROJECT CARD ---------------- */

function ProjectCard({ project }) {
  const card = useRef();

  const handleMove = (e) => {
    const rect = card.current.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateY =
      ((x / rect.width) - 0.5) * 10;

    const rotateX =
      ((y / rect.height) - 0.5) * -10;

    gsap.to(card.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power3.out",
    });

    card.current.style.setProperty(
      "--mx",
      `${x}px`
    );

    card.current.style.setProperty(
      "--my",
      `${y}px`
    );
  };

  const handleLeave = () => {
    gsap.to(card.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  return (
    <div
      className="project-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={card}
        className="project-inner glass glass-hover rounded-3xl p-6 md:p-8 relative overflow-hidden h-full"
      >

        <div className="project-glow" />

        <div className="relative z-10">

          <div className="flex justify-between items-start mb-12">
            <span className="text-white/30 text-sm">
              {project.number}
            </span>

            <span className="text-xs text-white/40 border border-white/10 px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold">
            {project.title}
          </h3>

          <p className="text-white/50 mt-4 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-7">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 mt-8">

            <a
              href={project.link}
              className="flex items-center gap-2 text-sm hover:text-violet-300 transition"
            >
              Live
              <ExternalLink size={15} />
            </a>

            <a
              href={project.github}
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition"
            >
              GitHub
              <Github size={15} />
            </a>

          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------- WORK ---------------- */

function Work() {
  return (
    <section
      id="work"
      className="py-28 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-14">
          <p className="text-violet-300 uppercase tracking-[0.25em] text-sm">
            Selected Work
          </p>

          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
            Things I've built.
          </h2>

          <p className="text-white/45 mt-5 max-w-2xl">
            A collection of engineering, software and creative projects
            built while learning and experimenting with technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {projects.map((project) => (
            <ProjectCard
              key={project.number}
              project={project}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <section
      id="about"
      className="py-28 md:py-36 px-6 md:px-10 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        <div>
          <p className="text-violet-300 uppercase tracking-[0.25em] text-sm">
            About Me
          </p>

          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
            Curious by nature.
            <br />
            Builder by choice.
          </h2>
        </div>

        <div className="text-white/55 text-lg leading-relaxed space-y-6">

          <p>
            I'm an Electrical and Electronics Engineering student
            passionate about combining hardware and software to create
            useful technology.
          </p>

          <p>
            My current interests include embedded systems, IoT,
            automotive EV technology, web development and emerging
            technologies.
          </p>

          <p>
            I enjoy learning by building projects, participating in
            hackathons and turning ideas into working prototypes.
          </p>

          <div className="grid grid-cols-2 gap-5 pt-6">

            <div className="glass rounded-2xl p-5">
              <div className="text-3xl font-bold text-white">
                2nd
              </div>
              <div className="text-sm text-white/40 mt-1">
                Year EEE Student
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="text-3xl font-bold text-white">
                10+
              </div>
              <div className="text-sm text-white/40 mt-1">
                Technologies Exploring
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */

function Skills() {
  return (
    <section
      id="skills"
      className="py-28 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">

        <p className="text-violet-300 uppercase tracking-[0.25em] text-sm">
          Skills
        </p>

        <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-14">
          Tools I work with.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {skills.map((skill) => (
            <div
              key={skill.title}
              className="glass glass-hover rounded-3xl p-6"
            >

              <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center text-violet-300">
                {skill.icon}
              </div>

              <h3 className="font-display text-xl font-semibold mt-6">
                {skill.title}
              </h3>

              <div className="mt-5 space-y-2">
                {skill.items.map((item) => (
                  <div
                    key={item}
                    className="text-sm text-white/45"
                  >
                    {item}
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  return (
    <section
      id="contact"
      className="py-28 md:py-36 px-6 md:px-10 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">

        <div className="glass rounded-[2rem] p-8 md:p-14 overflow-hidden relative">

          <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12">

            <div>
              <p className="text-violet-300 uppercase tracking-[0.25em] text-sm">
                Contact
              </p>

              <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
                Let's build something
                <span className="text-gradient">
                  {" "}great.
                </span>
              </h2>

              <p className="text-white/45 mt-6 max-w-md">
                Have an internship opportunity, project idea or
                collaboration in mind? I'd love to hear from you.
              </p>

              <div className="flex gap-4 mt-8">

                <a
                  href="https://www.linkedin.com/in/karishma-mukilan-5151373b/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass p-3 rounded-xl hover:bg-white/10 transition"
                >
                  <Linkedin size={20} />
                </a>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass p-3 rounded-xl hover:bg-white/10 transition"
                >
                  <Github size={20} />
                </a>

              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href =
                  "mailto:your-email@example.com";
              }}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Your name"
                required
                className="w-full glass rounded-xl px-5 py-4 text-white placeholder:text-white/25"
              />

              <input
                type="email"
                placeholder="Your email"
                required
                className="w-full glass rounded-xl px-5 py-4 text-white placeholder:text-white/25"
              />

              <textarea
                placeholder="Tell me about your project..."
                rows="5"
                required
                className="w-full glass rounded-xl px-5 py-4 text-white placeholder:text-white/25 resize-none"
              />

              <button
                type="submit"
                className="w-full bg-white text-black rounded-xl py-4 font-semibold hover:bg-violet-200 transition flex items-center justify-center gap-2"
              >
                Send Message
                <ArrowUpRight size={18} />
              </button>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-5 text-sm text-white/35">

        <p>
          © {new Date().getFullYear()} Karishma Mukilan
        </p>

        <div className="flex gap-6">
          <a
            href="#home"
            className="hover:text-white transition"
          >
            Back to top
          </a>

          <a
            href="mailto:your-email@example.com"
            className="hover:text-white transition"
          >
            Email
          </a>
        </div>

      </div>

    </footer>
  );
}

/* ---------------- APP ---------------- */

export default function App() {

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const reveals =
      document.querySelectorAll(".reveal");

    reveals.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) =>
        trigger.kill()
      );
    };

  }, []);

  return (
    <>
      <div className="noise" />

      <Navbar />

      <main>
        <Hero />

        <Marquee />

        <div className="reveal">
          <Work />
        </div>

        <div className="reveal">
          <About />
        </div>

        <div className="reveal">
          <Skills />
        </div>

        <div className="reveal">
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  );
}
