import { HomepageSectionsData } from "@/types/cms/singles/HomepageSectionsData";
import { fetchCMS } from "../fetchCMS";

/**
 * Fetches homepage sections data from the CMS.
 * Ensures that at least one entry exists and returns the first element.
 *
 * @returns Promise resolving to a `HomepageSectionsData` object.
 * @throws Error if no homepage section data is found.
 */
export async function getHomepageSectionsData(): Promise<HomepageSectionsData> {
  // Fetch raw homepage data from CMS
  const homepageSectionsData = await fetchCMS<HomepageSectionsData>(
    "/homepage",
    process.env.CMS_API_KEY
  );

  // Ensure we have at least one entry
  if (!homepageSectionsData || homepageSectionsData.length === 0) {
    throw new Error("No homepage section data found");
  }

  // Return the first element
  return homepageSectionsData[0];
}
