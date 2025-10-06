import { Hero } from "@/types/cms";
import { fetchCMS } from "./fetchCMS";

export async function getHero(): Promise<Hero[]> {
  return fetchCMS<Hero>("/hero", process.env.CMS_API_KEY);
}