"use client";
import Section, {SectionProps} from "@/components/ui/layout/Section";
import Carousel from "@/components/ui/carousel/Carousel";
import {useRef, useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
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
export default function SkillsSection({title, categories, ...sectionProps}: SkillSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeCategory = categories[activeIndex];

    const scrollContainerRef = useRef<HTMLDivElement | null>(null)
    const categoryButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const scrollToActiveCategory = (index: number) => {
        const button = categoryButtonRefs.current[index];
        const container = scrollContainerRef.current;
        if (button && container) {
            button.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    };

    // Navigate to previous category (wrap around)
    const prevCategory = () => {
        setActiveIndex((prevIndex) => {
            const newIndex = prevIndex === 0 ? categories.length - 1 : prevIndex - 1;
            scrollToActiveCategory(newIndex);
            return newIndex;
        });
    };

    // Navigate to next category (wrap around)
    const nextCategory = () => {
        setActiveIndex((prevIndex) => {
            const newIndex = prevIndex === categories.length - 1 ? 0 : prevIndex + 1;
            scrollToActiveCategory(newIndex);
            return newIndex;
        });
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
                        <ChevronLeft size={24}/>
                    </button>

                    {/* Category tabs */}
                    <div
                        className="flex space-x-4 mx-1 px-2 sm:mx-6 overflow-x-auto overflow-y-hidden scrollbar-hide"
                        ref={scrollContainerRef}
                    >
                        {categories.map((category, index) => (
                            <button
                                key={category.title}
                                ref={(el) => {
                                    categoryButtonRefs.current[index] = el;
                                }}
                                onClick={() => setActiveIndex(index)}
                                className={`px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:cursor-pointer whitespace-nowrap ${
                                    index === activeIndex
                                        ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-md scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                        <ChevronRight size={24}/>
                    </button>
                </div>

                {/* Carousel displaying active category skills */}
                <div className="mb-12">
                    <Carousel cards={activeCategory.skills}/>
                </div>
            </div>
        </Section>
    );
}
