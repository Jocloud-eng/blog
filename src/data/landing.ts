import authorPhoto from '../assets/kewoda-joanitah.jpeg'

export const BLOG_CATEGORIES = ['Software Engineering', 'Web Development', 'Technology', 'Architecture', 'Culture'] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export type BlogPricing =
  | { kind: 'free' }
  | { kind: 'paid'; currency: string; amount: number }

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: BlogCategory
  pricing: BlogPricing
  /** ISO date (YYYY-MM-DD) */
  publishedAt: string
  readTimeMinutes: number
  imageUrl: string
}

export interface ContactInfo {
  email: string
  phone: string
  whatsappUrl: string
  linkedinUrl: string
}

export interface AuthorProfile {
  name: string
  role: string
  focusTitle: string
  focusTitleItalic: string
  focusTitleEnd: string
  bioParagraphs: string[]
  contact: ContactInfo
  avatarUrl: string
}

export const AUTHOR: AuthorProfile = {
  name: 'Kewoda Joanitah',
  role: 'Final-year student at Makerere University · Aspiring Software Engineer',
  focusTitle: 'Learning in public: notes on ',
  focusTitleItalic: 'software engineering',
  focusTitleEnd: ', from clean code and the modern web to domain-driven design.',
  bioParagraphs: [
    'I am Kewoda Joanitah, a final-year student at Makerere University working toward a career as a software engineer. The Tech Report is where I learn in public—writing about clean code, modern web development, and domain-driven design as I grow my skills.',
    'Each post is something I have studied, built, or wrestled with, written up plainly so that fellow students and early-career developers can learn alongside me. Many posts are free, and paid deep-dives help keep the blog going. Questions, corrections, and collaboration are always welcome—reach me through any of the links below.',
  ],
  contact: {
    email: 'kewodajoanitah02@gmail.com',
    phone: '+256 748 149 321',
    whatsappUrl: 'https://wa.me/256748149321',
    linkedinUrl: 'https://www.linkedin.com/in/kewoda-joanitah-629036369',
  },
  avatarUrl: authorPhoto,
}


