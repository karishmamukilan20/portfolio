import React, {
  Suspense,
  useEffect,
  useRef,
  useState
} from "react";

import {
  Canvas,
  useFrame,
  useThree
} from "@react-three/fiber";

import {
  Environment,
  Float,
  MeshDistortMaterial,
  RoundedBox,
  Sphere,
  TorusKnot
} from "@react-three/drei";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Send,
  Sparkles,
  X
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   DATA
========================================================= */

const projects = [
  {
    id: 1,
    number: "01",
    title: "RailSense",
    category: "Smart Infrastructure",
    description:
      "Acoustic and vibration based low-cost railway track health monitoring system.",
    tags: ["IoT", "Signal Processing", "EEE"],
    size: "large",
    accent: "violet",
    year: "2026"
  },
  {
    id: 2,
    number: "02",
    title: "Portfolio 3D",
    category: "Creative Development",
    description:
      "Immersive portfolio experience combining interaction design, motion and 3D web technology.",
    tags: ["React", "Three.js", "GSAP"],
    size: "small",
    accent: "cyan",
    year: "2026"
  },
  {
    id: 3,
    number: "03",
    title: "EV Systems",
    category: "Automotive Technology",
    description:
      "Exploring intelligent electrical systems, embedded control and future EV technologies.",
    tags: ["EV", "Embedded", "Automotive"],
    size: "small",
    accent: "pink",
    year: "2026"
  },
  {
    id: 4,
    number: "04",
    title: "Smart IoT",
    category: "Connected Systems",
    description:
      "Concept exploration for connected hardware products and real-time monitoring systems.",
    tags: ["IoT", "Hardware", "UX"],
    size: "large",
    accent: "orange",
    year: "2026"
  }
];

const skills = [
  "Electrical Engineering",
  "Embedded Systems",
  "IoT",
  "EV Technology",
  "C Programming",
  "React",
  "JavaScript",
  "UI / UX",
  "Git & GitHub",
  "Problem Solving",
  "Hardware Systems",
  "Creative Development"
];

const process = [
  {
    number: "01",
    title: "Discover",
    text: "Understand the problem, users, constraints and technical environment before building."
  },
  {
    number: "02",
    title: "Research",
    text: "Break complex problems into measurable requirements and investigate practical solutions."
  },
  {
    number: "03",
    title: "Prototype",
    text: "Turn ideas into working interfaces, system concepts and interactive prototypes."
  },
  {
    number: "04",
    title: "Build",
    text: "Develop clean, scalable solutions while continuously testing technical assumptions."
  },
  {
    number: "05",
    title: "Iterate",
    text: "Measure, learn and improve the solution based on testing, feedback and real constraints."
  }
];

const testimonials = [
  {
    quote:
      "A curious engineer who approaches problems with both technical thinking and creative energy.",
    name: "Peer Recommendation",
    role: "Engineering Student"
  },
  {
    quote:
      "Strong interest in learning new technologies and turning ideas into practical projects.",
    name: "Project Collaborator",
    role: "Student Developer"
  },
  {
    quote:
      "Combines an electrical engineering foundation with an impressive interest in modern digital experiences.",
    name: "Academic Peer",
    role: "Engineering Community"
  }
];

/* =========================================================
   THREE.JS COMPONENTS
========================================================= */

function CameraRig() {
  const { camera } = useThree();

  useFrame(({ pointer }) => {
    camera.position.x +=
      (pointer.x * 0.45 - camera.position.x) * 0.025;

    camera.position.y +=
      (pointer.y * 0.3 - camera.position.y) * 0.025;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

function HeroObject() {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.x =
      state.clock.elapsedTime * 0.12;

    ref.current.rotation.y =
      state.clock.elapsedTime * 0.2;
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.35}
      floatIntensity={1}
    >
      <TorusKnot
        ref={ref}
        args={[1.65, 0.46, 180, 32]}
      >
        <MeshDistortMaterial
          color="#8b5cf6"
          roughness={0.15}
          metalness={0.9}
          distort={0.18}
          speed={1.8}
        />
      </TorusKnot>

      <pointLight
        position={[2, 2, 3]}
        intensity={18}
        color="#a78bfa"
      />

      <pointLight
        position={[-3, -2, -2]}
        intensity={10}
        color="#22d3ee"
      />
    </Float>
  );
}

function HeroScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 45
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />

        <HeroObject />

        <Environment preset="city" />

        <CameraRig />
      </Suspense>
    </Canvas>
  );
}

