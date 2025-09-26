'use client';

import Section, {SectionProps} from "@/components/ui/Section";
import ContactLink, {ContactLinkProps} from "@/components/ui/contact/ContactLink";
import ContactForm from "@/components/ui/contact/ContactForm";


interface ContactSectionProps extends SectionProps {
    title: string
    contacts: Array<ContactLinkProps>
}


export default function ContactSection({ title, contacts, ...sectionProps}: ContactSectionProps) {
    return (
        <Section {...sectionProps}>
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