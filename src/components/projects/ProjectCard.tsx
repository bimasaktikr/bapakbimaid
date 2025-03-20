import React, { useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion, useInView, useAnimation } from "framer-motion";
import { Eye, Github, ExternalLink } from "lucide-react";

interface Technology {
  name: string;
  color?: string;
}

export interface ProjectCardProps {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  technologies?: Technology[];
  liveUrl?: string;
  repoUrl?: string;
  onClick?: () => void;
  index?: number;
}

const ProjectCard = ({
  id = "1",
  title = "Project Title",
  description = "A short description of the project showcasing the key features and technologies used.",
  image = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  technologies = [
    { name: "React", color: "bg-blue-100 text-blue-800" },
    { name: "TypeScript", color: "bg-indigo-100 text-indigo-800" },
    { name: "Tailwind", color: "bg-cyan-100 text-cyan-800" },
  ],
  liveUrl = "#",
  repoUrl = "#",
  onClick = () => {},
  index = 0,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.2,
      },
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 relative">
        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 z-0 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative overflow-hidden pt-[56.25%] z-10">
          <motion.div
            className="absolute inset-0"
            variants={imageVariants}
            initial="rest"
            whileHover="hover"
          >
            <img
              src={image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <motion.button
                onClick={onClick}
                className="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={16} />
                View Details
              </motion.button>
            </div>
          </motion.div>
        </div>

        <CardHeader className="p-4 pb-0 z-10">
          <motion.h3
            className="text-xl font-semibold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {title}
          </motion.h3>
        </CardHeader>

        <CardContent className="p-4 flex-grow z-10">
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {description}
          </motion.p>
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={badgeVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <Badge
                  className={`${tech.color || "bg-gray-100 text-gray-800"} transition-all duration-300 hover:scale-105`}
                  variant="outline"
                >
                  {tech.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between z-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 relative overflow-hidden group"
              onClick={onClick}
            >
              <span className="relative z-10 flex items-center gap-1">
                <Eye size={16} />
                Details
              </span>
              <motion.span
                className="absolute inset-0 bg-primary/10 dark:bg-primary/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>

          <div className="flex gap-2">
            {liveUrl && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-1"
                  asChild
                >
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} className="mr-1" />
                    Live
                  </a>
                </Button>
              </motion.div>
            )}

            {repoUrl && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-1"
                  asChild
                >
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={14} className="mr-1" />
                    Code
                  </a>
                </Button>
              </motion.div>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
