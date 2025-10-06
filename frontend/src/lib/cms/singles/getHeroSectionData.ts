import { HeroSectionData } from "@/types/cms/singles";
import { fetchCMS } from "../fetchCMS";

/**
 * Fetches the hero section data from the CMS.
 * Since the CMS always returns an array, we take the first element.
 *
 * @returns Promise resolving to a single `HeroSectionData` object
 * @throws Error if no hero section data is found
 */
export async function getHeroSectionData(): Promise<HeroSectionData> {
  // Fetch raw hero data from CMS
  const heroSectionData = await fetchCMS<HeroSectionData>("/hero-section", process.env.CMS_API_KEY);

  // Ensure we have at least one entry
  if (!heroSectionData || heroSectionData.length === 0) {
    throw new Error("No hero found");
  }

  // Return the first element
  return heroSectionData[0];
}
