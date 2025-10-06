import { TextSectionData } from "@/types/cms/singles";
import { fetchCMS } from "./fetchCMS";

export async function getTextSectionData(): Promise<TextSectionData> {
  const textSectionData = await fetchCMS<TextSectionData>("/text-section", process.env.CMS_API_KEY);

  if (!textSectionData || textSectionData.length === 0) {
    throw new Error("No text section data found");
  }

  return textSectionData[0];
}