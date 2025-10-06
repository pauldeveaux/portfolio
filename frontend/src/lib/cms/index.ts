import { getHeroSectionData } from "./getHeroSectionData";
import { getProjects } from "./getProjects";

import type { HomepageData } from "@/types/cms/cms";
import {getTextSectionData} from "@/lib/cms/getTextSectionData";

export default async function getHomepageData(): Promise<HomepageData> {
  const [
      heroSectionData,
      textSectionData,
      projects
  ] = await Promise.all([
    getHeroSectionData(),
    getTextSectionData(),
    getProjects(),
  ]);

  return {
      heroSectionData,
      textSectionData,
      projects
  };
}
