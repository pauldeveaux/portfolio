'use client';

import { useState } from "react";

import Header from "@/components/features/Header";
import Section from "@/components/ui/Section";


export default function HomePage() {
    const [headerHeight, setHeaderHeight] = useState(0);

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
        onHeightMeasured={setHeaderHeight}
        />

          <Section id={"Main Section"} bgColor={"secondary-background" } height={`calc(100vh - 64px)`} >
              <h1>Test test</h1>
          </Section>

          <Section id={"Main Section"} bgColor={"background"} >


          </Section>
      </div>
  );
}