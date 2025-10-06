import {Hero} from "@/types/cms/singles/Hero";
import {Project} from "@/types/cms/components/Project";


export type HomepageData = {
  hero: Hero;
  projects?: Project[];
};