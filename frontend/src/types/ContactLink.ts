

export interface ContactLink {
    /** Name of the social media or contact platform */
    socialMedia: string;
    /** URL of the platform's icon/image */
    imageUrl: string;
    /** Display text for the link */
    text: string;
    /** URL to navigate to when clicked */
    link: string;
    /** If the link must be downloaded */
    download: boolean;
}
