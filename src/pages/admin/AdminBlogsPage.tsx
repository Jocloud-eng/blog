import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useNavigate } from '../../navigation/RouterContext'
import { PATHS } from '../../navigation/paths'

export function AdminBlogsPage() {
  const navigate = useNavigate()
  const blogs = useQuery(api.blogs.listAllBlogs) ?? []

  const all = blogs.length
  const published = blogs.filter((b) => b.status === 'published').length
  const drafts = blogs.filter((b) => b.status === 'draft').length
  const archived = 0

  const fmtDate = (ts: number) =>
    new Date(ts).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

  const accessLabel = (b: (typeof blogs)[number]) =>
    b.subscriptionMode === 'free' ? 'Free' : `${b.price.currency} ${b.price.amount.toLocaleString('en-US')}`

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

      <div className="mt-6 flex gap-6 text-sm">
        <div><span className="font-semibold text-foreground">{all}</span> <span className="text-muted-foreground">All</span></div>
        <div><span className="font-semibold text-foreground">{published}</span> <span className="text-muted-foreground">Published</span></div>
        <div><span className="font-semibold text-foreground">{drafts}</span> <span className="text-muted-foreground">Drafts</span></div>
        <div><span className="font-semibold text-foreground">{archived}</span> <span className="text-muted-foreground">Archived</span></div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="py-2 pr-4 font-medium">Post</th>
              <th className="py-2 pr-4 font-medium">Category</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 pr-4 font-medium">Access</th>
              <th className="py-2 pr-4 font-medium">Updated</th>
              <th className="py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b border-border">
                <td className="py-3 pr-4">
                  <p className="font-medium text-foreground">{blog.title}</p>
                  <p className="text-xs text-muted-foreground">{blog.slug} · {blog.readTime}</p>
                </td>
                <td className="py-3 pr-4 text-muted-foreground">{blog.category}</td>
                <td className="py-3 pr-4 text-muted-foreground">{blog.status}</td>
                <td className="py-3 pr-4 text-muted-foreground">{accessLabel(blog)}</td>
                <td className="py-3 pr-4 text-muted-foreground">{fmtDate(blog.updatedAt)}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button type="button" className="text-muted-foreground hover:text-foreground"><Pencil className="size-3.5" /></button>
                    <button type="button" className="text-muted-foreground hover:text-foreground"><Trash2 className="size-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
