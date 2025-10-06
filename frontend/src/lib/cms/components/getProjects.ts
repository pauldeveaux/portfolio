import { Project } from "@/types/cms/components";
import { fetchCMS, getFileFullUrl } from "../fetchCMS";
import {none} from "@tsparticles/engine";

/**
 * Fetches all projects from the CMS, including their main image.
 * Uses `populate=image` to retrieve the image data.
 * Maps the raw CMS response to the `Project` type.
 *
 * @returns Promise resolving to an array of `Project`
 */
export async function getProjects(): Promise<Project[]> {
  // Fetch raw projects from the CMS, including populated image
  const rawProjects = await fetchCMS<any>("/projects?populate=image&populate=markdownFile", process.env.CMS_API_KEY);

  console.log(rawProjects)
  // Map CMS response to the Project type
  const projects: Project[] = rawProjects.map(item => ({
    title: item.title,
    description: item.description,
    size: item.size as "small" | "medium" | "large",
    markdown: item.markdown,
    markdownUrl: item.markdownFile?.url ? getFileFullUrl(item.markdownFile.url):undefined,
    imageUrl: item.image?.url ? getFileFullUrl(item.image.url) : "/placeholder.png",
  }));

  console.log(projects)
  return projects;
}
