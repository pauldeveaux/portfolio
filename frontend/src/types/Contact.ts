export interface ContactFormData {
    /** First name of the sender */
    firstName: string;
    /** Last name of the sender */
    lastName: string;
    /** Email of the sender */
    email: string;
    /** Message to send */
    message: string;
}

export interface Contact {
    /** Name of the social media or contact platform */
    socialMedia: string;
    /** URL of the platform's icon/image */
    imageUrl: string;
    /** Display text for the link */
    text: string;
    /** URL to navigate to when clicked */
    link: string;
}
