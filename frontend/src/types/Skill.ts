



/**
 * Represents a Skill
 */
export type Skill = {
    name: string;
    description: string;
};


export type SkillCategory = {
    title: string;
    skills: Skill[];
}