import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
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
  ExternalLink,
} from "lucide-react";

/* =========================================================
   PERSONAL INFORMATION
   ========================================================= */

const PERSONAL = {
  name: "Karishma Mukilan",
  email: "karishmamukilan2008@gmail.com",
  github: "https://github.com/karishmamukilan20",
  linkedin:
    "https://www.linkedin.com/in/karishma-mukilan-5151373b4/",
  resume: "/resume.pdf",
};

/* =========================================================
   PROJECTS
   ========================================================= */

const projects = [
  {
    number: "01",
    title: "Railway Track Health Monitoring",
    description:
      "A low-cost acoustic and vibration based system for detecting railway track anomalies and monitoring track health.",
    tags: ["IoT", "Signal Processing", "Python", "EEE"],
    category: "Engineering",
    link: "#",
    github: PERSONAL.github,
  },
  {
    number: "02",
    title: "Smart Portfolio",
    description:
      "A futuristic personal portfolio combining modern web development with an interactive 3D experience.",
    tags: ["React", "Three.js", "JavaScript", "UI/UX"],
    category: "Web Development",
    link: "#home",
    github: PERSONAL.github,
  },
  {
    number: "03",
    title: "Gold Price Tracker",
    description:
      "A web application concept for monitoring gold prices and presenting financial information through a simple interface.",
    tags: ["React", "API", "JavaScript", "UI"],
    category: "Web Application",
    link: "#",
    github: PERSONAL.github,
  },
];

/* =========================================================
   SKILLS
   ========================================================= */

const skills = [
  {
    title: "Programming",
    icon: <Code2 size={22} />,
    items: ["C", "C++", "Java", "JavaScript"],
  },
  {
    title: "Frontend",
    icon: <Globe size={22} />,
    items: ["HTML", "CSS", "React", "Tailwind CSS"],
  },
  {
    title: "MERN Stack",
    icon: <Database size={22} />,
    items: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    title: "Engineering",
    icon: <Cpu size={22} />,
    items: [
      "Embedded Systems",
      "Automation",
      "IoT",
      "Electrical Engineering",
    ],
  },
];

/* =========================================================
   HOLOGRAPHIC SPHERE
   ========================================================= */

