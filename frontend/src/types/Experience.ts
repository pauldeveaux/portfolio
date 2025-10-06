import {LucideIcon} from "lucide-react";


export type ExperienceType = "School" | "Graduate" | "Internship" | "Work" | "Final";


export interface Experience {
    title: string;
    subtitle: string;
    text: string;
    type: ExperienceType;
    date: string;
    tag?: string;
    tagIcon?: LucideIcon;
    subtags?: Array<string>;
}