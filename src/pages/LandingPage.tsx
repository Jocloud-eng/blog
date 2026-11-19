import { useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { AuthorHero } from '../components/landing/AuthorHero';
import { BlogArchive } from '../components/landing/BlogArchive';
import { AUTHOR } from '../data/landing';
import type { BlogPost } from '../data/landing';

export function LandingPage() {
  const blogs = useQuery(api.blogs.listPublishedBlogs);
  const seedBlogs = useMutation(api.blogs.seedBlogs);
  useEffect(() => {
    seedBlogs().catch(() => {});
  }, [seedBlogs]);
  const posts: BlogPost[] = (blogs ?? []).map((blog) => ({
    id: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    category: blog.category as BlogPost['category'],
    pricing:
      blog.subscriptionMode === 'free'
        ? { kind: 'free' }
        : { kind: 'paid', currency: blog.price.currency, amount: blog.price.amount },
    publishedAt: new Date(blog._creationTime).toISOString().slice(0, 10),
    readTimeMinutes: parseInt(blog.readTime, 10) || 0,
    imageUrl: blog.coverImageUrl ?? '',
  }));

  return (
    <>
      <AuthorHero author={AUTHOR} />
      <BlogArchive posts={posts} />
    </>
  );
}