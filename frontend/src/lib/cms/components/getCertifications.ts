import { Certification } from "@/types/Certification";
import { fetchCMS, getFileFullUrl } from "../fetchCMS";

type CMSCertification = Omit<Certification, "imageUrl" | "pdfUrl"> & {
  image?: { url: string };
  pdf?: { url: string };
};

/**
 * Fetches all certifications from the CMS, including their badge image and PDF file.
 * Maps the raw CMS response to the `Certification` type.
 *
 * @returns Promise resolving to an array of `Certification`.
 */
export async function getCertifications(): Promise<Certification[]> {
  const rawCertifications = await fetchCMS<CMSCertification>(
    "/certifications?populate=image&populate=pdf&sort=date:desc",
    process.env.CMS_API_KEY
  );

  const certifications: Certification[] = rawCertifications.map(item => ({
    title: item.title,
    provider: item.provider,
    date: item.date,
    imageUrl: item.image?.url ? getFileFullUrl(item.image.url) : "/images/fallback.png",
    pdfUrl: item.pdf?.url ? getFileFullUrl(item.pdf.url) : undefined,
  }));

  return certifications;
}
