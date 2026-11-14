import { AuthorHero } from '../components/landing/AuthorHero'
import { BlogArchive } from '../components/landing/BlogArchive'
import { AUTHOR, BLOG_POSTS } from '../data/landing'

export function LandingPage() {
  return (
    <>
      <AuthorHero author={AUTHOR} />
      <BlogArchive posts={BLOG_POSTS} />
    </>
  )
}
