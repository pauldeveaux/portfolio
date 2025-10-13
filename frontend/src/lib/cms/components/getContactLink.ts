import {fetchCMS, getFileFullUrl} from "../fetchCMS";
import { Contact } from "@/types/Contact";

type CMSContactLink = Contact & {
    file: { url: string };
}

/**
 * Fetches contact links from the CMS and maps them to the `ContactLink` type.
 *
 * @returns A promise that resolves to an array of `ContactLink` objects.
 */
export async function getContactLink(): Promise<Contact[]> {
    const rawContactLink = await fetchCMS<CMSContactLink>("/contact-links?sort=sortOrder&populate=file", process.env.CMS_API_KEY);

    const contactLinks: Contact[] = rawContactLink.map(item => ({
        socialMedia: item.socialMedia,
        imageUrl: item.imageUrl,
        text: item.text,
        link: item.file ? getFileFullUrl(item.file.url) : item.link,
    }));

    return contactLinks;
}
