import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../projects/ProjectCard";
import ProjectModal from "../projects/ProjectModal";
import { Button } from "../ui/button";

interface Technology {
  name: string;
  color: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  technologies: Technology[];
  category: string;
  liveUrl: string;
  repoUrl: string;
}

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}

const ProjectsSection = ({
  title = "My Projects",
  subtitle = "Check out some of my recent work",
  projects = [
    {
      id: "1",
      title: "Portfolio Website",
      description:
        "A modern portfolio website built with React and Tailwind CSS",
      longDescription:
        "A personal portfolio website showcasing my projects, skills, and experience. Built with React, TypeScript, and Tailwind CSS. Features include dark mode, animations, and responsive design.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=800&q=80",
        "https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?w=800&q=80",
      ],
      technologies: [
        { name: "React", color: "bg-blue-100 text-blue-800" },
        { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
        { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-800" },
      ],
      category: "Web Development",
      liveUrl: "https://example.com/portfolio",
      repoUrl: "https://github.com/example/portfolio",
    },
    {
      id: "2",
      title: "E-commerce Dashboard",
      description: "An admin dashboard for managing an e-commerce platform",
      longDescription:
        "An admin dashboard for managing products, orders, and customers of an e-commerce platform. Built with React, Redux, and Material UI. Features include data visualization, user management, and order tracking.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      ],
      technologies: [
        { name: "React", color: "bg-blue-100 text-blue-800" },
        { name: "Redux", color: "bg-purple-100 text-purple-800" },
        { name: "Material UI", color: "bg-blue-100 text-blue-800" },
        { name: "Chart.js", color: "bg-green-100 text-green-800" },
      ],
      category: "Web Development",
      liveUrl: "https://example.com/dashboard",
      repoUrl: "https://github.com/example/dashboard",
    },
    {
      id: "3",
      title: "Mobile Fitness App",
      description:
        "A cross-platform fitness tracking application built with React Native",
      longDescription:
        "A mobile application that helps users track their workouts, set fitness goals, and monitor their progress. Features include workout plans, progress charts, and social sharing capabilities.",
      image:
        "https://images.unsplash.com/photo-1510440777527-38815cfc6cc2?w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1510440777527-38815cfc6cc2?w=800&q=80",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      ],
      technologies: [
        { name: "React Native", color: "bg-blue-100 text-blue-800" },
        { name: "Expo", color: "bg-gray-100 text-gray-800" },
        { name: "Redux", color: "bg-purple-100 text-purple-800" },
        { name: "Firebase", color: "bg-yellow-100 text-yellow-800" },
      ],
      category: "Mobile Development",
      liveUrl: "https://example.com/fitness-app",
      repoUrl: "https://github.com/example/fitness-app",
    },
    {
      id: "4",
      title: "AI Image Generator",
      description:
        "A web application that generates images using AI based on text prompts",
      longDescription:
        "This project uses OpenAI's DALL-E API to generate images based on user text prompts. Users can create, save, and share their generated images. The application is built with Next.js and MongoDB.",
      image:
        "https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=800&q=80",
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
      ],
      technologies: [
        { name: "Next.js", color: "bg-black text-white" },
        { name: "OpenAI API", color: "bg-green-100 text-green-800" },
        { name: "MongoDB", color: "bg-green-100 text-green-800" },
        { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-800" },
      ],
      category: "AI & Machine Learning",
      liveUrl: "https://example.com/ai-generator",
      repoUrl: "https://github.com/example/ai-generator",
    },
    {
      id: "5",
      title: "Blockchain Explorer",
      description:
        "A web application for exploring blockchain transactions and data",
      longDescription:
        "A blockchain explorer that allows users to search for transactions, view block details, and monitor wallet addresses across multiple cryptocurrencies. Built with React, Web3.js, and Ethers.js.",
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
      ],
      technologies: [
        { name: "React", color: "bg-blue-100 text-blue-800" },
        { name: "Web3.js", color: "bg-orange-100 text-orange-800" },
        { name: "Ethers.js", color: "bg-purple-100 text-purple-800" },
        { name: "GraphQL", color: "bg-pink-100 text-pink-800" },
      ],
      category: "Blockchain",
      liveUrl: "https://example.com/blockchain-explorer",
      repoUrl: "https://github.com/example/blockchain-explorer",
    },
    {
      id: "6",
      title: "Weather Dashboard",
      description: "A weather application with interactive maps and forecasts",
      longDescription:
        "A weather dashboard that provides current conditions, forecasts, and historical weather data with interactive maps. Features include location search, saved locations, and weather alerts. Built with React, OpenWeatherMap API, and Mapbox.",
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
        "https://images.unsplash.com/photo-1530908295418-a12e326966ba?w=800&q=80",
        "https://images.unsplash.com/photo-1530908295418-a12e326966ba?w=800&q=80",
      ],
      technologies: [
        { name: "React", color: "bg-blue-100 text-blue-800" },
        { name: "OpenWeatherMap API", color: "bg-orange-100 text-orange-800" },
        { name: "Mapbox", color: "bg-blue-100 text-blue-800" },
        { name: "Chart.js", color: "bg-green-100 text-green-800" },
      ],
      category: "Web Development",
      liveUrl: "https://example.com/weather",
      repoUrl: "https://github.com/example/weather",
    },
  ],
}: ProjectsSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories from projects
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                liveUrl={project.liveUrl}
                repoUrl={project.repoUrl}
                onClick={() => openProjectModal(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Show more projects button (optional) */}
        {filteredProjects.length > 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View More Projects
            </Button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={closeProjectModal}
          project={{
            id: selectedProject.id,
            title: selectedProject.title,
            description: selectedProject.description,
            longDescription: selectedProject.longDescription,
            images: selectedProject.images,
            technologies: selectedProject.technologies.map((tech) => tech.name),
            liveUrl: selectedProject.liveUrl,
            repoUrl: selectedProject.repoUrl,
          }}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
