import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Twitter } from "lucide-react";

interface HeroSectionProps {
  name?: string;
  tagline?: string;
  ctaText?: string;
  profileImage?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  onCtaClick?: () => void;
}

const HeroSection = ({
  name = "Bima Sakti Krisdianto",
  tagline = "Full Stack Developer, Data Engineer",
  ctaText = "View My Work",
  profileImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  socialLinks = {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Floating animation for the profile image
  useEffect(() => {
    controls.start({
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
  }, [controls]);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 * i,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  // Social links animation variants
  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.2 + i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-400 rounded-full dark:bg-blue-600 opacity-10"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <motion.div
        className="container z-10 flex flex-col items-center justify-between gap-12 px-4 mx-auto md:flex-row"
        style={{ opacity, y, scale }}
      >
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl dark:text-white"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
          >
            Hello, I'm{" "}
            <motion.span
              className="inline-block text-blue-600 dark:text-blue-400"
              animate={{
                color: ["#3b82f6", "#8b5cf6", "#3b82f6"],
                textShadow: [
                  "0 0 5px rgba(59, 130, 246, 0.3)",
                  "0 0 15px rgba(139, 92, 246, 0.5)",
                  "0 0 5px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {name}
            </motion.span>
          </motion.h1>

          <motion.p
            className="mb-8 text-xl text-gray-700 md:text-2xl dark:text-gray-300"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
          >
            {tagline}
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
          >
            <Button
              onClick={onCtaClick}
              className="relative px-8 py-6 overflow-hidden text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 group"
            >
              <span className="relative z-10">{ctaText}</span>
              <motion.span
                className="absolute inset-0 opacity-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Button>

            <Button
              variant="outline"
              className="relative px-8 py-6 overflow-hidden text-lg text-blue-600 border-blue-600 rounded-lg hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800 group"
            >
              <span className="relative z-10 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </span>
              <motion.span
                className="absolute inset-0 opacity-0 bg-blue-50 dark:bg-gray-800 group-hover:opacity-100"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>

          {/* Social links */}
          <div className="flex justify-center gap-4 mt-8 md:justify-start">
            {[
              socialLinks.github,
              socialLinks.linkedin,
              socialLinks.twitter,
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-3 overflow-hidden text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
                initial="hidden"
                animate="visible"
                custom={i}
                variants={socialVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {i === 0 && <Github size={24} />}
                {i === 1 && <Linkedin size={24} />}
                {i === 2 && <Twitter size={24} />}
                <motion.span
                  className="absolute inset-0 opacity-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900"
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Profile image */}
        <div className="flex justify-center flex-1 md:justify-end">
          <motion.div className="relative" animate={controls}>
            {/* Animated decorative elements */}
            <motion.div
              className="absolute rounded-full -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Rotating circles */}
            <motion.div
              className="absolute border-2 border-blue-200 rounded-full -inset-12 dark:border-blue-800 opacity-20"
              style={{ borderRadius: "50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute border-2 border-purple-200 rounded-full -inset-8 dark:border-purple-800 opacity-20"
              style={{ borderRadius: "50%" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <motion.img
              src={profileImage}
              alt={name}
              className="relative object-cover w-64 h-64 border-4 border-white rounded-full shadow-xl md:w-80 md:h-80 dark:border-gray-800"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute transform -translate-x-1/2 cursor-pointer bottom-8 left-1/2"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          delay: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
        onClick={() => {
          const projectsSection = document.getElementById("projects");
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <ArrowDown className="w-8 h-8 text-gray-600 dark:text-gray-400" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
