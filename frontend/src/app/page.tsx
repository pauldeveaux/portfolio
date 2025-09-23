'use client';

import { useState } from "react";

import Header from "@/components/features/Header";
import Section from "@/components/ui/Section";
import TitleSection from "@/components/features/sections/variants/TitleSection";


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



          </Section>
      </div>
  );
}