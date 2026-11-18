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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Clean Code in Practice: Writing Software Your Teammates Can Read',
    excerpt:
      'Clear names, small functions, and honest comments: the everyday habits that turn code that merely works into code a team can review, maintain, and extend.',
    category: 'Software Engineering',
    pricing: { kind: 'paid', currency: 'UGX', amount: 10000 },
    publishedAt: '2026-10-24',
    readTimeMinutes: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'Building Responsive Interfaces with React and Tailwind CSS',
    excerpt:
      'A practical walkthrough of components, layout, and utility classes for interfaces that hold up on every screen, from budget phones to wide desktop monitors.',
    category: 'Web Development',
    pricing: { kind: 'free' },
    publishedAt: '2026-11-02',
    readTimeMinutes: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'Domain-Driven Design: Modelling Software Around the Business',
    excerpt:
      'How ubiquitous language, bounded contexts, and aggregates help you shape code around the real problem domain instead of around database tables and frameworks.',
    category: 'Software Engineering',
    pricing: { kind: 'paid', currency: 'UGX', amount: 5000 },
    publishedAt: '2026-11-14',
    readTimeMinutes: 12,
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
  },
]
