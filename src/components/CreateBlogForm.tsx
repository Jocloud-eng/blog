import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate } from '../navigation/RouterContext';
import { PATHS } from '../navigation/paths';
import { z } from 'zod';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@editorcn/editor';
import '@editorcn/editor/style.css';

const blogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  subtitle: z.string().min(3, 'Subtitle must be at least 3 characters'),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  category: z.enum(['Software Engineering', 'Web Development', 'Technology', 'Architecture', 'Culture']),
  tags: z.string().optional(),
  readTime: z.string().min(1, 'Read time is required'),
  status: z.enum(['draft', 'published']),
  subscriptionMode: z.enum(['free', 'paid', 'subscription']),
  priceAmount: z.coerce.number().min(0, 'Price must be 0 or greater'),
  priceCurrency: z.string().min(1, 'Currency is required'),
  coverImageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  coverAlt: z.string().min(1, 'Cover alt text is required'),
  coverCaption: z.string().min(1, 'Cover caption is required'),
});

type FormValues = z.infer<typeof blogSchema>;

export const CreateBlogForm: React.FC = () => {
  const navigate = useNavigate();
  const createBlog = useMutation(api.blogs.createBlog);
  const [values, setValues] = useState<FormValues>({
    title: '',
    subtitle: '',
    slug: '',
    excerpt: '',
    category: 'Software Engineering',
    tags: '',
    readTime: '5 min read',
    status: 'draft',
    subscriptionMode: 'free',
    priceAmount: 0,
    priceCurrency: 'UGX',
    coverImageUrl: '',
    coverAlt: '',
    coverCaption: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your blog post here...</p>',
    immediatelyRender: false,
  });

  const handleChange = (field: keyof FormValues, value: string | number) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const result = blogSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormValues;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    const fullContentHtml = editor?.getHTML() ?? '';
    const wordCount = fullContentHtml.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    const tags = values.tags ? values.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

    try {
      setSubmitting(true);
      await createBlog({
        slug: values.slug,
        title: values.title,
        subtitle: values.subtitle,
        excerpt: values.excerpt,
        previewContentHtml: values.excerpt,
        fullContentHtml,
        category: values.category,
        tags,
        readTime: values.readTime,
        wordCount,
        status: values.status,
        subscriptionMode: values.subscriptionMode,
        price: { amount: values.priceAmount, currency: values.priceCurrency },
        coverImageUrl: values.coverImageUrl || undefined,
        coverImageData: {
          alt: values.coverAlt,
          caption: values.coverCaption,
        },
        author: {
          id: 'admin',
          name: 'Kewoda Joanitah',
          role: 'Final-year student, Makerere University',
        },
        updatedAt: Date.now(),
      });
      navigate(PATHS.ADMIN_BLOGS);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create blog');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Title</label>
          <input value={values.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
          {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Slug</label>
          <input value={values.slug} onChange={(e) => handleChange('slug', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
          {errors.slug && <p className="text-xs text-red-600 mt-1">{errors.slug}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Subtitle</label>
        <input value={values.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
        {errors.subtitle && <p className="text-xs text-red-600 mt-1">{errors.subtitle}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Excerpt</label>
        <textarea value={values.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} rows={3} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
        {errors.excerpt && <p className="text-xs text-red-600 mt-1">{errors.excerpt}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Category</label>
          <select value={values.category} onChange={(e) => handleChange('category', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200">
            <option>Software Engineering</option>
            <option>Web Development</option>
            <option>Technology</option>
            <option>Architecture</option>
            <option>Culture</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Read Time</label>
          <input value={values.readTime} onChange={(e) => handleChange('readTime', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
          {errors.readTime && <p className="text-xs text-red-600 mt-1">{errors.readTime}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Tags (comma separated)</label>
          <input value={values.tags} onChange={(e) => handleChange('tags', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Status</label>
          <select value={values.status} onChange={(e) => handleChange('status', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Subscription Mode</label>
          <select value={values.subscriptionMode} onChange={(e) => handleChange('subscriptionMode', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200">
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="subscription">Subscription</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Price</label>
            <input type="number" value={values.priceAmount} onChange={(e) => handleChange('priceAmount', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
            {errors.priceAmount && <p className="text-xs text-red-600 mt-1">{errors.priceAmount}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Currency</label>
            <input value={values.priceCurrency} onChange={(e) => handleChange('priceCurrency', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Cover Image URL</label>
          <input value={values.coverImageUrl} onChange={(e) => handleChange('coverImageUrl', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
          {errors.coverImageUrl && <p className="text-xs text-red-600 mt-1">{errors.coverImageUrl}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Cover Alt</label>
          <input value={values.coverAlt} onChange={(e) => handleChange('coverAlt', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
          {errors.coverAlt && <p className="text-xs text-red-600 mt-1">{errors.coverAlt}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Cover Caption</label>
          <input value={values.coverCaption} onChange={(e) => handleChange('coverCaption', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200" />
          {errors.coverCaption && <p className="text-xs text-red-600 mt-1">{errors.coverCaption}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Blog Body</label>
        <RichTextEditor editor={editor} className="min-h-[300px] rounded-lg border border-neutral-200">
          <RichTextEditor.Toolbar>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Blockquote />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content className="min-h-[240px] px-3 py-2" />
        </RichTextEditor>
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 text-sm font-medium text-white bg-[#2563eb] rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? 'Saving...' : 'Create Blog'}
        </button>
        <button
          type="button"
          onClick={() => navigate(PATHS.ADMIN_BLOGS)}
          className="px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};