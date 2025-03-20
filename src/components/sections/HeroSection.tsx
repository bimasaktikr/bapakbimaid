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
  name = "Jane Doe",
  tagline = "Full Stack Developer & UI/UX Designer",
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
      className="relative h-screen w-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 opacity-50"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400 dark:bg-blue-600 opacity-10"
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
        className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between gap-12"
        style={{ opacity, y, scale }}
      >
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
          >
            Hello, I'm{" "}
            <motion.span
              className="text-blue-600 dark:text-blue-400 inline-block"
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
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
          >
            {tagline}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
          >
            <Button
              onClick={onCtaClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">{ctaText}</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Button>

            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800 px-8 py-6 rounded-lg text-lg relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </span>
              <motion.span
                className="absolute inset-0 bg-blue-50 dark:bg-gray-800 opacity-0 group-hover:opacity-100"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>

          {/* Social links */}
          <div className="flex gap-4 mt-8 justify-center md:justify-start">
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
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors relative overflow-hidden"
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
                  className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 opacity-0"
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Profile image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <motion.div className="relative" animate={controls}>
            {/* Animated decorative elements */}
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-xl"
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
              className="absolute -inset-12 rounded-full border-2 border-blue-200 dark:border-blue-800 opacity-20"
              style={{ borderRadius: "50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute -inset-8 rounded-full border-2 border-purple-200 dark:border-purple-800 opacity-20"
              style={{ borderRadius: "50%" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <motion.img
              src={profileImage}
              alt={name}
              className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
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
        <ArrowDown className="h-8 w-8 text-gray-600 dark:text-gray-400" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
