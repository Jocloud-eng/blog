import React, { useState } from 'react';
import {
  Lock,
  ArrowLeft,
  Share2,
  Bookmark,
  Clock,
  Calendar,
  Check,
  ShieldCheck,
  Smartphone,
  Zap,
  AlertCircle,
  Copy
} from 'lucide-react';
import { useLocation, Link } from '../navigation/RouterContext';
import { PATHS } from '../navigation/paths';
import KewodaImg from '../assets/kewoda-joanitah.jpeg';

// --- Types ---

export interface BlogArticleData {
  id: string;
  badgeType: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  subtitle: string;
  heroImage: {
    url: string;
    caption: string;
    credit: string;
  };
  author: {
    name: string;
    role: string;
    publication: string;
    avatarUrl: string;
  };
  dropCapLetter: string;
  leadParagraph: string;
  bodyParagraphs: string[];
  pullQuote: {
    quote: string;
    attribution: string;
  };
  blurredParagraphs: string[];
  fullParagraphs: string[];
  paywall: {
    title: string;
    description: string;
    currency: string;
    amount: string;
  };
}

// --- Article Data for each blog post ---

const ARTICLE_1: BlogArticleData = {
  id: "clean-code-practice",
  badgeType: "Subscriber Exclusive",
  category: "Software Engineering",
  readTime: "8 min read",
  date: "Oct 24, 2026",
  title: "Clean Code in Practice: Writing Software Your Teammates Can Read",
  subtitle: "Clear names, small functions, and honest comments: the everyday habits that turn code that merely works into code a team can review, maintain, and extend.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    caption: "A developer reviewing clean, readable source code",
    credit: "Photo by Ilya Pavlov on Unsplash"
  },
  author: {
    name: "Kewoda Joanitah",
    role: "Final-year student, Makerere University",
    publication: "The Tech Report",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
  },
  dropCapLetter: "C",
  leadParagraph: "lean code is not about clever tricks or rigid rules; it is about making the next person who reads your code understand your intent without having to reverse-engineer it. The habits that matter most are small and unglamorous: names that say what a thing is, functions that do one thing, comments that explain why rather than what.",
  bodyParagraphs: [
    "When a teammate opens a pull request, they should be able to follow the logic top to bottom without pausing to decode abbreviations or guess at side effects. That readability compounds over time: code that is easy to read is easy to change, and code that is easy to change is code that survives."
  ],
  pullQuote: {
    quote: "Code is read far more often than it is written.",
    attribution: "Robert C. Martin, Clean Code"
  },
  blurredParagraphs: [
    "Small functions are the single highest-leverage habit. When a function fits on a screen and does exactly one thing, you can name it honestly and test it in isolation...",
    "Honest comments earn their place by explaining intent and constraints, not by restating the code. Remove comments that merely narrate; keep the ones that warn."
  ],
  fullParagraphs: [
    "Small functions are the single highest-leverage habit. When a function fits on a screen and does exactly one thing, you can name it honestly and test it in isolation. The cognitive load of reading a short, well-named function is trivial, while a long function forces the reader to hold too much state in their head.",
    "Honest comments earn their place by explaining intent and constraints, not by restating the code. Remove comments that merely narrate; keep the ones that warn about non-obvious invariants, performance cliffs, or historical decisions that are not visible in the code.",
    "Refactoring toward readability is not a one-time event but a continuous practice. Each pull request is an opportunity to leave the code a little clearer than you found it, and those small improvements compound into a codebase the whole team can trust.",
    "Tests and readable code reinforce each other: code that is easy to read is easy to test, and code that is well tested can be refactored with confidence. Together they form the foundation of software that survives beyond its original author."
  ],
  paywall: {
    title: "Support Independent Writing & Unlock Full Essay",
    description: "Access this complete deep-dive, annotated code samples, and full essay with instant Mobile Money authorization.",
    currency: "UGX",
    amount: "10,000"
  }
};

