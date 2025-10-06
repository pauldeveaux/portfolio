import { fetchCMS } from "../fetchCMS";
import {SkillCategory, Skill} from "@/types/cms/components/Skill";



export async function getSkills(): Promise<SkillCategory[]> {
  const rawSkills = await fetchCMS<any>("/skill-categories?populate=skills", process.env.CMS_API_KEY);

  const skillCategories: SkillCategory[] = rawSkills.map(item => ({
    title: item.title,
    skills: item.skills.map((itemSkill: Skill) => ({
      name: itemSkill.name,
      description: itemSkill.description,
    }))
  }));

  return skillCategories;
}
