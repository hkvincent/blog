export interface SiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLinks: {
    twitter: string;
    youtube: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "Explorer",
  description:
    "A minimal and lovely travel blog which shares experiences and citiest around the world!",
  currentlyAt: "Budapest",
  socialLinks: {
    twitter: "https://github.com/hkvincent",
    youtube: "https://github.com/hkvincent",
    github: "https://github.com/hkvincent",
    linkedin: "https://github.com/hkvincent",
    instagram: "https://github.com/hkvincent",
  },
};

export default siteConfig;
