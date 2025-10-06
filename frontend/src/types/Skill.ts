/**
 * Represents a single skill.
 */
export type Skill = {
    /** Name of the skill (e.g., "JavaScript", "React") */
    name: string;

    /** Short description of the skill */
    description: string;
};

/**
 * Represents a category of skills, grouping related skills together.
 */
export type SkillCategory = {
    /** The title of the skill category (e.g., "Frontend", "Backend") */
    title: string;

    /** List of skills belonging to this category */
    skills: Skill[];
};
