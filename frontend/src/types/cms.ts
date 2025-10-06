import type { PortfolioCardProps } from "@/components/features/sections/portfolio/PortfolioCard";


export type Hero = {
  title: string;
  description: string;
};



export type Project = PortfolioCardProps;


export type HomepageData = {
  hero: Hero;
  projects?: Project[];
};