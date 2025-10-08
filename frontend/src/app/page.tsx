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
        skillCategories,
        projects,
        experiences,
        contactLinks
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
                text={sections.textSectionText}
            />

            < GradientStyleSeparator
                bgClassName={"bg-gradient-to-b from-main-4 to-main-5/60"}
                height={44}
            />


            < ChatSection
                id="chat"
                className="bg-main-5"
                title={sections.chatSectionTitle}
                defaultAIMessage={sections.chatSectionDefaultAIMessage}
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
                categories={skillCategories ?? []}
            />

            <TimelineSection
                id="timeline"
                title={sections.timelineSectionTitle}
                className="bg-main-5"
                elements={experiences ?? []}
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
                contacts={contactLinks}
            />


            <FooterSection
                id="footer"
                className={"bg-main-3"}
                license={sections.footerLicense}
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