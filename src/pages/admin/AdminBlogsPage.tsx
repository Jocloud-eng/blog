import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useNavigate } from '../../navigation/RouterContext'
import { PATHS } from '../../navigation/paths'

export function AdminBlogsPage() {
  const navigate = useNavigate()
  const blogs = useQuery(api.blogs.listAllBlogs)

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground">
          Articles &amp; Essays
        </h1>
        <Button
          type="button"
          onClick={() => navigate(PATHS.ADMIN_BLOG_CREATE)}
          className="self-start px-4 py-2 text-xs font-medium shadow-2xs sm:self-auto"
        >
          <Plus aria-hidden="true" className="size-3.5" />
          <span>Create New Blog</span>
        </Button>
      </div>

      <div className="mt-6">
        {blogs === undefined ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : blogs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No blogs yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {blogs.map((blog) => (
              <li key={blog._id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{blog.title}</p>
                  <p className="text-xs text-muted-foreground">{blog.category} · {blog.status} · {blog.subscriptionMode}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
