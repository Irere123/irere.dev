interface AboutMeSlide {
  title?: string;
  info: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const ABOUT_ME_SLIDES: AboutMeSlide[] = [
  {
    title: 'Few things about me.',
    info: "I'm a high school student.",
  },
  {
    info: 'I started coding at the age of 12',
  },
  {
    info: 'Most of the roles that I have done are remote',
  },
  {
    info: 'I like watching Anime, Sci-Fi, and Thrillers',
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'Mentor AI',
    description: 'An AI-powered workspace for codebase based mentoring.',
    image: '/images/mentor.png',
    link: 'https://example.com',
  },
  {
    title: 'Codecrawl',
    description: 'Turn your codebase into a knowledge base.',
    image: '/images/mentor.png',
    link: 'https://example.com',
  },
  {
    title: 'ShipFree',
    description: 'Open source alternative to ShipFast.',
    image: '/images/mentor.png',
    link: 'https://example.com',
  },
  {
    title: 'Relaunch',
    description: 'Showcase your projects to the public.',
    image: '/images/mentor.png',
    link: 'https://example.com',
  },
];
