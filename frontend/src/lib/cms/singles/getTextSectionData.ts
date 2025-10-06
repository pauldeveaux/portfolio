import { TextSectionData } from "@/types/cms/singles";
import { fetchCMS } from "../fetchCMS";

/**
 * Fetches the text section data from the CMS.
 * Since the CMS always returns an array, we take the first element.
 *
 * @returns Promise resolving to a single `TextSectionData` object
 * @throws Error if no text section data is found
 */
export async function getTextSectionData(): Promise<TextSectionData> {
  // Fetch raw text section data from the CMS
  const textSectionData = await fetchCMS<TextSectionData>("/text-section", process.env.CMS_API_KEY);

  // Ensure we have at least one entry
  if (!textSectionData || textSectionData.length === 0) {
    throw new Error("No text section data found");
  }

  // Return the first element
  return textSectionData[0];
}
