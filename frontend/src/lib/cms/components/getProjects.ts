import { Project } from "@/types/cms/components";
import {fetchCMS, getImgFullUrl} from "../fetchCMS";

export async function getProjects(): Promise<Project[]> {
  const rawProjects = await fetchCMS<any>("/projects?populate=image", process.env.CMS_API_KEY);

  const projects: Project[] = rawProjects.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    size: item.size as "small" | "medium" | "large",
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    publishedAt: item.publishedAt,
    markdown: item.markdown,
    imageUrl: getImgFullUrl(item.image.url)
  }));

  return projects;
}
