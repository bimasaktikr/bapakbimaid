import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Profile {
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

export interface Skill {
  id: string;
  name: string;
  level: number;
  profile_id: string;
}

export interface Journey {
  id: string;
  description: string;
  profile_id: string;
  order: number;
}

export interface Project {
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

interface PortfolioData {
  profile: Profile | null;
  skills: Skill[];
  journey: Journey[];
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export const usePortfolioData = (): PortfolioData => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [journey, setJourney] = useState<Journey[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .single();

        if (profileError && profileError.code !== "PGRST116")
          throw profileError;

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

        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (projectsError) throw projectsError;

        // Set the data
        setProfile(profileData || null);
        setSkills(skillsData || []);
        setJourney(journeyData || []);
        setProjects(projectsData || []);
      } catch (err: any) {
        console.error("Error fetching portfolio data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { profile, skills, journey, projects, loading, error };
};
