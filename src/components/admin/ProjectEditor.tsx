import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: string;
  live_url?: string;
  repo_url?: string;
  created_at?: string;
}

const ProjectEditor = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    long_description: "",
    image: "",
    images: [],
    technologies: [],
    category: "",
    live_url: "",
    repo_url: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async () => {
    try {
      // Validate required fields
      if (
        !newProject.title ||
        !newProject.description ||
        !newProject.image ||
        !newProject.category
      ) {
        setError("Please fill in all required fields");
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            title: newProject.title,
            description: newProject.description,
            long_description: newProject.long_description,
            image: newProject.image,
            images: newProject.images || [newProject.image],
            technologies: newProject.technologies || [],
            category: newProject.category,
            live_url: newProject.live_url,
            repo_url: newProject.repo_url,
          },
        ])
        .select();

      if (error) throw error;

      setProjects([...(data || []), ...projects]);
      setIsAdding(false);
      setNewProject({
        title: "",
        description: "",
        long_description: "",
        image: "",
        images: [],
        technologies: [],
        category: "",
        live_url: "",
        repo_url: "",
      });
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding project:", err);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;

    try {
      const { data, error } = await supabase
        .from("projects")
        .update({
          title: editingProject.title,
          description: editingProject.description,
          long_description: editingProject.long_description,
          image: editingProject.image,
          images: editingProject.images,
          technologies: editingProject.technologies,
          category: editingProject.category,
          live_url: editingProject.live_url,
          repo_url: editingProject.repo_url,
        })
        .eq("id", editingProject.id)
        .select();

      if (error) throw error;

      setProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...editingProject } : p,
        ),
      );
      setEditingProject(null);
    } catch (err: any) {
      setError(err.message);
      console.error("Error updating project:", err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;

      setProjects(projects.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting project:", err);
    }
  };

  const handleTechnologiesChange = (
    value: string,
    project: Project | Partial<Project>,
  ) => {
    const techArray = value.split(",").map((tech) => tech.trim());

    if ("id" in project && project.id) {
      setEditingProject({
        ...editingProject!,
        technologies: techArray,
      });
    } else {
      setNewProject({
        ...newProject,
        technologies: techArray,
      });
    }
  };

  const handleImagesChange = (
    value: string,
    project: Project | Partial<Project>,
  ) => {
    const imagesArray = value.split(",").map((img) => img.trim());

    if ("id" in project && project.id) {
      setEditingProject({
        ...editingProject!,
        images: imagesArray,
      });
    } else {
      setNewProject({
        ...newProject,
        images: imagesArray,
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md mb-4">
          {error}
          <Button
            variant="ghost"
            size="sm"
            className="ml-2 h-auto p-0"
            onClick={() => setError(null)}
          >
            <X size={14} />
          </Button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          Your Projects ({projects.length})
        </h3>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          variant="outline"
          className="flex items-center gap-2"
        >
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? "Cancel" : "Add Project"}
        </Button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="border border-dashed">
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title *
                      </label>
                      <Input
                        value={newProject.title}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            title: e.target.value,
                          })
                        }
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Category *
                      </label>
                      <Input
                        value={newProject.category}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            category: e.target.value,
                          })
                        }
                        placeholder="Web Development, Mobile App, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Short Description *
                    </label>
                    <Input
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                      placeholder="Brief description of the project"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Long Description
                    </label>
                    <Textarea
                      value={newProject.long_description || ""}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          long_description: e.target.value,
                        })
                      }
                      placeholder="Detailed description of the project"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Main Image URL *
                      </label>
                      <Input
                        value={newProject.image}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            image: e.target.value,
                          })
                        }
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Additional Images
                      </label>
                      <Input
                        value={newProject.images?.join(", ") || ""}
                        onChange={(e) =>
                          handleImagesChange(e.target.value, newProject)
                        }
                        placeholder="URL1, URL2, URL3"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Live URL
                      </label>
                      <Input
                        value={newProject.live_url || ""}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            live_url: e.target.value,
                          })
                        }
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Repository URL
                      </label>
                      <Input
                        value={newProject.repo_url || ""}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            repo_url: e.target.value,
                          })
                        }
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Technologies
                    </label>
                    <Input
                      value={newProject.technologies?.join(", ") || ""}
                      onChange={(e) =>
                        handleTechnologiesChange(e.target.value, newProject)
                      }
                      placeholder="React, TypeScript, Tailwind CSS"
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAdding(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddProject}>Add Project</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No projects yet. Add your first project to get started.
          </div>
        ) : (
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    {editingProject?.id === project.id ? (
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Title
                            </label>
                            <Input
                              value={editingProject.title}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Category
                            </label>
                            <Input
                              value={editingProject.category}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  category: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Short Description
                          </label>
                          <Input
                            value={editingProject.description}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Long Description
                          </label>
                          <Textarea
                            value={editingProject.long_description || ""}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                long_description: e.target.value,
                              })
                            }
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Main Image URL
                            </label>
                            <Input
                              value={editingProject.image}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  image: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Additional Images
                            </label>
                            <Input
                              value={editingProject.images?.join(", ") || ""}
                              onChange={(e) =>
                                handleImagesChange(
                                  e.target.value,
                                  editingProject,
                                )
                              }
                              placeholder="URL1, URL2, URL3"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Live URL
                            </label>
                            <Input
                              value={editingProject.live_url || ""}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  live_url: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Repository URL
                            </label>
                            <Input
                              value={editingProject.repo_url || ""}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  repo_url: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Technologies
                          </label>
                          <Input
                            value={
                              editingProject.technologies?.join(", ") || ""
                            }
                            onChange={(e) =>
                              handleTechnologiesChange(
                                e.target.value,
                                editingProject,
                              )
                            }
                          />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setEditingProject(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleUpdateProject}
                            className="flex items-center gap-2"
                          >
                            <Save size={16} />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-48 h-48 bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-lg">
                                {project.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {project.category}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingProject(project)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProject(project.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{project.description}</p>
                          <div className="mt-4 flex flex-wrap gap-1">
                            {project.technologies?.map((tech, i) => (
                              <span
                                key={i}
                                className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ProjectEditor;
