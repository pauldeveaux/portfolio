import { getHero } from "./hero";
import { getProjects } from "./portfolio";

import type { HomepageData } from "@/types/cms/cms";

export default async function getHomepageData(): Promise<HomepageData> {
  const [hero, projects] = await Promise.all([
    getHero(),
    getProjects(),
  ]);

  return { hero, projects };
}