const ARTICLE_2: BlogArticleData = {
  id: "react-tailwind-responsive",
  badgeType: "Free Read",
  category: "Web Development",
  readTime: "5 min read",
  date: "Nov 02, 2026",
  title: "Building Responsive Interfaces with React and Tailwind CSS",
  subtitle: "A practical walkthrough of components, layout, and utility classes for interfaces that hold up on every screen, from budget phones to wide desktop monitors.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    caption: "A laptop showing a responsive web interface under construction",
    credit: "Photo by Christopher Gower on Unsplash"
  },
  author: {
    name: "Kewoda Joanitah",
    role: "Final-year student, Makerere University",
    publication: "The Tech Report",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
  },
  dropCapLetter: "R",
  leadParagraph: "esponsive design is less about breakpoints and more about building components that flex gracefully. With React and Tailwind CSS, you can compose small, reusable pieces that adapt to their container instead of hard-coding layouts for specific screen sizes.",
  bodyParagraphs: [
    "Start mobile-first: lay out the smallest screen, then enhance with responsive prefixes. Tailwind's utility classes keep styles co-located with markup, which makes it easy to see how a component behaves at every width.",
    "Flexbox and grid utilities handle most layouts without custom CSS. Use container queries when a component must respond to its own width rather than the viewport.",
    "Keep components small and prop-driven so the same markup renders correctly across breakpoints without conditional rendering spaghetti."
  ],
  pullQuote: {
    quote: "Design for the smallest screen first, then let the layout grow.",
    attribution: "Mobile-first responsive design"
  },
  blurredParagraphs: [
    "Accessibility must be part of responsiveness: ensure tap targets are large enough, text remains readable, and focus states are visible on every screen size.",
    "Test on real devices and slow networks, not just resized browser windows, because performance and touch behavior differ from desktop assumptions.",
    "Finally, document component variants and responsive behavior so the team can reuse patterns confidently instead of rebuilding layouts from scratch.",
    "Pair Tailwind with a consistent design token strategy so spacing, color, and typography stay aligned across marketing pages and app shells.",
    "Leverage React suspense and lazy loading for heavy widgets so initial render stays fast even on entry-level Android devices common in our market.",
    "Measure real user metrics such as LCP and CLS, then iterate on the slowest templates before adding new features.",
    "Keep the component library versioned and reviewed, treating UI primitives like any other dependency with changelogs and migration notes."
  ],
  fullParagraphs: [
    "Responsive design is less about breakpoints and more about building components that flex gracefully. With React and Tailwind CSS, you can compose small, reusable pieces that adapt to their container instead of hard-coding layouts for specific screen sizes.",
    "Start mobile-first: lay out the smallest screen, then enhance with responsive prefixes. Tailwind's utility classes keep styles co-located with markup, which makes it easy to see how a component behaves at every width.",
    "Flexbox and grid utilities handle most layouts without custom CSS. Use container queries when a component must respond to its own width rather than the viewport.",
    "Keep components small and prop-driven so the same markup renders correctly across breakpoints without conditional rendering spaghetti.",
    "Accessibility must be part of responsiveness: ensure tap targets are large enough, text remains readable, and focus states are visible on every screen size.",
    "Test on real devices and slow networks, not just resized browser windows, because performance and touch behavior differ from desktop assumptions.",
    "Finally, document component variants and responsive behavior so the team can reuse patterns confidently instead of rebuilding layouts from scratch."
  ],
  paywall: {
    title: "Support Independent Writing",
    description: "This post is free to read. If you found it useful, a small contribution keeps the blog going.",
    currency: "UGX",
    amount: "0"
  }
};

const ARTICLE_3: BlogArticleData = {
  id: "domain-driven-design",
  badgeType: "Subscriber Exclusive",
  category: "Software Engineering",
  readTime: "12 min read",
  date: "Nov 14, 2026",
  title: "Domain-Driven Design: Modelling Software Around the Business",
  subtitle: "How ubiquitous language, bounded contexts, and aggregates help you shape code around the real problem domain instead of around database tables and frameworks.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    caption: "A team modelling a business domain on a whiteboard",
    credit: "Photo by Austin Distel on Unsplash"
  },
  author: {
    name: "Kewoda Joanitah",
    role: "Final-year student, Makerere University",
    publication: "The Tech Report",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
  },
  dropCapLetter: "D",
  leadParagraph: "omain-driven design starts with language. When developers and domain experts share a ubiquitous language, the code begins to mirror the business instead of fighting it. Bounded contexts keep models honest by acknowledging that the same word can mean different things in different parts of a system.",
  bodyParagraphs: [
    "Aggregates protect invariants by defining consistency boundaries: changes inside an aggregate must leave it valid, and references across aggregates go through identities rather than direct object links."
  ],
  pullQuote: {
    quote: "The heart of software is its ability to solve domain-related problems for its user.",
    attribution: "Eric Evans, Domain-Driven Design"
  },
  blurredParagraphs: [
    "Start by listening to how experts talk. Names in code should be names in conversation; if a term only exists in the database schema, it is probably the wrong model...",
    "Keep bounded contexts small and explicit. Integration between contexts should be deliberate, through well-defined contracts rather than shared tables."
  ],
  fullParagraphs: [
    "Domain-driven design starts with language. When developers and domain experts share a ubiquitous language, the code begins to mirror the business instead of fighting it. Bounded contexts keep models honest by acknowledging that the same word can mean different things in different parts of a system.",
    "Aggregates protect invariants by defining consistency boundaries: changes inside an aggregate must leave it valid, and references across aggregates go through identities rather than direct object links.",
    "Start by listening to how experts talk. Names in code should be names in conversation; if a term only exists in the database schema, it is probably the wrong model.",
    "Keep bounded contexts small and explicit. Integration between contexts should be deliberate, through well-defined contracts rather than shared tables.",
    "Over time, a well-modelled domain becomes a shared map of the business that developers and experts can navigate together, making change safer and new features faster to deliver."
  ],
  paywall: {
    title: "Support Independent Writing & Unlock Full Essay",
    description: "Access this complete deep-dive, model diagrams, and full essay with instant Mobile Money authorization.",
    currency: "UGX",
    amount: "5,000"
  }
};

