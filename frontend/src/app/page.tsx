'use client';

import Header from "@/components/features/home_page/Header";
import HeroSection from "@/components/features/home_page/HeroSection";
import ContactSection from "@/components/features/home_page/ContactSection";
import FooterSection from "@/components/features/home_page/FooterSection";
import SkillsSection from "@/components/features/home_page/SkillsSection";
import TextSection from "@/components/features/home_page/TextSection";
import TimelineSection from "@/components/features/home_page/TimelineSection";
import ChatSection from "@/components/features/home_page/ChatSection";
import PortfolioSection from "@/components/features/home_page/PortfolioSection";
import BlurryParticles from "@/components/ui/particles/BlurryParticles";
import WaveStyleSeparator from "@/components/ui/SectionSeparator/WaveStyleSeparator";
import GradientStyleSeparator from "@/components/ui/SectionSeparator/GradientStyleSeparator";


export default function HomePage() {

    return (
        <div className="bg-background min-h-screen">
            <Header title={"Paul Deveaux"} navLinks={[
                {"label": "À propos", "href": "about"},
                {"label": "Compétences", "href": "skills"},
                {"label": "Chat IA", "href": "chat"},
                {"label": "Parcours", "href": "timeline"},
                {"label": "Portfolio", "href": "portfolio"},
                {"label": "Contact", "href": "contact"},
            ]}
            />

            <BlurryParticles/>

            <HeroSection
                id={"hero"}
                className={"text-white"}
                title={"Paul Deveaux"}
                description={"Développeur IA - Junior | Passionné par l'innovation technologique et la création de solutions intelligentes."}
            />

            < GradientStyleSeparator
                bgClassName={"bg-gradient-to-b from-[#107E7D]/10 to-[#39B3AA]" }
           />


            < TextSection
                id="about"
                className="bg-[#39B3AA]"
                title={"Plus sur moi"}
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quam quam, varius eget magna sit amet, volutpat luctus arcu. Proin imperdiet vitae lectus et volutpat. Nulla at ante ex. Nam rhoncus sapien nec elementum viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas bibendum dapibus euismod. Suspendisse maximus finibus risus. Quisque scelerisque non diam et iaculis. Duis eget accumsan tortor. Ut accumsan quam ex, rutrum porta augue suscipit vel. Curabitus"+
                    "\n\n" +
                    "Vestibulum maximus ultricies justo nec pharetra. Vestibulum vulputate molestie leo id semper. Ut consequat maximus justo ut hendrerit. Phasellus suscipit ex eu massa ornare gravida. Nam nisl mi, convallis in justo in, sodales ullamcorper sapien. Mauris consectetur consectetur lorem in vestibulum. Sed auctor elementum commodo. Fusce luctus quam et eleifend vestibulum. Suspendisse egestas ante a massa mollis vulputate.\n" +
                    "\n" +
                    "Nunc mollis at ipsum at consectetur. Donec sollicitudin lorem ut aliquet sollicitudin. Curabitur est risus, efficitur ut turpis facilisis, vulputate ullamcorper felis. Proin suscipit consequat augue a hendrerit. Nulla facilisi. Praesent euismod quam a ante ornare molestie. Sed bibendum enim at purus efficitur tempor. Aliquam id sem finibus lorem egestas rutrum a ornare sapien. Vestibulum faucibus turpis ac euismod tincidunt. Phasellus sit amet pretium urna."}
            />

            < GradientStyleSeparator
                bgClassName={"bg-gradient-to-b from-[#39B3AA] to-white/60"}
                height={44}
            />


            < ChatSection
                id="chat"
                className="bg-white"
                title={"Pose moi des questions"}
            />


            < WaveStyleSeparator
                nextBackground={"fill-white"}
                height={70}
                flipY={true}
                flipX={true}
                className={"bg-gradient-to-t from-white/80 to-white/0 "}
                shape={"M0,32L80,69.3C160,107,320,181,480,186.7C640,192,800,128,960,128C1120,128,1280,192,1360,224L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"}
            />

            <SkillsSection
                id="skills"
                title={"Compétences"}
                className="text-white mb-5"
                categories={[
                    {
                        title: "Développement",
                        skills: [
                            {
                                name: "Python",
                                description: "Python est un langage de programmation polyvalent et puissant, largement utilisé pour le développement web, l'analyse de données, l'intelligence artificielle, l'automatisation et bien plus encore."
                            },
                            {name: "React", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae convallis purus, at laoreet turpis. Fusce congue pretium lacus, cursus tempus velit fermentum eget. Nulla condimentum turpis eros, pellentesque vehicula tellus aliquet ut. Donec a justo nec ante facilisis feugiat. Ut volutpat blandit sodales. Donec ultricies rhoncus mollis. Vestibulum eget pulvinar mauris. Vivamus ultrices ac tellus ut eleifend. Etiam maximus orci non sodales porttitor. Maecenas id pharetra risus. Curabitur rutrum egestas dapibus. Nam a sagittis lectus. Vestibulum tincidunt mi sem, ac tristique justo euismod non. Etiam quis facilisis erat, et varius orci. Proin efficitur nulla elit, sed viverra elit gravida eget. Aliquam quis lectus non diam tincidunt vehicula quis vitae erat."},
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
                title="Mon Parcours"
                className="bg-white"
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


            <PortfolioSection
                id={"portfolio"}
                title={"Mes projets"}
                className={"bg-gradient-to-b from-[#14A3A2] via-[#129190] to-[#107E7D] text-black"}
                projects={[
                    {title: "Mon projet !", description: "test description", imageUrl: "/nothing", tags: ["CSS", "React"], size:"medium", markdownUrl: "/test"},
                    {title: "Test projet", description: "test description", imageUrl: "/nothing", size:"small"},
                    {title: "Test projet", description: "test description", imageUrl: "/nothing", size: "small"},
                    {title: "Test projet", description: "test description", imageUrl: "/nothing", size:"medium"},
                    {title: "Test projet2", description: "test description", imageUrl: "/nothing"},
                    {title: "Test projet", description: "test description", imageUrl: "/nothing"},
                    {title: "Test projet", description: "test description", imageUrl: "/nothing"},
                    {title: "Test projet", description: "test description", imageUrl: "/nothing"}

                ]}
            />


            <ContactSection
                id="contact"
                title={"Contactez-moi"}
                className={"bg-white"}
                height={"65vh"}
                contacts={[
                    {
                        social_media: "email",
                        image_url: "/images/logos/mail-icon.svg",
                        text: "paul.deveaux1@gmail.com",
                        link: "mailto:paul.deveaux1@gmail.com"
                    },
                    {
                        social_media: "linkedin",
                        image_url: "/images/logos/linkedin-icon.svg",
                        text: "linkedin.com/in/paul-deveaux",
                        link: "https://www.linkedin.com/in/paul-deveaux-7a731a202/"
                    },
                    {
                        social_media: "github",
                        image_url: "/images/logos/github-icon.svg",
                        text: "github.com/pauldeveaux",
                        link: "https://github.com/pauldeveaux"
                    }
                ]}
            />


            <FooterSection
                id="footer"
                className={"bg-[#107E7D]"}
                navLinks={[
                    {"label": "À propos", "href": "about"},
                    {"label": "Compétences", "href": "skills"},
                    {"label": "Chat IA", "href": "chat"},
                    {"label": "Parcours", "href": "timeline"},
                    {"label": "Portfolio", "href": "portfolio"},
                    {"label": "Contact", "href": "contact"},
                ]}/>
        </div>
    );
}