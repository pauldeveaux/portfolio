import { Project } from "@/types/cms/components";
import {HomepageSectionsData} from "@/types/cms/singles/HomepageSectionsData";
import {SkillCategory} from "@/types/Skill";
import {Experience} from "@/types/Experience";
import {Contact} from "@/types/Contact";
import {Certification} from "@/types/Certification";

/**
 * Represents all data needed to render the homepage.
 */
export type HomepageData = {
  sections: HomepageSectionsData;



  /** Optional list of projects for the portfolio section */
  projects?: Project[];
  skillCategories: SkillCategory[];
  certifications: Certification[];
  experiences: Experience[];
  contactLinks: Contact[];
};
