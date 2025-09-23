'use client';

import { useState } from "react";

import Header from "@/components/features/Header";
import TitleSection from "@/components/features/sections/variants/TitleSection";
import ContactSection from "@/components/features/sections/variants/ContactSection";


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

          <TitleSection
              bgColor={"bg-gradient-to-tr from-background to-secondary-background"}
              height={`calc(100vh - 82px)`}
              title={"Paul Deveaux"}
              description={"Développeur Full Stack | Passionné par la création de solutions web innovantes et performantes."}
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
                height={"60vh"}
          />
      </div>
  );
}