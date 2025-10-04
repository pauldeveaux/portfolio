'use client';

import Section, { SectionProps } from "@/components/ui/layout/Section";
import ContactLink, { ContactLinkProps } from "@/components/ui/contact/ContactLink";
import ContactForm from "@/components/ui/contact/ContactForm";
import clsx from "clsx";

/**
 * Props for the ContactSection component.
 *
 * @extends SectionProps - Inherits props from Section.
 * @property {string} title - Section title.
 * @property {Array<ContactLinkProps>} contacts - List of contact links to display.
 */
interface ContactSectionProps extends SectionProps {
    title: string;
    contacts: Array<ContactLinkProps>;
}

/**
 * Renders a section with a title, a list of contact links, and a contact form.
 */
export default function ContactSection({ title, contacts, ...sectionProps }: ContactSectionProps) {
    return (
        <Section
            {...sectionProps}
            className={clsx("pb-10", sectionProps.className)}
        >
            <div className="w-full max-w-5xl mx-auto px-4">

                <h2 className="text-5xl font-bold mb-8 text-center pt-16">{title}</h2>

                {/* Contact links list */}
                <div className="flex flex-wrap justify-center gap-6">
                    {contacts.map((contact) => (
                        <ContactLink key={contact.social_media} {...contact} />
                    ))}
                </div>

                {/* Contact form */}
                <ContactForm />
            </div>
        </Section>
    );
}
