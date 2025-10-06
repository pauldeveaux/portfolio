import Header from "@/components/features/sections/Header";
import HeroSection from "@/components/features/sections/HeroSection";
import ContactSection from "@/components/features/sections/ContactSection";
import FooterSection from "@/components/features/sections/FooterSection";
import SkillsSection from "@/components/features/sections/SkillsSection";
import TextSection from "@/components/features/sections/TextSection";
import TimelineSection from "@/components/features/sections/TimelineSection";
import ChatSection from "@/components/features/sections/ChatSection";
import PortfolioSection from "@/components/features/sections/PortfolioSection";
import BlurryParticles from "@/components/ui/particles/BlurryParticles";
import WaveStyleSeparator from "@/components/ui/SectionSeparator/WaveStyleSeparator";
import GradientStyleSeparator from "@/components/ui/SectionSeparator/GradientStyleSeparator";
import getHomepageData from "@/lib/cms/getHomepageData";


export default async function HomePage() {
    const {
        sections,
        projects
    } = await getHomepageData();

    return (
        <div className="bg-background min-h-screen">
            <Header
                title={sections.headerTitle}
                navLinks={[
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
                className={"text-font-light-1"}
                title={sections.heroSectionTitle}
                description={sections.heroSectionDescription}
            />

            < GradientStyleSeparator
                bgClassName={"bg-gradient-to-b from-main-3/10 to-main-4"}
            />


            < TextSection
                id="about"
                className="bg-main-4 text-font-dark-1"
                title={sections.textSectionTitle}
                text={sections.textSectionTitle}
            />

            < GradientStyleSeparator
                bgClassName={"bg-gradient-to-b from-main-4 to-main-5/60"}
                height={44}
            />


            < ChatSection
                id="chat"
                className="bg-main-5"
                title={sections.chatSectionTitle}
            />


            < WaveStyleSeparator
                nextBackground={"fill-main-5"}
                height={70}
                flipY={true}
                flipX={true}
                className={"bg-gradient-to-t from-main-5/80 to-main-5/0 "}
                shape={"M0,32L80,69.3C160,107,320,181,480,186.7C640,192,800,128,960,128C1120,128,1280,192,1360,224L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"}
            />

            <SkillsSection
                id="skills"
                title={sections.skillsSectionTitle}
                className="text-font-light-1 mb-5"
                categories={[
                    {
                        title: "Développement",
                        skills: [
                            {
                                name: "Python",
                                description: "Python est un langage de programmation polyvalent et puissant, largement utilisé pour le développement web, l'analyse de données, l'intelligence artificielle, l'automatisation et bien plus encore."
                            },
                            {
                                name: "React",
                                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae convallis purus, at laoreet turpis. Fusce congue pretium lacus, cursus tempus velit fermentum eget. Nulla condimentum turpis eros, pellentesque vehicula tellus aliquet ut. Donec a justo nec ante facilisis feugiat. Ut volutpat blandit sodales. Donec ultricies rhoncus mollis. Vestibulum eget pulvinar mauris. Vivamus ultrices ac tellus ut eleifend. Etiam maximus orci non sodales porttitor. Maecenas id pharetra risus. Curabitur rutrum egestas dapibus. Nam a sagittis lectus. Vestibulum tincidunt mi sem, ac tristique justo euismod non. Etiam quis facilisis erat, et varius orci. Proin efficitur nulla elit, sed viverra elit gravida eget. Aliquam quis lectus non diam tincidunt vehicula quis vitae erat."
                            },
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
                title={sections.timelineSectionTitle}
                className="bg-main-5"
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
                title={sections.portfolioSectionTitle}
                className={"bg-gradient-to-b from-main-1 via-main-2 to-main-3 text-font-dark-1"}
                projects={projects ?? []}
            />


            <ContactSection
                id="contact"
                title={sections.contactSectionTitle}
                className={"bg-main-5"}
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
                className={"bg-main-3"}
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