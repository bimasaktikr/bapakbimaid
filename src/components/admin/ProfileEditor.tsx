import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Plus, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";

interface Profile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  profile_image: string;
  resume_url: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface Skill {
  id: string;
  name: string;
  level: number;
  profile_id: string;
}

interface Journey {
  id: string;
  description: string;
  profile_id: string;
  order: number;
}

const ProfileEditor = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [journey, setJourney] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState({ name: "", level: 50 });
  const [newJourneyItem, setNewJourneyItem] = useState({ description: "" });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .single();

      if (profileError && profileError.code !== "PGRST116") throw profileError;

      // Fetch skills
      const { data: skillsData, error: skillsError } = await supabase
        .from("skills")
        .select("*")
        .order("id");

      if (skillsError) throw skillsError;

      // Fetch journey
      const { data: journeyData, error: journeyError } = await supabase
        .from("journey")
        .select("*")
        .order("order");

      if (journeyError) throw journeyError;

      setProfile(
        profileData || {
          id: "",
          name: "Jane Doe",
          tagline: "Full Stack Developer & UI/UX Designer",
          description:
            "I'm a passionate developer with a keen eye for design and a commitment to creating intuitive, user-friendly applications.",
          profile_image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
          resume_url: "/resume.pdf",
          social_links: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
          },
        },
      );
      setSkills(skillsData || []);
      setJourney(journeyData || []);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching profile data:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!profile) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      let profileId = profile.id;

      // If profile doesn't exist, create it
      if (!profileId) {
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert([
            {
              name: profile.name,
              tagline: profile.tagline,
              description: profile.description,
              profile_image: profile.profile_image,
              resume_url: profile.resume_url,
              social_links: profile.social_links,
            },
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        profileId = newProfile.id;
        setProfile({ ...profile, id: profileId });
      } else {
        // Update existing profile
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            name: profile.name,
            tagline: profile.tagline,
            description: profile.description,
            profile_image: profile.profile_image,
            resume_url: profile.resume_url,
            social_links: profile.social_links,
          })
          .eq("id", profileId);

        if (updateError) throw updateError;
      }

      setSuccess("Profile saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
      console.error("Error saving profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const addSkill = async () => {
    if (!profile?.id || !newSkill.name) {
      setError("Please save your profile first and provide a skill name");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("skills")
        .insert([
          {
            name: newSkill.name,
            level: newSkill.level,
            profile_id: profile.id,
          },
        ])
        .select();

      if (error) throw error;

      setSkills([...skills, ...data]);
      setNewSkill({ name: "", level: 50 });
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding skill:", err);
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const { error } = await supabase.from("skills").delete().eq("id", id);

      if (error) throw error;

      setSkills(skills.filter((skill) => skill.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting skill:", err);
    }
  };

  const addJourneyItem = async () => {
    if (!profile?.id || !newJourneyItem.description) {
      setError(
        "Please save your profile first and provide a journey description",
      );
      return;
    }

    try {
      const { data, error } = await supabase
        .from("journey")
        .insert([
          {
            description: newJourneyItem.description,
            profile_id: profile.id,
            order: journey.length + 1,
          },
        ])
        .select();

      if (error) throw error;

      setJourney([...journey, ...data]);
      setNewJourneyItem({ description: "" });
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding journey item:", err);
    }
  };

  const deleteJourneyItem = async (id: string) => {
    try {
      const { error } = await supabase.from("journey").delete().eq("id", id);

      if (error) throw error;

      setJourney(journey.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting journey item:", err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading profile data...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md mb-4 flex justify-between items-center">
          <span>{error}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0"
            onClick={() => setError(null)}
          >
            <X size={14} />
          </Button>
        </div>
      )}

      {success && (
        <div className="p-3 text-sm bg-green-50 border border-green-200 text-green-600 rounded-md mb-4 flex justify-between items-center">
          <span>{success}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0"
            onClick={() => setSuccess(null)}
          >
            <X size={14} />
          </Button>
        </div>
      )}

      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="journey">Journey</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      value={profile?.name || ""}
                      onChange={(e) =>
                        setProfile({ ...profile!, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Profile Image URL
                    </label>
                    <Input
                      value={profile?.profile_image || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile!,
                          profile_image: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tagline
                  </label>
                  <Input
                    value={profile?.tagline || ""}
                    onChange={(e) =>
                      setProfile({ ...profile!, tagline: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    About Description
                  </label>
                  <Textarea
                    value={profile?.description || ""}
                    onChange={(e) =>
                      setProfile({ ...profile!, description: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Resume URL
                  </label>
                  <Input
                    value={profile?.resume_url || ""}
                    onChange={(e) =>
                      setProfile({ ...profile!, resume_url: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      GitHub URL
                    </label>
                    <Input
                      value={profile?.social_links?.github || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile!,
                          social_links: {
                            ...profile!.social_links,
                            github: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      LinkedIn URL
                    </label>
                    <Input
                      value={profile?.social_links?.linkedin || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile!,
                          social_links: {
                            ...profile!.social_links,
                            linkedin: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Twitter URL
                    </label>
                    <Input
                      value={profile?.social_links?.twitter || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile!,
                          social_links: {
                            ...profile!.social_links,
                            twitter: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Skills</h3>
                </div>

                <div className="space-y-4">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between gap-4 p-3 border rounded-md"
                    >
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSkill(skill.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </motion.div>
                  ))}

                  <div className="flex items-end gap-4 p-4 border border-dashed rounded-md">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium mb-1">
                        Skill Name
                      </label>
                      <Input
                        value={newSkill.name}
                        onChange={(e) =>
                          setNewSkill({ ...newSkill, name: e.target.value })
                        }
                        placeholder="React, TypeScript, etc."
                      />
                    </div>
                    <div className="flex-grow">
                      <label className="block text-sm font-medium mb-1">
                        Skill Level (%)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={newSkill.level}
                        onChange={(e) =>
                          setNewSkill({
                            ...newSkill,
                            level: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <Button
                      onClick={addSkill}
                      className="flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Journey</h3>
                </div>

                <div className="space-y-4">
                  {journey.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-4 p-3 border rounded-md"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <p>{item.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteJourneyItem(item.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </motion.div>
                  ))}

                  <div className="flex items-end gap-4 p-4 border border-dashed rounded-md">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium mb-1">
                        Journey Item
                      </label>
                      <Input
                        value={newJourneyItem.description}
                        onChange={(e) =>
                          setNewJourneyItem({ description: e.target.value })
                        }
                        placeholder="Started my journey as a developer in 2018"
                      />
                    </div>
                    <Button
                      onClick={addJourneyItem}
                      className="flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="flex items-center gap-2"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditor;
