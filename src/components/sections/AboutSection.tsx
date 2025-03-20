import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
}

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  journey?: string[];
  skills?: Skill[];
  resumeUrl?: string;
}

const AboutSection = ({
  title = "About Me",
  subtitle = "My Journey & Skills",
  description = "I'm a passionate developer with a keen eye for design and a commitment to creating intuitive, user-friendly applications. With several years of experience in web development, I've honed my skills across various technologies and frameworks.",
  journey = [
    "Started my journey as a self-taught developer in 2018",
    "Graduated with a Computer Science degree in 2020",
    "Worked as a frontend developer at Tech Solutions Inc. for 2 years",
    "Led a team of developers at Innovation Labs from 2022-2023",
    "Currently working as a freelance full-stack developer",
  ],
  skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "UI/UX Design", level: 75 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 90 },
  ],
  resumeUrl = "/resume.pdf",
}: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Personal Journey */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                  My Journey
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-8">
                  {description}
                </p>

                <div className="space-y-4">
                  {journey.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button asChild className="font-medium">
                    <a href={resumeUrl} download>
                      Download Resume
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
                  My Skills
                </h3>

                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    "JavaScript",
                    "HTML/CSS",
                    "Git",
                    "Figma",
                    "MongoDB",
                    "AWS",
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 text-center text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