function HolographicSphere() {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const ringOneRef = useRef(null);
  const ringTwoRef = useRef(null);

  const nodes = [
    [1.25, 0.2, 0.35],
    [-1.2, 0.35, 0.3],
    [0.35, 1.25, 0.15],
    [-0.3, -1.25, 0.25],
    [0.5, 0.25, 1.25],
    [-0.5, -0.2, -1.25],
    [0.95, 0.7, -0.5],
    [-0.9, -0.7, 0.6],
    [0.2, -0.7, 1.0],
    [-0.2, 0.75, -1.0],
  ];

  const connections = [
    [nodes[0], nodes[1]],
    [nodes[0], nodes[2]],
    [nodes[0], nodes[4]],
    [nodes[1], nodes[3]],
    [nodes[1], nodes[5]],
    [nodes[2], nodes[4]],
    [nodes[2], nodes[6]],
    [nodes[3], nodes[7]],
    [nodes[3], nodes[8]],
    [nodes[4], nodes[8]],
    [nodes[4], nodes[9]],
    [nodes[5], nodes[7]],
    [nodes[5], nodes[9]],
    [nodes[6], nodes[9]],
    [nodes[7], nodes[8]],
  ];

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.12;
      groupRef.current.rotation.x = Math.sin(time * 0.35) * 0.08;
    }

    if (ringOneRef.current) {
      ringOneRef.current.rotation.y = time * 0.35;
      ringOneRef.current.rotation.x = 0.8;
    }

    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.z = -time * 0.28;
      ringTwoRef.current.rotation.x = 1.15;
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.12;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef} scale={1.25}>
      {/* Outer wireframe shell */}
      <Sphere args={[1.5, 48, 48]}>
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.16}
        />
      </Sphere>

      {/* Second shell */}
      <Sphere args={[1.3, 32, 32]}>
        <meshBasicMaterial
          color="#c4b5fd"
          wireframe
          transparent
          opacity={0.18}
        />
      </Sphere>

      {/* Inner shell */}
      <Sphere args={[1.05, 32, 32]}>
        <meshBasicMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Orbital ring 1 */}
      <mesh ref={ringOneRef}>
        <torusGeometry args={[1.65, 0.012, 12, 128]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ringTwoRef}>
        <torusGeometry args={[1.72, 0.008, 12, 128]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Circuit connections */}
      {connections.map((connection, index) => (
        <Line
          key={`connection-${index}`}
          points={connection}
          color="#a78bfa"
          transparent
          opacity={0.55}
          lineWidth={1}
        />
      ))}

      {/* Circuit nodes */}
      {nodes.map((position, index) => (
        <mesh key={`node-${index}`} position={position}>
          <sphereGeometry
            args={[
              index % 3 === 0 ? 0.075 : 0.045,
              16,
              16,
            ]}
          />

          <meshBasicMaterial
            color={index % 3 === 0 ? "#ffffff" : "#c4b5fd"}
          />
        </mesh>
      ))}

      {/* Central AI core */}
      <group ref={coreRef}>
        <Sphere args={[0.22, 32, 32]}>
          <meshBasicMaterial color="#ffffff" />
        </Sphere>

        <Sphere args={[0.38, 32, 32]}>
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.18}
          />
        </Sphere>

        <Sphere args={[0.52, 32, 32]}>
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.08}
            wireframe
          />
        </Sphere>
      </group>

      {/* Floating data points */}
      <mesh position={[1.75, 0, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <mesh position={[-1.75, 0, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#c4b5fd" />
      </mesh>

      <mesh position={[0, 1.75, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <mesh position={[0, -1.75, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#c4b5fd" />
      </mesh>
    </group>
  );
}

/* =========================================================
   THREE.JS SCENE
   ========================================================= */

function HeroScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <ambientLight intensity={0.6} />

      <pointLight
        position={[4, 4, 5]}
        intensity={20}
        color="#a78bfa"
      />

      <pointLight
        position={[-4, -2, 3]}
        intensity={15}
        color="#6366f1"
      />

      <pointLight
        position={[0, -4, -2]}
        intensity={10}
        color="#ffffff"
      />

      <HolographicSphere />

      {/* Mouse / touchpad / touchscreen control */}
      <OrbitControls
        enableRotate={true}
        enableZoom={true}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.08}
        rotateSpeed={0.7}
        zoomSpeed={0.7}
        minDistance={3.3}
        maxDistance={7}
      />
    </Canvas>
  );
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-7">
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

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={PERSONAL.resume}
            target="_blank"
            rel="noreferrer"
            className="glass px-5 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition"
          >
            Resume
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-violet-200 transition"
          >
            Let's Talk
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 glass rounded-3xl p-6">
          {links.map(([name, href]) => (
            <a
              key={name}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-lg text-white/80"
            >
              {name}
            </a>
          ))}

          <a
            href={PERSONAL.resume}
            target="_blank"
            rel="noreferrer"
            className="block mt-3 py-3 text-lg text-violet-300"
          >
            View Resume
          </a>
        </div>
      )}
    </nav>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 grid-background opacity-40" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Hero text */}
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
              <span className="text-gradient">ideas</span>
              <br />
              into reality.
            </h1>

            <p className="mt-8 text-white/55 max-w-xl text-base md:text-lg leading-relaxed">
              I&apos;m Karishma Mukilan, an Electrical and Electronics
              Engineering student exploring software, embedded systems,
              automation, IoT and modern digital experiences.
            </p>

            {/* Main buttons */}
            <div className="flex flex-wrap gap-4 mt-9">

              <a
                href="#work"
                className="bg-white text-black px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-violet-200 transition"
              >
                View Projects
                <ArrowUpRight size={18} />
              </a>

              <a
                href={PERSONAL.resume}
                target="_blank"
                rel="noreferrer"
                className="glass px-6 py-3 rounded-full font-medium hover:bg-white/10 transition"
              >
                View Resume
              </a>

            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-10">

              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition"
              >
                <Linkedin size={20} />
              </a>

              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="glass p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition"
              >
                <Github size={20} />
              </a>

              <a
                href={`mailto:${PERSONAL.email}`}
                aria-label="Email"
                className="glass p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition"
              >
                <Mail size={20} />
              </a>

            </div>
          </div>

          {/* 3D sphere */}
          <div className="h-[450px] md:h-[600px] relative">

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[280px] h-[280px] md:w-[430px] md:h-[430px] rounded-full bg-violet-500/10 blur-[100px]" />
            </div>

            <HeroScene />

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#work"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2 hover:text-white/60 transition"
      >
        <span className="text-xs uppercase tracking-widest">
          Drag to explore
        </span>

        <ArrowDown size={16} />
      </a>
    </section>
  );
}

