import { Project } from "@/types/cms/components";
import {HomepageSectionsData} from "@/types/cms/singles/HomepageSectionsData";

/**
 * Represents all data needed to render the homepage.
 */
export type HomepageData = {
  sections: HomepageSectionsData;



  /** Optional list of projects for the portfolio section */
  projects?: Project[];
};
