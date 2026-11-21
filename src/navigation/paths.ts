import { FileText, ReceiptText, Users, type LucideIcon } from 'lucide-react'

export const PATHS = {
  LANDING: '/',
  BLOG_DETAILS: '/blog',
  BLOG_DETAILS_2: '/blog2',
  BLOG_DETAILS_3: '/blog3',
  ADMIN: '/admin',
  ADMIN_BLOGS: '/admin/blogs',
  ADMIN_BLOG_CREATE: '/admin/blogs/create',
  ADMIN_TRANSACTIONS: '/admin/transactions',
  ADMIN_USERS: '/admin/users',
} as const

/** Every fixed route. */
export type StaticPath = (typeof PATHS)[keyof typeof PATHS]

/** A single post: `/blog/<slug>`. */
export type BlogPostPath = `${typeof PATHS.BLOG_DETAILS}/${string}`

export type AppPath = StaticPath | BlogPostPath

/** Build a post URL. Use this instead of concatenating strings: `<Link to={blogPostPath(post.slug)}>`. */
export function blogPostPath(slug: string): BlogPostPath {
  return `${PATHS.BLOG_DETAILS}/${encodeURIComponent(slug)}`
}

/** `/blog/my-post` -> `my-post`. Returns null for `/blog`, `/blog/a/b`, or anything else. */
export function parseBlogSlug(pathname: string): string | null {
  const prefix = `${PATHS.BLOG_DETAILS}/`
  if (!pathname.startsWith(prefix)) return null

  const raw = pathname.slice(prefix.length)
  if (!raw || raw.includes('/')) return null

  try {
    return decodeURIComponent(raw)
  } catch {
    return null // malformed %-sequence
  }
}

export interface AdminNavItem {
  label: string
  path: AppPath
  icon: LucideIcon
}

export const ADMIN_NAV_ITEMS: readonly AdminNavItem[] = [
  {
    label: 'Blogs',
    path: PATHS.ADMIN_BLOGS,
    icon: FileText,
  },
  {
    label: 'Transactions',
    path: PATHS.ADMIN_TRANSACTIONS,
    icon: ReceiptText,
  },
  {
    label: 'Users',
    path: PATHS.ADMIN_USERS,
    icon: Users,
  },
] as const