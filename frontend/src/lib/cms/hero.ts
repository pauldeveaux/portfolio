import { Hero } from "@/types/cms/singles/Hero";
import { fetchCMS } from "./fetchCMS";

export async function getHero(): Promise<Hero> {
  const heroes = await fetchCMS<Hero>("/hero", process.env.CMS_API_KEY);

  if (!heroes || heroes.length === 0) {
    throw new Error("No hero found");
  }

  return heroes[0];
}