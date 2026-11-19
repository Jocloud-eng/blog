import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Lock, Clock, Calendar, Copy } from 'lucide-react';
import { Link } from '../navigation/RouterContext';
import { PATHS } from '../navigation/paths';
import { MobileMoneyPaywallCard } from '../components/MobileMoneyPaywallCard';
import { CLEAN_CODE_HTML } from '../data/cleanCodeContent';
import { REACT_TAILWIND_HTML } from '../data/reactTailwindContent';
import { DDD_HTML } from '../data/dddContent';

function getSlugFromUrl(): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('slug') ?? '';
}

export function BlogDetailsPage(): React.ReactElement {
  const [copiedLink, setCopiedLink] = useState(false);
  const slug = getSlugFromUrl();

  const blog = useQuery(api.blogs.getBlogBySlug, slug ? { slug } : 'skip');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-600">
        No blog selected. <Link to={PATHS.LANDING} className="ml-2 text-[#2563eb]">Back to home</Link>
      </div>
    );
  }

  if (blog === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-600">
        Loading…
      </div>
    );
  }

  if (blog === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-600">
        Blog not found. <Link to={PATHS.LANDING} className="ml-2 text-[#2563eb]">Back to home</Link>
      </div>
    );
  }

  const isPaid = blog.subscriptionMode !== 'free' && blog.slug !== 'clean-code-practice';
  const badgeType = isPaid ? 'Subscriber Exclusive' : 'Free Read';
  const date = new Date(blog.updatedAt || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  const contentHtml =
    blog.slug === 'clean-code-practice'
      ? CLEAN_CODE_HTML
      : blog.slug === 'react-tailwind-responsive'
      ? REACT_TAILWIND_HTML
      : blog.slug === 'domain-driven-design'
      ? DDD_HTML
      : blog.fullContentHtml || blog.previewContentHtml || '';

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between">
      <main className="max-w-3xl mx-auto px-6 pt-10 pb-12 lg:pt-14 lg:pb-12 w-full flex-1">
        <article>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              {isPaid && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/60">
                  <Lock className="w-2.5 h-2.5" /> {badgeType}
                </span>
              )}
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
          {blog.subtitle && (
            <p className="text-base sm:text-lg text-neutral-600 font-serif leading-relaxed mb-8">
              {blog.subtitle}
            </p>
          )}

          {blog.coverImageUrl && (
            <figure className="mb-8">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs">
                <img src={blog.coverImageUrl} alt={blog.coverImageData?.alt ?? blog.title} className="w-full h-full object-cover" />
              </div>
              {blog.coverImageData?.caption && (
                <figcaption className="mt-3 text-center text-[11px] text-neutral-400">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 align-middle" />
                  {blog.coverImageData.caption}
                </figcaption>
              )}
            </figure>
          )}

          <div className="flex items-center justify-between p-4 mb-10 rounded-xl bg-neutral-100/70 border border-neutral-200/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-xs">
                {(blog.author?.name ?? 'KJ').split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900">{blog.author?.name ?? 'Kewoda Joanitah'}</p>
                <p className="text-[11px] text-neutral-500">{blog.author?.role ?? 'Author'} · The Tech Report</p>
              </div>
            </div>
            <button type="button" onClick={handleCopyLink} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer">
              <Copy className="w-3 h-3 text-neutral-400" />
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>

          {isPaid && contentHtml.includes('<p><strong>2.') ? (
            <>
              <div className="prose prose-neutral max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: contentHtml.split('<p><strong>2.')[0] }} />
              <div className="prose prose-neutral max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-6 filter blur-[3px] opacity-50 select-none pointer-events-none" dangerouslySetInnerHTML={{ __html: '<p><strong>2.' + contentHtml.split('<p><strong>2.')[1] }} />
            </>
          ) : (
            <div className="prose prose-neutral max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          )}

          {isPaid && (
            <div className="mt-8">
              <MobileMoneyPaywallCard
                paywall={{
                  title: 'Support Independent Writing & Unlock Full Essay',
                  description: 'Access the complete article with instant Mobile Money authorization.',
                  currency: blog.price.currency,
                  amount: blog.price.amount.toLocaleString('en-US'),
                }}
              />
            </div>
          )}

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Talks Inspired by This Blog</h2>
            <ul className="list-disc list-inside text-neutral-600 space-y-2">
              <li><strong>{blog.title}</strong> – A talk exploring the concepts presented in this article.</li>
            </ul>
          </section>
        </article>
      </main>

    </div>
  );
}

export default BlogDetailsPage;
