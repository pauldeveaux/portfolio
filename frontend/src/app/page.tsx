'use client';

import Header from "@/components/features/Header";
import HeroSection from "@/components/features/sections/HeroSection";
import ContactSection from "@/components/features/sections/ContactSection";
import CopyrightSection from "@/components/features/sections/CopyrightSection";
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
              bgColor={"bg-gradient-to-tl from-primary via-primary-60 to-secondary-background"}
              height={`calc(100vh - 82px)`}
              title={"Paul Deveaux"}
              description={"Développeur Full Stack | Passionné par la création de solutions web innovantes et performantes."}
          />


          <SkillsSection
              bgColor={"bg-gradient-to-tr from-secondary-background via-primary to-primary-60"}
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
                      {name: "IA", description:", l'automatisation et bien plus encore."},
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
                        image_url: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
                        text: "paul.deveaux1@gmail.com",
                        link: "mailto:paul.deveaux1@gmail.com"
                    },
                    {
                        social_media: "linkedin",
                        image_url: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
                        text: "linkedin.com/in/paul-deveaux",
                        link: "https://www.linkedin.com/in/paul-deveaux-7a731a202/"
                    },
                    {
                        social_media: "linkedi",
                        image_url: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
                        text: "linkedin.com/in/paul-deveaux",
                        link: "https://www.linkedin.com/in/paul-deveaux-7a731a202/"
                    }
                ]}
                bgColor={"bg-radial from-background to-secondary-background"}
                height={"65vh"}
          />


          <CopyrightSection/>
      </div>
  );
}