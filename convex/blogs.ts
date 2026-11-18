import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const blogCategoryValidator = v.union(
  v.literal("Software Engineering"),
  v.literal("Web Development"),
  v.literal("Technology"),
  v.literal("Architecture"),
  v.literal("Culture")
);

const blogStatusValidator = v.union(v.literal("draft"), v.literal("published"));

const subscriptionModeValidator = v.union(
  v.literal("free"),
  v.literal("paid"),
  v.literal("subscription")
);

const priceValidator = v.object({
  amount: v.number(),
  currency: v.string(),
});

const coverImageDataValidator = v.object({
  alt: v.string(),
  caption: v.string(),
  fileName: v.optional(v.string()),
  fileSize: v.optional(v.number()),
  dimensions: v.optional(v.string()),
});

const authorValidator = v.optional(
  v.object({
    id: v.string(),
    name: v.string(),
    role: v.string(),
  })
);

export const listPublishedBlogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("blogs")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .take(50);
  },
});

export const listAllBlogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogs").order("desc").take(100);
  },
});

export const getBlogBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const seedBlogs = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("blogs").take(1);
    if (existing.length > 0) return "already seeded";

    const posts = [
      {
        slug: "clean-code-practice",
        title: "Clean Code in Practice: Writing Software Your Teammates Can Read",
        subtitle: "Clear names, small functions, and honest comments: the everyday habits that turn code that merely works into code a team can review, maintain, and extend.",
        excerpt: "Clear names, small functions, and honest comments: the everyday habits that turn code that merely works into code a team can review, maintain, and extend.",
        previewContentHtml: "<p>Lean code is not about clever tricks or rigid rules...</p>",
        fullContentHtml: "<p>Lean code is not about clever tricks or rigid rules; it is about making the next person who reads your code understand your intent without having to reverse-engineer it.</p><p>When a teammate opens a pull request, they should be able to follow the logic top to bottom without pausing to decode abbreviations or guess at side effects.</p>",
        category: "Software Engineering" as const,
        tags: ["clean-code", "software-engineering"],
        readTime: "8 min read",
        wordCount: 120,
        status: "published" as const,
        subscriptionMode: "paid" as const,
        price: { amount: 10000, currency: "UGX" },
        coverImageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
        coverImageData: { alt: "A developer reviewing clean, readable source code", caption: "A developer reviewing clean, readable source code" },
        author: { id: "admin", name: "Kewoda Joanitah", role: "Final-year student, Makerere University" },
        updatedAt: Date.now(),
      },
      {
        slug: "react-tailwind-responsive",
        title: "Building Responsive Interfaces with React and Tailwind CSS",
        subtitle: "A practical walkthrough of components, layout, and utility classes for interfaces that hold up on every screen, from budget phones to wide desktop monitors.",
        excerpt: "A practical walkthrough of components, layout, and utility classes for interfaces that hold up on every screen, from budget phones to wide desktop monitors.",
        previewContentHtml: "<p>Responsive design is less about breakpoints...</p>",
        fullContentHtml: "<p>Responsive design is less about breakpoints and more about building components that flex gracefully.</p><p>Start mobile-first: lay out the smallest screen, then enhance with responsive prefixes.</p>",
        category: "Web Development" as const,
        tags: ["react", "tailwind", "responsive"],
        readTime: "5 min read",
        wordCount: 90,
        status: "published" as const,
        subscriptionMode: "free" as const,
        price: { amount: 0, currency: "UGX" },
        coverImageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        coverImageData: { alt: "A laptop showing a responsive web interface under construction", caption: "A laptop showing a responsive web interface under construction" },
        author: { id: "admin", name: "Kewoda Joanitah", role: "Final-year student, Makerere University" },
        updatedAt: Date.now(),
      },
      {
        slug: "domain-driven-design",
        title: "Domain-Driven Design: Modelling Software Around the Business",
        subtitle: "How ubiquitous language, bounded contexts, and aggregates help you shape code around the real problem domain instead of around database tables and frameworks.",
        excerpt: "How ubiquitous language, bounded contexts, and aggregates help you shape code around the real problem domain instead of around database tables and frameworks.",
        previewContentHtml: "<p>Domain-driven design starts with language...</p>",
        fullContentHtml: "<p>Domain-driven design starts with language. When developers and domain experts share a ubiquitous language, the code begins to mirror the business instead of fighting it.</p><p>Aggregates protect invariants by defining consistency boundaries.</p>",
        category: "Software Engineering" as const,
        tags: ["ddd", "architecture"],
        readTime: "12 min read",
        wordCount: 110,
        status: "published" as const,
        subscriptionMode: "paid" as const,
        price: { amount: 5000, currency: "UGX" },
        coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        coverImageData: { alt: "A team modelling a business domain on a whiteboard", caption: "A team modelling a business domain on a whiteboard" },
        author: { id: "admin", name: "Kewoda Joanitah", role: "Final-year student, Makerere University" },
        updatedAt: Date.now(),
      },
    ];

    for (const post of posts) {
      await ctx.db.insert("blogs", post as any);
    }
    return "seeded";
  },
});

export const createBlog = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    subtitle: v.string(),
    excerpt: v.string(),
    previewContentHtml: v.string(),
    fullContentHtml: v.string(),
    category: blogCategoryValidator,
    tags: v.optional(v.array(v.string())),
    readTime: v.string(),
    wordCount: v.number(),
    status: blogStatusValidator,
    subscriptionMode: subscriptionModeValidator,
    price: priceValidator,
    coverImageStorageId: v.optional(v.id("_storage")),
    coverImageUrl: v.optional(v.string()),
    coverImageData: coverImageDataValidator,
    author: authorValidator,
    updatedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique()
      .catch(() => null);
    if (existing) {
      throw new Error("A blog with this slug already exists");
    }
    const id = await ctx.db.insert("blogs", args);
    return id;
  },
});