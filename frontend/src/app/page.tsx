'use client';

import { useState } from "react";

import Header from "@/components/features/Header";


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

      </div>
  );
}