'use client';

import Section, { SectionProps } from "@/components/ui/layout/Section";
import ContactLinkButton from "@/components/ui/contact/ContactLinkButton";
import ContactForm from "@/components/ui/contact/ContactForm";
import clsx from "clsx";
import {ContactLink} from "@/types/ContactLink";

/**
 * Props for the ContactSection component.
 *
 * @extends SectionProps - Inherits props from Section.
 * @property {string} title - Section title.
 * @property {Array<ContactLink>} contacts - List of contact links to display.
 */
interface ContactSectionProps extends SectionProps {
    title: string;
    contacts: Array<ContactLink>;
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
                        <ContactLinkButton key={contact.socialMedia} {...contact} />
                    ))}
                </div>

                {/* Contact form */}
                <ContactForm />
            </div>
        </Section>
    );
}
