import { fetchCMS } from "../fetchCMS";
import { SkillCategory, Skill } from "@/types/Skill";


type CMSSkill = SkillCategory


/**
 * Fetches skill categories from the CMS, including their associated skills.
 * Maps the raw CMS response to the `SkillCategory` type.
 *
 * @returns Promise resolving to an array of `SkillCategory` objects.
 */
export async function getSkills(): Promise<SkillCategory[]> {
  const rawSkills = await fetchCMS<CMSSkill>(
    "/skill-categories?populate=skills",
    process.env.CMS_API_KEY
  );

  const skillCategories: SkillCategory[] = rawSkills.map(item => ({
    title: item.title,
    skills: item.skills.map((itemSkill: Skill) => ({
      name: itemSkill.name,
      description: itemSkill.description,
    })),
  }));

  return skillCategories;
}
