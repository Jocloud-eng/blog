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