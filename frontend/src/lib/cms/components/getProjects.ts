import { Project } from "@/types/cms/components";
import { fetchCMS, getFileFullUrl } from "../fetchCMS";


type CMSProject = Omit<Project, "markdownUrl" | "imageUrl"> & {
  markdownFile: { url: string};
  image: { url: string };
}

/**
 * Fetches all projects from the CMS, including their main image and optional markdown file.
 * Uses `populate=image` and `populate=markdownFile` to retrieve the related data.
 * Maps the raw CMS response to the `Project` type.
 *
 * @returns Promise resolving to an array of `Project`.
 */
export async function getProjects(): Promise<Project[]> {
  const rawProjects = await fetchCMS<CMSProject>(
    "/projects?populate=image&populate=markdownFile&sort=sortOrder",
    process.env.CMS_API_KEY
  );

  const projects: Project[] = rawProjects.map(item => ({
    title: item.title,
    description: item.description,
    size: item.size as "small" | "medium" | "large",
    markdown: item.markdown,
    markdownUrl: item.markdownFile?.url ? getFileFullUrl(item.markdownFile.url) : undefined,
    imageUrl: item.image?.url ? getFileFullUrl(item.image.url) : "/placeholder.png",
  }));

  return projects;
}
