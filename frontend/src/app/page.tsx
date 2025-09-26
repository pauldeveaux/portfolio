'use client';

import Header from "@/components/features/Header";
import HeroSection from "@/components/features/sections/HeroSection";
import ContactSection from "@/components/features/sections/ContactSection";
import FooterSection from "@/components/features/sections/FooterSection";
import SkillsSection from "@/components/features/sections/SkillsSection";


export default function HomePage() {
    return (
      <div className="bg-background min-h-screen">
        <Header title={"Paul Deveaux"} navLinks={[
            {"label": "Compétences", "href": "Test"},
            {"label": "Expérience", "href": "Test"},
            {"label": "Formation", "href": "Test"},
            {"label": "Portfolio", "href": "Test"},
            {"label": "Contact", "href": "Test"},
            {"label": "A propos", "href": "Test"},
        ]}
        />

          <HeroSection
              id={"hero"}
              className={"bg-gradient-to-tl from-primary via-primary-60 to-secondary-background"}
              height={`calc(100vh - 82px)`}
              title={"Paul Deveaux"}
              description={"Développeur IA - Junior | Passionné par l'innovation technologique et la création de solutions intelligentes."}
          />


          <SkillsSection
              id="competences"
              className={"bg-gradient-to-tr from-secondary-background via-primary to-primary-60"}
              title={"Compétences"} categories={[
              { title: "Développement",
                  skills: [
                      {name: "Python", description:"Python est un langage de programmation polyvalent et puissant, largement utilisé pour le développement web, l'analyse de données, l'intelligence artificielle, l'automatisation et bien plus encore."},
                      {name: "React", description:"desc"},
                      {name: "Next.JS", description:"desc"},
                  ]
              },
              { title: "IA",
                  skills: [
                      {name: "IA", description:"Test test"},
                      {name: "Langchain", description:"desc"},
                      {name: "RAG", description:"desc"},
                  ]
              },
            ]}
          />



          <ContactSection
              title={"Contactez-moi"}
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
                className={"bg-radial from-background to-secondary-background"}
                height={"65vh"}
          />


          <FooterSection
              className={"bg-primary-60"}
              navLinks={[
                {"label": "hero", "href": "hero"},
                {"label": "Compétences", "href": "competences"},
                {"label": "Expérience", "href": "Test"},
                {"label": "Formation", "href": "Test"},
          ]}/>
      </div>
  );
}