/* =========================================================
   MARQUEE
   ========================================================= */

function Marquee() {
  const items = [
    "EEE",
    "WEB DEVELOPMENT",
    "EMBEDDED SYSTEMS",
    "IoT",
    "REACT",
    "AUTOMATION",
    "EV TECHNOLOGY",
  ];

  return (
    <div className="marquee border-y border-white/10 py-5 overflow-hidden">
      <div className="marquee-track flex gap-10 whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item}-${index}`}
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

/* =========================================================
   PROJECT CARD
   ========================================================= */

function ProjectCard({ project }) {
  return (
    <div className="project-card h-full">
      <div className="project-inner glass glass-hover rounded-3xl p-6 md:p-8 relative overflow-hidden h-full">

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

          <div className="flex gap-5 mt-8">

            <a
              href={project.link}
              className="flex items-center gap-2 text-sm hover:text-violet-300 transition"
            >
              View
              <ExternalLink size={15} />
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
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

/* =========================================================
   WORK
   ========================================================= */

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
            Things I&apos;ve built.
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

/* =========================================================
   ABOUT
   ========================================================= */

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
            I&apos;m an Electrical and Electronics Engineering student
            passionate about combining hardware and software to create
            useful technology.
          </p>

          <p>
            My interests include embedded systems, IoT, automation,
            web development, MERN stack development and automotive
            EV technology.
          </p>

          <p>
            I enjoy learning by building projects, experimenting with
            technology and turning ideas into working prototypes.
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

/* =========================================================
   SKILLS
   ========================================================= */

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

/* =========================================================
   CONTACT
   ========================================================= */

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const form = event.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const message = form.elements.message.value;

    const subject = encodeURIComponent(
      `Portfolio Contact from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href =
      `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`;
  };

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
                Let&apos;s build something
                <span className="text-gradient">
                  {" "}great.
                </span>
              </h2>

              <p className="text-white/45 mt-6 max-w-md">
                Have an internship opportunity, project idea or
                collaboration in mind? I&apos;d love to hear from you.
              </p>

              <div className="flex gap-4 mt-8">

                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="glass p-3 rounded-xl hover:bg-white/10 transition"
                >
                  <Linkedin size={20} />
                </a>

                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="glass p-3 rounded-xl hover:bg-white/10 transition"
                >
                  <Github size={20} />
                </a>

                <a
                  href={`mailto:${PERSONAL.email}`}
                  aria-label="Email"
                  className="glass p-3 rounded-xl hover:bg-white/10 transition"
                >
                  <Mail size={20} />
                </a>

              </div>

              <a
                href={PERSONAL.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-7 text-sm text-violet-300 hover:text-white transition"
              >
                View my resume
                <ArrowUpRight size={16} />
              </a>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full glass rounded-xl px-5 py-4 text-white placeholder:text-white/25 outline-none"
              />

              <input
                name="email"
                type="email"
                placeholder="Your email"
                required
                className="w-full glass rounded-xl px-5 py-4 text-white placeholder:text-white/25 outline-none"
              />

              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows="5"
                required
                className="w-full glass rounded-xl px-5 py-4 text-white placeholder:text-white/25 resize-none outline-none"
              />

              <button
                type="submit"
                className="w-full bg-white text-black rounded-xl py-4 font-semibold hover:bg-violet-200 transition flex items-center justify-center gap-2"
              >
                {submitted ? "Opening Email..." : "Send Message"}
                <ArrowUpRight size={18} />
              </button>

            </form>

          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-5 text-sm text-white/35">

        <p>
          © {new Date().getFullYear()} Karishma Mukilan
        </p>

        <div className="flex flex-wrap gap-6">

          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>

          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>

          <a
            href={PERSONAL.resume}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            Resume
          </a>

          <a
            href="#home"
            className="hover:text-white transition"
          >
            Back to top
          </a>

        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">

          <div className="w-14 h-14 rounded-full border border-violet-400/30 border-t-violet-400 animate-spin mx-auto" />

          <p className="mt-5 text-xs tracking-[0.3em] uppercase text-white/40">
            Initializing
          </p>

        </div>
      </div>
    );
  }

  return (
    <>
      <div className="noise" />

      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
