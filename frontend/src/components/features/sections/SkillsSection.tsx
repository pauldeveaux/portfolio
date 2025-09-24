"use client";
import Section, {SectionProps} from "@/components/ui/Section";
import Carousel from "@/components/ui/carousel/Carousel";
import {CarouselCardProps} from "@/components/ui/carousel/CarouselCard";
import {useState} from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface SkillSectionProps extends SectionProps {
    title: string;
    categories: Array<CategoryProps>;
}


interface CategoryProps{
    title: string;
    skills: Array<CarouselCardProps>;
}

export default function SkillsSection({ title,  categories, ...sectionProps }: SkillSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeCategory = categories[activeIndex];

    const prevCategory = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
    }
    const nextCategory = () => {
        setActiveIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
    }

    return (
        <Section {...sectionProps}>
            <div className="pt-16 overflow-hidden">
                <h2 className="text-3xl font-bold mb-8 text-center justify-center">{title}</h2>

                {/* Category Navigation */}
                <div className="flex items-center justify-center mb-12">
                    <button
                        onClick={prevCategory}
                        className="p-2 text-gray-400 hover:text-cyan-600 transition-colors duration-200"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex space-x-4 mx-8">
                        {categories.map((category, index) => (
                            <button
                                key={category.title}
                                onClick={() => setActiveIndex(index)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${
                                    index === activeIndex
                                        ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={nextCategory}
                        className="p-2 text-gray-400 hover:text-cyan-600 transition-colors duration-200"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>


                <div  className="mb-12">
                    < Carousel cards={activeCategory.skills} />
                </div>
            </div>
        </Section>

    );
}
