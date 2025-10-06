import { HeroSectionData } from "@/types/cms/singles";
import { fetchCMS } from "../fetchCMS";

export async function getHeroSectionData(): Promise<HeroSectionData> {
  const heroSectionData = await fetchCMS<HeroSectionData>("/hero-section", process.env.CMS_API_KEY);

  if (!heroSectionData || heroSectionData.length === 0) {
    throw new Error("No hero found");
  }

  return heroSectionData[0];
}