const ARTICLES: Record<string, BlogArticleData> = {
  [PATHS.BLOG_DETAILS]: ARTICLE_1,
  [PATHS.BLOG_DETAILS_2]: ARTICLE_2,
  [PATHS.BLOG_DETAILS_3]: ARTICLE_3,
};

// --- Subcomponents ---

export const ArticleHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-3 text-neutral-800 hover:text-neutral-900 transition-colors group"
        >
          <div className="w-8 h-8 rounded bg-[#2563eb] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            TR
          </div>
          <div>
            <span className="text-xs font-semibold tracking-tight text-neutral-900 block leading-tight font-sans">
              The Tech Report <span className="text-[9px] align-super text-neutral-400 font-normal">™</span>
            </span>
            <span className="text-[10px] text-neutral-400 block leading-none">
              Notes on Technology, Architecture & Culture
            </span>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Archive</span>
          </a>
          <button
            aria-label="Share article"
            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            aria-label="Bookmark article"
            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export const MobileMoneyPaywallCard: React.FC<{ paywall: BlogArticleData['paywall']; onUnlock?: () => void }> = ({ paywall, onUnlock }) => {
  const [tab, setTab] = useState<'new' | 'restore'>('new');
  const [network, setNetwork] = useState<'mtn' | 'airtel'>('mtn');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onUnlock?.();
    }, 1500);
  };

  return (
    <div className="relative mt-8 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 sm:p-8 max-w-xl mx-auto overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-blue-50/60 blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center mb-3 shadow-xs">
          <Lock className="w-5 h-5" />
        </div>

        <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 tracking-tight font-normal leading-snug">
          {paywall.title}
        </h3>

        <p className="text-xs text-neutral-500 mt-2 max-w-md leading-relaxed">
          {paywall.description}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50/80 border border-amber-200/60 text-xs">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-700">
            One-Time Reader Contribution
          </span>
          <span className="font-semibold text-amber-900">
            {paywall.currency} {paywall.amount}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 p-1 bg-neutral-100 rounded-lg text-xs font-medium mb-6">
        <button
          type="button"
          onClick={() => setTab('new')}
          className={`py-1.5 rounded-md transition-all ${
            tab === 'new'
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          New Access (Mobile Money)
        </button>
        <button
          type="button"
          onClick={() => setTab('restore')}
          className={`py-1.5 rounded-md transition-all ${
            tab === 'restore'
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Returning Reader (Restore)
        </button>
      </div>

      {tab === 'new' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="font-semibold uppercase tracking-wider text-neutral-500">
                Select Mobile Money Network
              </span>
              <span className="text-amber-600 flex items-center gap-1 font-mono text-[10px]">
                <Zap className="w-3 h-3" /> Instant USSD push
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setNetwork('mtn')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  network === 'mtn'
                    ? 'border-[#2563eb] bg-blue-50/50 text-blue-900 shadow-xs'
                    : 'border-neutral-200 bg-neutral-50/60 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500" />
                <span>MTN MoMo</span>
              </button>

              <button
                type="button"
                onClick={() => setNetwork('airtel')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  network === 'airtel'
                    ? 'border-[#2563eb] bg-blue-50/50 text-blue-900 shadow-xs'
                    : 'border-neutral-200 bg-neutral-50/60 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-600" />
                <span>Airtel Money</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Your Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@domain.com"
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 focus:outline-hidden focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-neutral-400 bg-neutral-50/40"
              />
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">
              Used to securely associate and restore your lifetime reading pass.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Mobile Money Phone Number
            </label>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden bg-neutral-50/40 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <span className="px-3 py-2 text-xs text-neutral-600 bg-neutral-100 border-r border-neutral-200 flex items-center font-mono">
                +256 (UG)
              </span>
              <div className="flex items-center flex-1 px-2.5">
                <Smartphone className="w-3.5 h-3.5 text-neutral-400 mr-2 shrink-0" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="77 123 4567"
                  className="w-full py-2 text-xs bg-transparent focus:outline-hidden font-mono placeholder:text-neutral-400 text-neutral-900"
                />
              </div>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">
              Direct authorization; standard network tariffs apply.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || submitted}
            className="w-full py-2.5 px-4 rounded-lg bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-70 mt-2"
          >
            {isSubmitting ? (
              <span>Authorizing Push...</span>
            ) : submitted ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>USSD Prompt Sent! Check Your Device</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Pay via Mobile Money &amp; Read Now</span>
              </>
            )}
          </button>

          <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/50 flex items-start gap-2.5 text-[11px] text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-amber-950">Instant Handset Prompt:</span> After clicking, a secure USSD pop-up will appear immediately on your device. Enter your secret Mobile Money PIN to approve the transaction.
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Registered Email
            </label>
            <input
              type="email"
              placeholder="reader@domain.com"
              className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 focus:outline-hidden focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 bg-neutral-50/40"
            />
          </div>
          <button
            type="button"
            className="w-full py-2.5 px-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            Send Magic Access Link
          </button>
          <p className="text-[11px] text-center text-neutral-400">
            We will email you a secure link to restore all previously unlocked monographs.
          </p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-neutral-400">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 100% direct creator funding
        </span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-neutral-400" /> 256-bit TLS
        </span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-neutral-400" /> Instant Settlement
        </span>
      </div>
    </div>
  );
};

// --- Main Blog Detail Page Component ---

export function BlogDetailsPage(): React.ReactElement {
  const [copiedLink, setCopiedLink] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const { pathname } = useLocation();
  const article = ARTICLES[pathname] ?? ARTICLES[PATHS.BLOG_DETAILS];
  const isFree = article.badgeType === 'Free Read' || article.paywall.amount === '0';
  const isUnlocked = isFree || unlocked;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#fafaf9] text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <main className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        <div className="mb-6">
          <Link
            to={PATHS.LANDING}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to landing page</span>
          </Link>
        </div>
        <article>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/60">
                <Lock className="w-2.5 h-2.5" />
                {article.badgeType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-[#2563eb] border border-blue-200/60">
                {article.category}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-900 leading-[1.18] tracking-tight font-normal mb-5">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 font-serif leading-relaxed mb-8">
            {article.subtitle}
          </p>

          <figure className="mb-8">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs">
              <img
                src={article.heroImage.url}
                alt={article.heroImage.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-[11px] text-neutral-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 align-middle" />
              {article.heroImage.caption} · {article.heroImage.credit}
            </figcaption>
          </figure>

          <div className="flex items-center justify-between p-4 mb-10 rounded-xl bg-neutral-100/70 border border-neutral-200/60">
            <div className="flex items-center gap-3">
              <div className="relative aspect-4/5 w-12 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
                <img
                  src={KewodaImg}
                  alt={article.author.name}
                  className="size-full object-contain object-center"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900">
                  {article.author.name}
                </p>
                <p className="text-[11px] text-neutral-500">
                  {article.author.role} · {article.author.publication}
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs"
            >
              <Copy className="w-3 h-3 text-neutral-400" />
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>

          <div className="prose prose-neutral max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-6">
            <p className="leading-relaxed">
              <span className="float-left text-5xl sm:text-6xl font-serif text-[#2563eb] leading-[0.8] pr-2 pt-1 font-normal">
                {article.dropCapLetter}
              </span>
              {article.leadParagraph}
            </p>

            {article.bodyParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            <div className="my-8 p-6 sm:p-8 rounded-2xl bg-blue-50/50 border-l-4 border-[#2563eb]">
              <blockquote className="text-lg sm:text-xl font-serif italic text-blue-900 font-normal leading-snug">
                “{article.pullQuote.quote}”
              </blockquote>
              <cite className="block mt-3 text-xs uppercase tracking-wider font-sans font-semibold text-neutral-500 not-italic">
                — {article.pullQuote.attribution}
              </cite>
            </div>

            {isUnlocked ? (
              <div className="space-y-4">
                {article.fullParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <div className="relative">
                <div className="space-y-4 filter blur-[2px] opacity-40 select-none pointer-events-none">
                  {article.blurredParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#fafaf9] via-[#fafaf9]/80 to-transparent pointer-events-none" />
              </div>
            )}
          </div>

          {!isUnlocked && <MobileMoneyPaywallCard paywall={article.paywall} onUnlock={() => setUnlocked(true)} />}
        </article>
      </main>
    </div>
  );
}