function SkillObject({ index }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.x =
      state.clock.elapsedTime * (0.2 + index * 0.02);

    ref.current.rotation.y =
      state.clock.elapsedTime * (0.25 + index * 0.015);
  });

  return (
    <Float
      speed={1 + index * 0.08}
      floatIntensity={0.7}
      rotationIntensity={0.6}
    >
      <RoundedBox
        ref={ref}
        args={[1.15, 1.15, 1.15]}
        radius={0.12}
        smoothness={5}
      >
        <MeshDistortMaterial
          color={
            index % 3 === 0
              ? "#8b5cf6"
              : index % 3 === 1
                ? "#22d3ee"
                : "#ec4899"
          }
          metalness={0.85}
          roughness={0.2}
          distort={0.08}
          speed={1}
        />
      </RoundedBox>
    </Float>
  );
}

function SkillsScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 50
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true
      }}
    >
      <ambientLight intensity={0.4} />

      <pointLight
        position={[3, 3, 4]}
        intensity={12}
      />

      <pointLight
        position={[-3, -2, 2]}
        intensity={8}
        color="#22d3ee"
      />

      <SkillObject index={1} />
      <SkillObject index={2} />
      <SkillObject index={3} />

      <Environment preset="studio" />
    </Canvas>
  );
}

/* =========================================================
   CURSOR
========================================================= */

