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
    // upsert by slug so content updates reflect

    const posts = [
      {
        slug: "clean-code-practice",
        title: "Clean Code in Practice: Writing Software Your Teammates Can Read",
        subtitle: "Clear names, small functions, and honest comments: the everyday habits that turn code that merely works into code a team can review, maintain, and extend.",
        excerpt: "Clear names, small functions, and honest comments: the everyday habits that turn code that merely works into code a team can review, maintain, and extend.",
        previewContentHtml: "<p>Lean code is not about clever tricks or rigid rules...</p>",
        fullContentHtml: "<p><strong>Introduction<br/>Writing software is not just about making a program work. It is also about making sure that other developers can understand, maintain, and improve the software without struggling to figure out what the original programmer intended.</strong></p><p>Imagine joining a software development team and opening a project containing hundreds of lines of poorly organized information, unclear names, and confusing instructions. Even if the software works perfectly, understanding and modifying it could become a difficult task.</p><p>This is where Clean Code becomes important.</p><p>Clean code is the practice of writing software that is simple, readable, organized, and easy to maintain. It focuses on making code understandable not only to computers but also to the people who work with it.</p><p><strong>1. Why Clean Code Matters<br/>In professional software development, code is rarely written by just one person. Developers collaborate, review each other&#x27;s work, fix bugs, and introduce new features.</strong></p><p>Clean code makes this collaboration easier because it allows developers to understand how a system works without spending too much time interpreting complicated structures.</p><p>It improves readability, makes maintenance easier, reduces the chances of introducing errors, and encourages better teamwork. It also helps reduce technical debt by preventing unnecessary complexity from accumulating in a software project.</p><p>Ultimately, clean code saves development time and improves software quality.</p><p><strong>2. Use Meaningful Names<br/>One of the simplest ways to improve code readability is by choosing meaningful names for variables, functions, and other elements.</strong></p><p>Developers should use names that clearly describe the purpose of an element. For example, a name such as &quot;customerDetails&quot; is more meaningful than a short, unclear name.</p><p>Meaningful naming helps teammates understand the purpose of different parts of a software project without having to investigate every detail.</p><p>A good rule is to choose names that explain what something represents or what it does.</p><p><strong>3. Keep Functions Small and Focused<br/>Functions should ideally perform one clearly defined task.</strong></p><p>When functions become too complicated or handle too many responsibilities, they become difficult to understand, test, and maintain.</p><p>For example, a user registration process may involve validating information, saving user details, sending confirmation emails, and generating reports.</p><p>Instead of combining all these responsibilities into one large function, developers should organize them into smaller, focused operations.</p><p>This makes the software easier to understand, troubleshoot, and improve.</p><p><strong>4. Avoid Unnecessary Comments<br/>Comments are useful when they explain something important, such as a complex business rule or an unusual technical decision.</strong></p><p>However, documentation should not replace clear and understandable software design.</p><p>Developers should aim to make their work self-explanatory through meaningful names, proper organization, and simple structures.</p><p>Comments should provide additional information that cannot easily be understood from the implementation itself.</p><p><strong>5. Follow Consistent Coding Standards<br/>Consistency is important when multiple developers work on the same project.</strong></p><p>Without shared standards, a software project can become difficult to navigate because different developers may organize information, name elements, and format their work differently.</p><p>Development teams should establish common guidelines for naming conventions, indentation, spacing, file organization, error handling, documentation, and general project structure.</p><p>Following consistent standards makes a project easier to read, understand, and maintain. It also ensures that developers can work together without constantly adjusting to different coding styles.</p><p><strong>6. Avoid Repeating Yourself (DRY Principle)<br/>DRY stands for Don&#x27;t Repeat Yourself.</strong></p><p>It is a software development principle that encourages developers to avoid unnecessarily repeating the same logic or functionality in different parts of an application.</p><p>Instead, developers should identify opportunities to create reusable components and processes.</p><p>This makes software easier to update because changes can be managed in one place rather than across multiple sections.</p><p>However, reuse should improve clarity rather than introduce unnecessary complexity.</p><p><strong>7. Make Software Easy to Test<br/>Clean code should also be easy to test.</strong></p><p>When software is organized into smaller components with clearly defined responsibilities, developers can examine individual parts more easily.</p><p>Testing helps identify problems before software reaches users. It also improves reliability and gives development teams confidence when introducing new features or making changes to existing functionality.</p><p>Well-organized software makes it easier to identify the source of errors and ensure that different parts of an application behave as expected.</p><p><strong>8. Make Code Reviews Part of the Process<br/>Code reviews allow teammates to examine and evaluate work before it becomes part of the main project.</strong></p><p>During a code review, developers assess whether the implementation is understandable, whether each component has a clear responsibility, whether unnecessary repetition exists, and whether the software is easy to test and maintain.</p><p>Code reviews should not only focus on identifying mistakes. They should also encourage knowledge sharing and help the entire team improve its development practices.</p><p>Through regular reviews, developers learn from one another and maintain consistent quality across the project.</p><p><strong>9. Clean Code Is a Team Responsibility<br/>Writing clean code is not something that should be left to senior developers alone. Every developer has a responsibility to contribute to a readable and maintainable software project.</strong></p><p>Teams can achieve this through communication, shared coding standards, regular code reviews, proper documentation, and continuous improvement.</p><p>Developers should also be willing to revisit confusing sections of existing software and improve them when necessary.</p><p>A clean software project is built through consistent effort, communication, and collaboration.</p><p><strong>Conclusion<br/>Clean code is more than a programming style. It is a professional responsibility that demonstrates consideration for other developers who will read, maintain, and improve the software.</strong></p><p>Developing software that works is important, but creating software that other people can understand is equally valuable.</p><p>By using meaningful names, creating small and focused functions, avoiding unnecessary repetition, following coding standards, and participating in code reviews, developers can build software that is easier to maintain and improve.</p>",
        category: "Software Engineering" as const,
        tags: ["clean-code", "software-engineering"],
        readTime: "10 min read",
        wordCount: 180,
        status: "published" as const,
        subscriptionMode: "free" as const,
        price: { amount: 0, currency: "UGX" },
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
        fullContentHtml: "<p>Responsive design is less about breakpoints and more about building components that flex gracefully.</p><p>Start mobile-first: lay out the smallest screen, then enhance with responsive prefixes.</p><p>Use Tailwind's utility classes to compose layouts that adapt to any viewport without writing custom media queries.</p><p>Test on real devices and budget phones to ensure performance and readability across the full spectrum of screens.</p>",
        category: "Web Development" as const,
        tags: ["react", "tailwind", "responsive", "mobile-first"],
        readTime: "7 min read",
        wordCount: 160,
        status: "published" as const,
        subscriptionMode: "paid" as const,
        price: { amount: 7000, currency: "UGX" },
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
        fullContentHtml: "<p>Domain-driven design starts with language. When developers and domain experts share a ubiquitous language, the code begins to mirror the business instead of fighting it.</p><p>Aggregates protect invariants by defining consistency boundaries.</p><p>Bounded contexts keep models focused and prevent a single tangled domain model from spreading across the system.</p><p>Map contexts explicitly, translate between them with anti-corruption layers, and let each team own its slice of the domain.</p><p>Over time, this alignment reduces friction between software and the business it serves.</p>",
        category: "Software Engineering" as const,
        tags: ["ddd", "architecture"],
        readTime: "14 min read",
        wordCount: 220,
        status: "published" as const,
        subscriptionMode: "free" as const,
        price: { amount: 0, currency: "UGX" },
        coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        coverImageData: { alt: "A team modelling a business domain on a whiteboard", caption: "A team modelling a business domain on a whiteboard" },
        author: { id: "admin", name: "Kewoda Joanitah", role: "Final-year student, Makerere University" },
        updatedAt: Date.now(),
      },
    ];

    for (const post of posts) {
      const existing = await ctx.db
        .query("blogs")
        .withIndex("by_slug", (q) => q.eq("slug", post.slug))
        .unique()
        .catch(() => null);
      if (existing) {
        await ctx.db.patch(existing._id, post as any);
      } else {
        await ctx.db.insert("blogs", post as any);
      }
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