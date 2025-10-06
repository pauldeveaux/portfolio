import { HeroSectionData, TextSectionData } from "@/types/cms/singles";
import { Project } from "@/types/cms/components";

/**
 * Represents all data needed to render the homepage.
 */
export type HomepageData = {
  /** Data for the hero section */
  heroSectionData: HeroSectionData;

  /** Data for the text/info section */
  textSectionData: TextSectionData;

  /** Optional list of projects for the portfolio section */
  projects?: Project[];
};
