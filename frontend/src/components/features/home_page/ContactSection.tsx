'use client';

import Section, {SectionProps} from "@/components/ui/miscellaneous/Section";
import ContactLink, {ContactLinkProps} from "@/components/ui/contact/ContactLink";
import ContactForm from "@/components/ui/contact/ContactForm";
import clsx from "clsx";


interface ContactSectionProps extends SectionProps {
    title: string
    contacts: Array<ContactLinkProps>
}


export default function ContactSection({ title, contacts, ...sectionProps}: ContactSectionProps) {
    return (
        <Section
            {...sectionProps}
            className={clsx("pb-10", sectionProps.className)}
        >
            <div className="w-full max-w-5xl mx-auto px-4">
                <h2 className="text-5xl font-bold mb-8 text-center pt-16">{title}</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {contacts.map((contact) => (
                        <ContactLink key={contact.social_media} {...contact} />
                    ))}
                </div>
                < ContactForm/>
            </div>
        </Section>
    );
}