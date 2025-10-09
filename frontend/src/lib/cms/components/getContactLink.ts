import {fetchCMS, getFileFullUrl} from "../fetchCMS";
import { ContactLink } from "@/types/ContactLink";

type CMSContactLink = ContactLink & {
    file: { url: string };
}

/**
 * Fetches contact links from the CMS and maps them to the `ContactLink` type.
 *
 * @returns A promise that resolves to an array of `ContactLink` objects.
 */
export async function getContactLink(): Promise<ContactLink[]> {
    const rawContactLink = await fetchCMS<CMSContactLink>("/contact-links?sort=sortOrder&populate=file", process.env.CMS_API_KEY);

    const contactLinks: ContactLink[] = rawContactLink.map(item => ({
        socialMedia: item.socialMedia,
        imageUrl: item.imageUrl,
        text: item.text,
        link: item.download
        ? getFileFullUrl(item.file.url)
        : item.link,
        download: item.download,
    }));

    return contactLinks;
}
