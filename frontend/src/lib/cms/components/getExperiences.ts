import { fetchCMS } from "../fetchCMS";
import { Experience } from "@/types/Experience";


type CMSExperience = Omit<Experience, "subtags"> & {
    subtags?: {name: string }[];
}

/**
 * Fetches experiences from the CMS, including subtags, and maps them to the `Experience` type.
 *
 * @returns A promise that resolves to an array of `Experience` objects.
 */
export async function getExperiences(): Promise<Experience[]> {
    const rawExperience = await fetchCMS<CMSExperience>("/experiences?populate=subtags", process.env.CMS_API_KEY);

    console.log(rawExperience)

    const experiences: Experience[] = rawExperience.map(item => ({
        title: item.title,
        subtitle: item.subtitle,
        text: item.text,
        date: item.date,
        type: item.type,
        tag: item.tag,
        subtags: item.subtags?.map(subtag => subtag.name)
    }));

    return experiences;
}
