import { HomepageSectionsData } from "@/types/cms/singles/HomepageSectionsData";
import { fetchCMS } from "../fetchCMS";


export async function getHomepageSectionsData(): Promise<HomepageSectionsData> {
  // Fetch raw hero data from CMS
  const homepageSectionsData = await fetchCMS<HomepageSectionsData>("/homepage", process.env.CMS_API_KEY);

  // Ensure we have at least one entry
  if (!homepageSectionsData || homepageSectionsData.length === 0) {
    throw new Error("No homepage section data found");
  }

  // Return the first element
  return homepageSectionsData[0];
}
