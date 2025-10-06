import { Project } from "@/types/cms/components";
import { fetchCMS, getImgFullUrl } from "../fetchCMS";

/**
 * Fetches all projects from the CMS, including their main image.
 * Uses `populate=image` to retrieve the image data.
 * Maps the raw CMS response to the `Project` type.
 *
 * @returns Promise resolving to an array of `Project`
 */
export async function getProjects(): Promise<Project[]> {
  // Fetch raw projects from the CMS, including populated image
  const rawProjects = await fetchCMS<any>("/projects?populate=image", process.env.CMS_API_KEY);

  // Map CMS response to the Project type
  const projects: Project[] = rawProjects.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    size: item.size as "small" | "medium" | "large",
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    publishedAt: item.publishedAt,
    markdown: item.markdown,
    // Use helper to get full image URL
    imageUrl: item.image?.url ? getImgFullUrl(item.image.url) : "/placeholder.png",
  }));

  return projects;
}
