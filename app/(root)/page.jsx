// Copyright (C) 2025 Andra (SakamotoMrX)
"use client";
import { forwardRef, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import Button from "@/components/Button";
import SetupImage from "@/public/image/setup.jpg";
import ProjectAll from "@/public/image/projects-showcase-home.png";
import Hr from "@/components/Hr";
import TerminalHero from "@/components/TerminalHero";
import SetupGrid from "@/components/setup/SetupGrid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faFacebook, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

// Import data
import { neofetchData } from "@/data/neofetch";
import Projects from "@/json/data.json";

const Section = forwardRef(({ id, children }, ref) => (
  <section id={id} ref={ref} className="section">{children}</section>
));
Section.displayName = "Section";

const socialLinks = [
  { icon: faEnvelope, href: "mailto:andrahijati@gmail.com?subject=Hello%20Andra", label: "Send email" },
  { icon: faGithub, href: "https://github.com/SakamotoMrX", label: "GitHub profile" },
  { icon: faInstagram, href: "https://www.instagram.com/andrahijati", label: "Instagram profile" },
  { icon: faFacebook, href: "https://web.facebook.com/andra.nugroho.921", label: "Facebook profile" },
  { icon: faDiscord, href: "https://discord.com/users/legacyy5030", label: "Discord profile" },
];

/* Section entrance — children stagger */
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

/* Contact icons — softer spring, staggered */
const iconsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const iconFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

/* Projects screenshot — wipe reveal */
const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const MyPage = () => {
  const prefersReducedMotion = useReducedMotion();

  /* Scroll targets for parallax */
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);

  const aboutScroll = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutY = useTransform(aboutScroll.scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["8%", "-8%"]);

  const projectsScroll = useScroll({ target: projectsRef, offset: ["start end", "end start"] });
  const projectsY = useTransform(projectsScroll.scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["8%", "-8%"]);

  // Prepare repos data for TerminalHero
  const repos = Projects.Projects.filter(p => p.show === true)
    .slice(0, 3)
    .map(p => ({
      name: p.slug,
      desc: p.desc[0],
      url: p.code || "#",
      lang: p.tech[0],
      stars: undefined // data.json has no stars field
    }));

  return (
    <div>
      {/* Section 1: Hero with Terminal */}
      <Section id="home">
        <TerminalHero repos={repos} os={neofetchData} wm={neofetchData.wm} editor={neofetchData.editor} />
      </Section>

      {/* Section 2: About Overview */}
      <Section id="about" ref={aboutRef}>
        <motion.div
          className="mx-auto w-[88%] md:w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-10 overflow-hidden relative z-20 items-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
          <div className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start">
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-8xl font-bold">
              About Me
            </motion.h1>
            <Hr />
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] mb-5 max-w-2xl text-white/55">
              Linux SysAdmin, Containerization, and hardware tinkering (Arduino). Check out my Fastfetch specs.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button variation="primary" href="/about">About Me</Button>
            </motion.div>
          </div>
          <div className="col-span-1 flex justify-center items-center mt-4 md:mt-0">
            <motion.div
              className="relative glass-static rounded-2xl overflow-hidden h-[300px] sm:h-[340px] md:h-[520px] w-full max-w-[400px] md:max-w-[500px] shadow-2xl"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.2 }}>
              <motion.div style={{ y: aboutY }} className="absolute inset-x-0 -inset-y-[10%]">
                <div className="w-full h-full bg-gradient-to-br from-teal-500/10 to-blue-500/10" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* Section 3: Setup */}
      <Section id="setup">
        <SetupGrid />
      </Section>

      {/* Section 4: Projects Preview */}
      <Section id="projects" ref={projectsRef}>
        <motion.div
          className="mx-auto w-[88%] md:w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 p-6 md:p-10 overflow-hidden relative z-20 items-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
          <div className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start">
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-8xl font-bold my-2 md:my-5">
              My Projects
            </motion.h1>
            <Hr />
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] mb-5 max-w-2xl text-white/55">
              Server automation tools, Linux scripts, and IoT experiments.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button variation="primary" href="/projects">Explore Projects</Button>
            </motion.div>
          </div>
          <div className="col-span-2 flex justify-center items-center w-full mt-4 md:mt-0">
            <motion.div
              variants={clipReveal}
              className="relative aspect-[16/9] w-full max-w-[1600px] glass-static rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
              <motion.div style={{ y: projectsY }} className="absolute inset-x-0 -inset-y-[10%]">
                <div className="w-full h-full bg-gradient-to-br from-teal-500/10 to-blue-500/10" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* Section 5: Contact */}
      <Section id="contact">
        <motion.div
          className="mx-auto w-[88%] md:w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 p-6 md:p-10 overflow-hidden relative z-20 items-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
          <div className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start">
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-8xl font-bold my-2 md:my-5">
              Get In Touch
            </motion.h1>
            <Hr />
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] md:mb-5 max-w-2xl text-white/55">
              Feel free to connect or collaborate on Linux SysAdmin & DevOps projects.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] mb-5 text-accent">
              <a href="mailto:andrahijati@gmail.com?subject=Hello%20Andra" className="group relative inline-block break-all">
                andrahijati@gmail.com
                <motion.span
                  className="absolute left-0 -bottom-1 h-[2px] w-full origin-left bg-white/60 group-hover:bg-white transition-colors"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                />
              </a>
            </motion.p>
            {/* Social Icons — staggered */}
            <motion.div
              variants={iconsContainer}
              className="flex justify-center items-center space-x-3 md:space-x-4 mb-5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  variants={iconFade}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="glass-icon flex justify-center items-center w-12 h-12 md:w-14 md:h-14 text-white/70 hover:text-teal-400">
                  <FontAwesomeIcon icon={social.icon} className="text-xl md:text-2xl" />
                </motion.a>
              ))}
            </motion.div>
          </div>
          <div className="col-span-2 flex justify-center items-center w-full mt-4 md:mt-0">
            <motion.div
              variants={fadeUp}
              className="relative aspect-[16/9] w-full max-w-[760px] glass-static rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-teal-500/10 to-blue-500/10" />
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default MyPage;
