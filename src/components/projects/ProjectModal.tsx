import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ExternalLink, Github, X } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  project?: {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    images: string[];
    technologies: string[];
    liveUrl?: string;
    repoUrl?: string;
  };
}

const ProjectModal = ({
  isOpen = true,
  onClose = () => {},
  project = {
    id: "1",
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and Tailwind CSS",
    longDescription:
      "This is a fully responsive portfolio website that showcases my projects and skills. It features smooth animations, a dark/light mode toggle, and a contact form. The website is built with React, TypeScript, and Tailwind CSS.",
    images: [
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&q=80",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/example/portfolio",
  },
}: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-white dark:bg-gray-900 p-0 overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Image Gallery */}
        <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100 dark:bg-gray-800">
          <motion.img
            key={currentImageIndex}
            src={project.images[currentImageIndex]}
            alt={`${project.title} screenshot ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-gray-400"}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {project.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full"
              >
                <span className="sr-only">Previous</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full"
              >
                <span className="sr-only">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </>
          )}
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-lg mt-2">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">About this project</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {project.longDescription}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-start">
            {project.liveUrl && (
              <Button asChild className="w-full sm:w-auto">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Site
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Repository
                </a>
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
