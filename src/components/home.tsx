import React from "react";
import { motion } from "framer-motion";
import Navbar from "./layout/Navbar";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import AdminLink from "./AdminLink";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const Home = () => {
  const { profile, skills, journey, projects, loading } = usePortfolioData();

  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Admin Link */}
      <AdminLink />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <HeroSection
            name={profile?.name || "Jane Doe"}
            tagline={
              profile?.tagline || "Full Stack Developer & UI/UX Designer"
            }
            ctaText="View My Work"
            profileImage={
              profile?.profile_image ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
            }
            socialLinks={
              profile?.social_links || {
                github: "https://github.com",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com",
              }
            }
            onCtaClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </section>

        {/* Projects Section */}
        <ProjectsSection
          title="My Projects"
          subtitle="A showcase of my recent work and personal projects"
          projects={projects?.map((project) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            longDescription: project.long_description,
            image: project.image,
            images: project.images || [project.image],
            technologies: project.technologies.map((tech) => ({
              name: tech,
              color: "bg-blue-100 text-blue-800",
            })),
            category: project.category,
            liveUrl: project.live_url,
            repoUrl: project.repo_url,
          }))}
        />

        {/* About Section */}
        <AboutSection
          title="About Me"
          subtitle="My Journey & Skills"
          description={
            profile?.description ||
            "I'm a passionate developer with a keen eye for design and a commitment to creating intuitive, user-friendly applications. With several years of experience in web development, I've honed my skills across various technologies and frameworks."
          }
          journey={
            journey?.length > 0
              ? journey.map((item) => item.description)
              : [
                  "Started my journey as a self-taught developer in 2018",
                  "Graduated with a Computer Science degree in 2020",
                  "Worked as a frontend developer at Tech Solutions Inc. for 2 years",
                  "Led a team of developers at Innovation Labs from 2022-2023",
                  "Currently working as a freelance full-stack developer",
                ]
          }
          skills={
            skills?.length > 0
              ? skills.map((skill) => ({
                  name: skill.name,
                  level: skill.level,
                }))
              : [
                  { name: "React", level: 90 },
                  { name: "TypeScript", level: 85 },
                  { name: "Node.js", level: 80 },
                  { name: "UI/UX Design", level: 75 },
                  { name: "Next.js", level: 85 },
                  { name: "Tailwind CSS", level: 90 },
                ]
          }
          resumeUrl={profile?.resume_url || "/resume.pdf"}
        />

        {/* Contact Section */}
        <ContactSection id="contact" />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} {profile?.name || "Jane Doe"}. All
            rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
