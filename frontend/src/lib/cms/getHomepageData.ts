import type { HomepageData } from "@/types/cms/cms";
import { getProjects } from "@/lib/cms/components/getProjects";
import {getHomepageSectionsData} from "@/lib/cms/singles/getHomepageSectionData";
import {getSkills} from "@/lib/cms/components/getSkills";

/**
 * Map of fetcher functions for each section of the homepage.
 * Each key corresponds to a property in HomepageData,
 * and the value is an async function returning that data.
 */
type FetcherMap = {
  [K in keyof HomepageData]: () => Promise<HomepageData[K]>;
};

/**
 * Executes all fetcher functions in parallel and returns an object
 * with the same keys containing the resolved values.
 *
 * @template T - Object of functions returning promises
 * @param fetchers - Object with async fetcher functions
 * @returns Object with resolved results matching the fetchers' keys
 */
export async function fetchAll<T extends Record<string, () => any>>(
  fetchers: T
): Promise<{ [K in keyof T]: Awaited<ReturnType<T[K]>> }> {
  const keys = Object.keys(fetchers) as (keyof T)[];
  const results = await Promise.all(
    keys.map(k => (fetchers[k] as () => Promise<any>)())
  );

  return keys.reduce((acc, key, i) => {
    acc[key] = results[i];
    return acc;
  }, {} as { [K in keyof T]: Awaited<ReturnType<T[K]>> });
}

/**
 * Fetches all data needed for the homepage.
 * Combines hero section, text section, and projects in parallel.
 *
 * @returns Complete HomepageData object
 */
export default async function getHomepageData(): Promise<HomepageData> {
  const fetchers: FetcherMap = {
    sections: getHomepageSectionsData,
    projects: getProjects,
    skillCategories: getSkills
  };

  return fetchAll(fetchers);
}