function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    const ringPosition = {
      x: mouse.x,
      y: mouse.y
    };

    const move = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      if (dot.current) {
        dot.current.style.left = `${mouse.x}px`;
        dot.current.style.top = `${mouse.y}px`;
      }
    };

    const render = () => {
      ringPosition.x +=
        (mouse.x - ringPosition.x) * 0.12;

      ringPosition.y +=
        (mouse.y - ringPosition.y) * 0.12;

      if (ring.current) {
        ring.current.style.left =
          `${ringPosition.x}px`;

        ring.current.style.top =
          `${ringPosition.y}px`;
      }

      requestAnimationFrame(render);
    };

    const enter = (event) => {
      if (
        event.target.closest(
          "a, button, input, textarea, .project-card"
        )
      ) {
        ring.current?.classList.add("active");
      }
    };

    const leave = () => {
      ring.current?.classList.remove("active");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);

    render();

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="cursor-dot"
      />

      <div
        ref={ring}
        className="cursor-ring"
      />
    </>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Work", "#work"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Contact", "#contact"]
  ];

  const navigate = (id) => {
    setOpen(false);

    document
      .querySelector(id)
      ?.scrollIntoView({
        behavior: "smooth"
      });
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
        <nav className="glass flex items-center justify-between rounded-full px-5 py-3">
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
            }
            className="font-display text-lg font-semibold tracking-tight"
          >
            K<span className="text-violet-400">.</span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {links.map(([name, id]) => (
              <button
                key={name}
                onClick={() => navigate(id)}
                className="text-sm text-white/60 transition hover:text-white"
              >
                {name}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("#contact")}
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-violet-200 md:block"
          >
            Let's talk
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Open navigation"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-3xl p-4 md:hidden">
            {links.map(([name, id]) => (
              <button
                key={name}
                onClick={() => navigate(id)}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section
      id="home"
      className="grid-background relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(124,58,237,0.13),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(34,211,238,0.06),transparent_25%)]" />

      <div className="absolute right-[-10%] top-[15%] h-[600px] w-[600px] opacity-80 md:h-[750px] md:w-[750px]">
        <HeroScene />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-36 md:px-8">
        <div className="max-w-5xl">
          <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/45">
            <span className="h-px w-10 bg-white/30" />
            Electrical & Electronics Engineering
          </div>

          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
            <span className="hero-word block">
              KARISHMA
            </span>

            <span className="hero-word text-gradient block">
              MUKILAN
            </span>
          </h1>

          <div className="mt-12 grid max-w-4xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-display text-xl font-medium text-white/85 md:text-2xl">
                EEE Student · Developer ·
                Technology Explorer
              </p>

              <p className="mt-4 max-w-xl text-base leading-7 text-white/45 md:text-lg">
                I build at the intersection of electrical
                engineering, embedded systems, IoT and
                immersive digital experiences.
              </p>
            </div>

            <a
              href="#work"
              className="group flex w-fit items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm text-white/75 transition hover:border-white/30 hover:bg-white/5"
            >
              Explore my work

              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/30">
          <span>Based in India</span>

          <span className="hidden md:block">
            Curious mind · Building future systems
          </span>

          <span>Scroll to explore ↓</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MARQUEE
========================================================= */

function Marquee() {
  const items = [
    "ENGINEERING",
    "CREATIVE DEVELOPMENT",
    "IOT",
    "EMBEDDED SYSTEMS",
    "EV TECHNOLOGY",
    "INTERACTION"
  ];

  return (
    <div className="marquee border-y border-white/10 py-5">
      <div className="marquee-track">
        {[...items, ...items].map(
          (item, index) => (
            <React.Fragment key={index}>
              <span className="mx-6 font-display text-sm font-semibold tracking-[0.2em] text-white/30 md:mx-10">
                {item}
              </span>

              <span className="text-violet-400/50">
                ✦
              </span>
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({ project }) {
  const card = useRef(null);

  const handleMove = (event) => {
    const rect =
      card.current.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const rotateY =
      ((x / rect.width) - 0.5) * 10;

    const rotateX =
      ((y / rect.height) - 0.5) * -10;

    card.current.style.setProperty(
      "--mx",
      `${(x / rect.width) * 100}%`
    );

    card.current.style.setProperty(
      "--my",
      `${(y / rect.height) * 100}%`
    );

    card.current
      .querySelector(".project-inner")
      .style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(8px)
      `;
  };

  const handleLeave = () => {
    card.current
      .querySelector(".project-inner")
      .style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <article
      ref={card}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`project-card ${
        project.size === "large"
          ? "md:col-span-2"
          : ""
      }`}
    >
      <div
        className={`project-inner glass glass-hover relative min-h-[430px] overflow-hidden rounded-[2rem] p-6 md:min-h-[500px] md:p-8 ${
          project.size === "large"
            ? "md:min-h-[580px]"
            : ""
        }`}
      >
        <div className="project-glow" />

        <div
          className={`absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl ${
            project.accent === "cyan"
              ? "bg-cyan-400/10"
              : project.accent === "pink"
                ? "bg-pink-500/10"
                : project.accent === "orange"
                  ? "bg-orange-400/10"
                  : "bg-violet-500/10"
          }`}
        />

        <div className="relative z-10 flex h-full min-h-[380px] flex-col justify-between md:min-h-[440px]">
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs text-white/35">
              {project.number}
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white/45">
              {project.year}
            </span>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-violet-300/70">
              <Sparkles size={13} />
              {project.category}
            </div>

            <h3 className="font-display text-4xl font-medium tracking-tight md:text-6xl">
              {project.title}
            </h3>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/45 md:text-base">
              {project.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-sm text-white/45">
              View case study
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition group-hover:bg-white group-hover:text-black">
              <ArrowUpRight size={17} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   WORK
========================================================= */

function Work() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-7xl px-5 py-32 md:px-8 md:py-44"
    >
      <div className="reveal mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-violet-300/70">
            Selected work
          </p>

          <h2 className="font-display text-5xl font-medium tracking-tight md:text-7xl">
            Things I've
            <br />
            <span className="text-white/35">
              been building.
            </span>
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-6 text-white/40">
          A selection of engineering, technology and
          creative development projects exploring
          problems worth solving.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
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
      className="relative border-y border-white/10 bg-white/[0.015]"
    >
      <div className="mx-auto max-w-7xl px-5 py-32 md:px-8 md:py-44">
        <div className="reveal grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-cyan-300/70">
              About me
            </p>

            <h2 className="font-display text-5xl font-medium tracking-tight md:text-7xl">
              Engineer
              <br />
              <span className="text-white/35">
                with curiosity.
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-2xl leading-[1.35] text-white/75 md:text-4xl">
              I'm an Electrical and Electronics
              Engineering student interested in
              building useful technology — from
              embedded systems and IoT hardware to
              modern digital experiences.
            </p>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/40">
              I enjoy understanding how things work,
              experimenting with new technologies and
              transforming ideas into practical projects.
              My current focus is growing deeper in
              embedded systems, automotive EV
              technologies and software development.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Problem Solver",
                "Continuous Learner",
                "Builder",
                "Technology Explorer"
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/55"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal mt-28">
          <div className="mb-10 flex items-center justify-between">
            <h3 className="font-display text-2xl">
              How I work
            </h3>

            <span className="text-xs uppercase tracking-[0.2em] text-white/25">
              Process
            </span>
          </div>

          <div className="grid border-l border-white/10 md:grid-cols-5 md:border-l-0">
            {process.map((item) => (
              <div
                key={item.number}
                className="group border-b border-white/10 p-6 md:border-l md:border-b-0 md:first:border-l"
              >
                <span className="font-mono text-xs text-violet-300/60">
                  {item.number}
                </span>

                <h4 className="mt-16 font-display text-2xl transition group-hover:text-violet-300">
                  {item.title}
                </h4>

                <p className="mt-4 text-sm leading-6 text-white/35">
                  {item.text}
                </p>
              </div>
            ))}
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
      className="relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 py-32 md:px-8 md:py-44">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.8fr]">
          <div className="reveal">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-pink-300/70">
              Skills & expertise
            </p>

            <h2 className="font-display text-5xl font-medium tracking-tight md:text-7xl">
              Learning.
              <br />
              <span className="text-white/30">
                Building.
              </span>
              <br />
              Evolving.
            </h2>

            <div className="mt-12 flex max-w-2xl flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-white/55 transition hover:border-violet-400/30 hover:bg-violet-400/5 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal relative h-[480px]">
            <div className="absolute inset-0 rounded-[3rem] border border-white/10 bg-white/[0.02]" />

            <div className="absolute inset-0">
              <SkillsScene />
            </div>

            <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-white/25">
                Interactive playground
              </span>

              <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STATS
========================================================= */

function Stats() {
  return (
    <section className="border-y border-white/10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {[
          ["02", "Year of engineering"],
          ["04+", "Project explorations"],
          ["∞", "Things to learn"],
          ["01", "Curious mind"]
        ].map(([number, label]) => (
          <div
            key={label}
            className="border-r border-white/10 px-5 py-12 last:border-r-0 md:px-8 md:py-16"
          >
            <div className="font-display text-4xl md:text-6xl">
              {number}
            </div>

            <div className="mt-3 text-xs uppercase tracking-[0.15em] text-white/30">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   TESTIMONIALS
========================================================= */

function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () =>
    setActive(
      (current) =>
        (current + 1) % testimonials.length
    );

  const previous = () =>
    setActive(
      (current) =>
        (current - 1 + testimonials.length) %
        testimonials.length
    );

  const testimonial = testimonials[active];

  return (
    <section
      id="testimonials"
      className="border-y border-white/10 bg-white/[0.015]"
    >
      <div className="mx-auto max-w-7xl px-5 py-32 md:px-8 md:py-44">
        <div className="reveal grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-violet-300/70">
              Recommendations
            </p>

            <h2 className="font-display text-5xl font-medium tracking-tight md:text-7xl">
              Words from
              <br />
              <span className="text-white/30">
                people.
              </span>
            </h2>
          </div>

          <div>
            <div className="min-h-[280px]">
              <div className="mb-10 text-5xl text-violet-300/50">
                “
              </div>

              <blockquote className="font-display text-3xl leading-[1.25] text-white/80 md:text-5xl">
                {testimonial.quote}
              </blockquote>

              <div className="mt-10">
                <p className="font-medium">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-sm text-white/35">
                  {testimonial.role}
                </p>
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <button
                onClick={previous}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition hover:bg-white hover:text-black"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition hover:bg-white hover:text-black"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setStatus("Please complete all fields.");
      return;
    }

    setStatus(
      "Thanks! Your message is ready to be sent."
    );

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${form.name}`
    );

    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`
    );

    window.location.href =
      `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-32 md:px-8 md:py-44">
        <div className="reveal mb-20">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-cyan-300/70">
            Contact
          </p>

          <h2 className="max-w-5xl font-display text-6xl font-medium leading-[0.9] tracking-[-0.05em] md:text-9xl">
            Let's build
            <br />
            <span className="text-gradient">
              something.
            </span>
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <p className="max-w-md text-lg leading-7 text-white/45">
              Have an internship opportunity, project
              idea, collaboration or simply want to
              connect?
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:your-email@example.com"
                className="flex items-center gap-4 text-white/60 transition hover:text-white"
              >
                <Mail size={18} />
                your-email@example.com
              </a>

              <a
                href="https://www.linkedin.com/in/karishma-mukilan-5151373b/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 text-white/60 transition hover:text-white"
              >
                <Linkedin size={18} />
                LinkedIn
                <ExternalLink size={13} />
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 text-white/60 transition hover:text-white"
              >
                <Github size={18} />
                GitHub
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          <form
            onSubmit={submit}
            className="reveal glass rounded-[2rem] p-6 md:p-9"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/30">
                  Name
                </span>

                <input
                  value={form.name}
                  onChange={(e) =>
                    update("name", e.target.value)
                  }
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-4 text-sm text-white placeholder:text-white/20"
                />
              </label>

              <label>
                <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/30">
                  Email
                </span>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    update("email", e.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-4 text-sm text-white placeholder:text-white/20"
                />
              </label>
            </div>

            <label className="mt-6 block">
              <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/30">
                Message
              </span>

              <textarea
                rows="7"
                value={form.message}
                onChange={(e) =>
                  update("message", e.target.value)
                }
                placeholder="Tell me about your idea..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.025] px-4 py-4 text-sm text-white placeholder:text-white/20"
              />
            </label>

            {status && (
              <div className="mt-5 flex items-center gap-2 text-sm text-violet-300">
                <Check size={15} />
                {status}
              </div>
            )}

            <button
              type="submit"
              className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-violet-200"
            >
              Send message

              <Send
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>
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
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-lg font-semibold">
            Karishma<span className="text-violet-400">.</span>
          </p>

          <p className="mt-1 text-xs text-white/30">
            Electrical & Electronics Engineering
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/karishma-mukilan-5151373b/"
            target="_blank"
            rel="noreferrer"
            className="text-white/35 transition hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-white/35 transition hover:text-white"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>

          <a
            href="mailto:your-email@example.com"
            className="text-white/35 transition hover:text-white"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="text-xs text-white/25">
          © {new Date().getFullYear()} Karishma Mukilan
        </p>
      </div>
    </footer>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const revealElements =
      document.querySelectorAll(".reveal");

    revealElements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 70
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true
          }
        }
      );
    });

    gsap.fromTo(
      ".hero-word",
      {
        y: 100,
        opacity: 0,
        filter: "blur(12px)"
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.25,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.25
      }
    );

    gsap.fromTo(
      "#home .max-w-4xl",
      {
        opacity: 0,
        y: 35
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
      }
    );

    const cards =
      document.querySelectorAll(".project-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 80
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        }
      );
    });

    ScrollTrigger.refresh();

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

      <CustomCursor />

      <Navbar />

      <main>
        <Hero />

        <Marquee />

        <Work />

        <About />

        <Stats />

        <Skills />

        <Testimonials />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
