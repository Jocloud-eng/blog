import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BLOG_CATEGORIES, type BlogCategory, type BlogPost } from '../../data/landing'
import { PATHS } from '../../navigation/paths'

type Filter = 'All' | BlogCategory

const FILTERS: readonly Filter[] = ['All', ...BLOG_CATEGORIES]
const PAGE_SIZE = 3

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
})

const pad = (n: number) => String(n).padStart(2, '0')

const pagerButtonClassName =
  'flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-40'

export function BlogArchive({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [page, setPage] = useState(1)

  const filtered = filter === 'All' ? posts : posts.filter((p) => p.category === filter)
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const selectFilter = (next: Filter) => {
    setFilter(next)
    setPage(1)
  }

  return (
    <section className="border-t border-border py-12">
      <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
            <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              The Tech Report Archive
            </span>
          </div>
          <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground">
            Recent Blogs
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <div
            role="group"
            aria-label="Filter by category"
            className="inline-flex rounded-lg bg-secondary p-1"
          >
            {FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={filter === option}
                onClick={() => selectFilter(option)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-medium transition-all',
                  filter === option
                    ? 'bg-brand text-white shadow-xs'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
              {pad(currentPage)} / {pad(pageCount)}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage <= 1}
                onClick={() => setPage(currentPage - 1)}
                className={pagerButtonClassName}
              >
                <ChevronLeft aria-hidden="true" className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage >= pageCount}
                onClick={() => setPage(currentPage + 1)}
                className={pagerButtonClassName}
              >
                <ChevronRight aria-hidden="true" className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No {filter.toLowerCase()} posts yet.
        </p>
      )}
    </section>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-md">
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <img
          src={post.imageUrl}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground">
              {post.category}
            </span>
            {post.pricing.kind === 'free' ? (
              <span className="rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                Free
              </span>
            ) : (
              <span className="rounded-full border border-amber-200/60 bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
                Paid · {post.pricing.currency} {post.pricing.amount.toLocaleString('en-US')}
              </span>
            )}
          </div>

          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Clock aria-hidden="true" className="size-3.5" />
            <time dateTime={post.publishedAt}>
              {dateFormatter.format(new Date(post.publishedAt))}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readTimeMinutes} min read</span>
          </div>

          <h3 className="mb-2 font-serif text-lg leading-snug font-medium tracking-tight text-foreground transition-colors group-hover:text-brand">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <a
            href={`${PATHS.BLOG_DETAILS}?slug=${encodeURIComponent(post.id)}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand transition-all group-hover:gap-2 after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"
          >
            <span>Read</span>
            <span className="sr-only">: {post.title}</span>
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
