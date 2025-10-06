"use client";
import Section, { SectionProps } from "@/components/ui/layout/Section";
import Carousel from "@/components/ui/carousel/Carousel";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {SkillCategory} from "@/types/Skill";

/**
 * Props for the SkillsSection component.
 */
interface SkillSectionProps extends SectionProps {
    /** Section title */
    title: string;

    /** Array of skill categories */
    categories: Array<SkillCategory>;
}

/**
 * SkillsSection Component
 *
 * Displays multiple skill categories as a horizontal carousel.
 * Users can navigate between categories using buttons or the category tabs.
 */
export default function SkillsSection({ title, categories, ...sectionProps }: SkillSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeCategory = categories[activeIndex];

    // Navigate to previous category (wrap around)
    const prevCategory = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
    };

    // Navigate to next category (wrap around)
    const nextCategory = () => {
        setActiveIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Section {...sectionProps}>
            <div className="pt-16 overflow-hidden">
                <h2 className="text-5xl font-bold mb-15 text-center justify-center">{title}</h2>

                {/* Category navigation buttons */}
                <div className="flex items-center justify-center">
                    <button
                        onClick={prevCategory}
                        className="p-2 text-button-light-1 hover:text-button-light-accent transition-colors duration-200 hover:cursor-pointer"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Category tabs */}
                    <div className="flex space-x-4 mx-8">
                        {categories.map((category, index) => (
                            <button
                                key={category.title}
                                onClick={() => setActiveIndex(index)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${
                                    index === activeIndex
                                        ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-font-light-1 shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={nextCategory}
                        className="p-2 text-button-light-1 hover:text-button-light-accent transition-colors duration-200 hover:cursor-pointer"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Carousel displaying active category skills */}
                <div className="mb-12">
                    <Carousel cards={activeCategory.skills} />
                </div>
            </div>
        </Section>
    );
}
