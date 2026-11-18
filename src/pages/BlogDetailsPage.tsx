import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Link } from '../navigation/RouterContext';
import { PATHS } from '../navigation/paths';
import KewodaImg from '../assets/kewoda-joanitah.jpeg';
import { MobileMoneyPaywallCard } from '../components/MobileMoneyPaywallCard';
import { Lock, ArrowLeft, Copy, Clock, Calendar } from 'lucide-react';

export function BlogDetailsPage(): React.ReactElement {
  const slug = new URLSearchParams(window.location.search).get('slug') ?? '';
  const blogBySlug = useQuery(api.blogs.getBlogBySlug, slug ? { slug } : 'skip');
  const published = useQuery(api.blogs.listPublishedBlogs);
  const blog = slug ? blogBySlug : published?.[0];

  const [copiedLink, setCopiedLink] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (blog === undefined) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-neutral-500">
        Loading article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-neutral-500">
        Article not found.
      </div>
    );
  }

  const isPaid = blog.subscriptionMode !== 'free' && blog.price.amount > 0;
  const isUnlocked = !isPaid || unlocked;
  const date = new Date(blog._creationTime).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="flex-1 bg-[#fafaf9] text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <main className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        <div className="mb-6">
          <Link to={PATHS.LANDING} className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to landing page</span>
          </Link>
        </div>
        <article>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/60">
                <Lock className="w-2.5 h-2.5" />
                {isPaid ? 'Subscriber Exclusive' : 'Free Read'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-[#2563eb] border border-blue-200/60">
                {blog.category}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{blog.readTime}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{date}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-900 leading-[1.18] tracking-tight font-normal mb-5">
            {blog.title}
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-serif leading-relaxed mb-8">
            {blog.subtitle}
          </p>

          {blog.coverImageUrl && (
            <figure className="mb-8">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs">
                <img src={blog.coverImageUrl} alt={blog.coverImageData.alt} className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-center text-[11px] text-neutral-400">
                {blog.coverImageData.caption}
              </figcaption>
            </figure>
          )}

          <div className="flex items-center justify-between p-4 mb-10 rounded-xl bg-neutral-100/70 border border-neutral-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 aspect-4/5 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
                <img src={KewodaImg} alt={blog.author?.name ?? 'Author'} className="size-full object-contain object-center" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900">{blog.author?.name ?? 'Kewoda Joanitah'}</p>
                <p className="text-[11px] text-neutral-500">{blog.author?.role ?? ''}</p>
              </div>
            </div>
            <button onClick={handleCopyLink} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs">
              <Copy className="w-3 h-3 text-neutral-400" />
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>

          <div className="prose prose-neutral max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-6">
            <p className="leading-relaxed">{blog.excerpt}</p>
            {isUnlocked ? (
              <div dangerouslySetInnerHTML={{ __html: blog.fullContentHtml }} />
            ) : (
              <div className="relative min-h-[320px]">
                <div className="filter blur-[2px] opacity-40 select-none pointer-events-none" dangerouslySetInnerHTML={{ __html: blog.previewContentHtml }} />
                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#fafaf9] via-[#fafaf9]/80 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6">
                  <MobileMoneyPaywallCard
                    paywall={{
                      title: 'Support Independent Writing & Unlock Full Essay',
                      description: blog.excerpt,
                      currency: blog.price.currency,
                      amount: String(blog.price.amount),
                    }}
                    onUnlock={() => setUnlocked(true)}
                  />
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}