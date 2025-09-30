'use client';

import Header from "@/components/features/Header";
import HeroSection from "@/components/features/sections/HeroSection";
import ContactSection from "@/components/features/sections/ContactSection";
import FooterSection from "@/components/features/sections/FooterSection";
import SkillsSection from "@/components/features/sections/SkillsSection";
import TextSection from "@/components/features/sections/TextSection";
import TimelineSection, {TimelineElementType} from "@/components/features/sections/TimelineSection";
import {Star} from "lucide-react";


export default function HomePage() {

    return (
        <div className="bg-background min-h-screen">
            <Header title={"Paul Deveaux"} navLinks={[
                {"label": "A propos", "href": "about"},
                {"label": "Compétences", "href": "skills"},
                {"label": "Expérience", "href": "Test"},
                {"label": "Formation", "href": "Test"},
                {"label": "Portfolio", "href": "Test"},
                {"label": "Contact", "href": "contact"},
            ]}
            />

            <HeroSection
                id={"hero"}
                className={"bg-gradient-to-b from-[#14A3A2] via-[#129190] to-[#107E7D] text-white  "}
                title={"Paul Deveaux"}
                description={"Développeur IA - Junior | Passionné par l'innovation technologique et la création de solutions intelligentes."}
            />

            < TextSection
                id="about"
                className="bg-gradient-to-tl from-secondary-background via-primary to-primary-60"
                title={"Plus sur moi"}
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quam quam, varius eget magna sit amet, volutpat luctus arcu. Proin imperdiet vitae lectus et volutpat. Nulla at ante ex. Nam rhoncus sapien nec elementum viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas bibendum dapibus euismod. Suspendisse maximus finibus risus. Quisque scelerisque non diam et iaculis. Duis eget accumsan tortor. Ut accumsan quam ex, rutrum porta augue suscipit vel. Curabitur elit dolor, posuere id feugiat a, pellentesque eu diam. Proin vitae luctus ante. Mauris elementum mattis felis vel convallis. Vivamus rutrum ac mi in lacinia. Sed accumsan, erat ac ultricies pulvinar, arcu diam varius quam, a porttitor diam nulla non metus." +
                    "Proin tempor egestas felis, sit amet tincidunt tortor auctor in. Nulla cursus felis nunc, sed iaculis ipsum placerat sit amet. Praesent efficitur, eros fermentum tincidunt dignissim, erat magna molestie dolor, quis aliquam urna mauris vitae nulla. Nam elementum tristique rhoncus. Morbi in placerat orci. Mauris facilisis, ipsum vel tristique fermentum, tortor neque dictum magna, id fringilla quam nunc at orci. Fusce scelerisque ut magna sit amet feugiat." +
                    "Fusce eleifend pharetra suscipit. Maecenas erat nisl, luctus at efficitur nec, euismod at risus. Aenean mattis metus enim, a placerat leo tincidunt in. Cras vitae dolor quis metus commodo ullamcorper. Phasellus congue justo at ultricies tincidunt. Nullam vitae orci est. Suspendisse vel semper tellus. Mauris ac urna laoreet, tempus mi ac, sagittis sapien. Aliquam ac nibh rutrum, volutpat massa eget, bibendum purus. Quisque viverra consectetur imperdiet. Donec tempor erat nec hendrerit hendrerit.\n" +
                    "\n" +
                    "Vestibulum maximus ultricies justo nec pharetra. Vestibulum vulputate molestie leo id semper. Ut consequat maximus justo ut hendrerit. Phasellus suscipit ex eu massa ornare gravida. Nam nisl mi, convallis in justo in, sodales ullamcorper sapien. Mauris consectetur consectetur lorem in vestibulum. Sed auctor elementum commodo. Fusce luctus quam et eleifend vestibulum. Suspendisse egestas ante a massa mollis vulputate.\n" +
                    "\n" +
                    "Nunc mollis at ipsum at consectetur. Donec sollicitudin lorem ut aliquet sollicitudin. Curabitur est risus, efficitur ut turpis facilisis, vulputate ullamcorper felis. Proin suscipit consequat augue a hendrerit. Nulla facilisi. Praesent euismod quam a ante ornare molestie. Sed bibendum enim at purus efficitur tempor. Aliquam id sem finibus lorem egestas rutrum a ornare sapien. Vestibulum faucibus turpis ac euismod tincidunt. Phasellus sit amet pretium urna."}
            />


            <SkillsSection
                id="skills"
                className={"bg-gradient-to-tr from-secondary-background via-primary to-primary-60"}
                title={"Compétences"}
                categories={[
                    {
                        title: "Développement",
                        skills: [
                            {
                                name: "Python",
                                description: "Python est un langage de programmation polyvalent et puissant, largement utilisé pour le développement web, l'analyse de données, l'intelligence artificielle, l'automatisation et bien plus encore."
                            },
                            {name: "React", description: "desc"},
                            {name: "Next.JS", description: "desc"},
                        ]
                    },
                    {
                        title: "IA",
                        skills: [
                            {name: "IA", description: "Test test"},
                            {name: "Langchain", description: "desc"},
                            {name: "RAG", description: "desc"},
                        ]
                    },
                ]}
            />


            <TimelineSection
                id="timeline"
                title="Mes formations"
                elements={[
                    {
                        title: "WORK",
                        subtitle: "Telecom Nancy",
                        text: "Obtention du diplôme d'ingénieur en Intelligence Artificielle & Masse de données." +
                            " Prêt à relever de nouveaux défis professionnels !",
                        date: "Septembre 2025",
                        type: "Work",
                    },
                    {
                        title: "Ingénieur diplômé 🎓",
                        subtitle: "Telecom Nancy",
                        text: "Obtention du diplôme d'ingénieur en Intelligence Artificielle & Masse de données." +
                            " Prêt à relever de nouveaux défis professionnels !",
                        date: "Septembre 2025",
                        type: "Graduate",
                        tag: "DIPLÔMÉ",
                    },
                    {
                        title: "Stage de fin d'études",
                        subtitle: "SFEIR Luxembourg",
                        text: "blabla",
                        date: "mars 2025 - août 2025",
                        type: "Internship",
                        tag: "STAGE",
                        subtags: ["VLM", "API REST"]
                    },
                    {
                        title: "Stage Laboratoire ERPI",
                        subtitle: "SFEIR Luxembourg",
                        text: "blabla",
                        date: "mars 2025 - août 2025",
                        type: "Internship",
                        tag: "STAGE",
                        subtags: ["VLM", "API REST"]
                    },
                    {
                        title: "Ecole d'ingénieur",
                        subtitle: "Telecom Nancy",
                        text: "Blabla",
                        date: "Septembre 2025",
                        type: "School",
                    },
                    {
                        title: "Stage IUT",
                        subtitle: "SFEIR Luxembourg",
                        text: "blabla",
                        date: "mars 2025 - août 2025",
                        type: "Internship",
                        tag: "STAGE",
                        subtags: ["VLM", "API REST"]
                    },
                    {
                        title: "DUT Informatique",
                        subtitle: "IUT Nancy Charlemagne",
                        text: "Blabla",
                        date: "Septembre 2025",
                        type: "School",
                    },
                ]}
            />


            <ContactSection
                id="contact"
                title={"Contactez-moi"}
                className={"bg-radial from-white to-secondary-background"}
                height={"65vh"}
                contacts={[
                    {
                        social_media: "email",
                        image_url: "/logos/mail-icon.svg",
                        text: "paul.deveaux1@gmail.com",
                        link: "mailto:paul.deveaux1@gmail.com"
                    },
                    {
                        social_media: "linkedin",
                        image_url: "/logos/linkedin-icon.svg",
                        text: "linkedin.com/in/paul-deveaux",
                        link: "https://www.linkedin.com/in/paul-deveaux-7a731a202/"
                    },
                    {
                        social_media: "github",
                        image_url: "/logos/github-icon.svg",
                        text: "github.com/pauldeveaux",
                        link: "https://github.com/pauldeveaux"
                    }
                ]}
            />


            <FooterSection
                id="footer"
                className={"bg-primary-60"}
                navLinks={[
                    {"label": "Compétences", "href": "skills"},
                    {"label": "Formation", "href": "timeline"},
                ]}/>
        </div>
    );
}