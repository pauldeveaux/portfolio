import {HeroSectionData, TextSectionData} from "@/types/cms/singles";
import {Project} from "@/types/cms/components";


export type HomepageData = {
  heroSectionData: HeroSectionData;
  textSectionData: TextSectionData;
  projects?: Project[];
};