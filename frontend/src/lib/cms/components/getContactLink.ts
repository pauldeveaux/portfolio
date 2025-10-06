import { fetchCMS } from "../fetchCMS";
import { ContactLink } from "@/types/ContactLink";

/**
 * Fetches contact links from the CMS and maps them to the `ContactLink` type.
 *
 * @returns A promise that resolves to an array of `ContactLink` objects.
 */
export async function getContactLink(): Promise<ContactLink[]> {
    const rawExperience = await fetchCMS<any>("/contact-links", process.env.CMS_API_KEY);

    const contactLinks: ContactLink[] = rawExperience.map(item => ({
        socialMedia: item.socialMedia,
        imageUrl: item.imageUrl,
        text: item.text,
        link: item.link,
    }));

    return contactLinks;
}
