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
        fullContentHtml: "<p><strong>Introduction</strong></p><p>Writing software is not just about making a program work. It is also about making sure that other developers can understand, maintain, and improve the software without struggling to figure out what the original programmer intended.</p><p>Imagine joining a software development team and opening a project containing hundreds of lines of poorly organized information, unclear names, and confusing instructions. Even if the software works perfectly, understanding and modifying it could become a difficult task.</p><p>This is where Clean Code becomes important.</p><p>Clean code is the practice of writing software that is simple, readable, organized, and easy to maintain. It focuses on making code understandable not only to computers but also to the people who work with it.</p><p><strong>1. Why Clean Code Matters</strong></p><p>In professional software development, code is rarely written by just one person. Developers collaborate, review each other&#x27;s work, fix bugs, and introduce new features.</p><p>Clean code makes this collaboration easier because it allows developers to understand how a system works without spending too much time interpreting complicated structures.</p><p>It improves readability, makes maintenance easier, reduces the chances of introducing errors, and encourages better teamwork. It also helps reduce technical debt by preventing unnecessary complexity from accumulating in a software project.</p><p>Ultimately, clean code saves development time and improves software quality.</p><p><strong>2. Use Meaningful Names</strong></p><p>One of the simplest ways to improve code readability is by choosing meaningful names for variables, functions, and other elements.</p><p>Developers should use names that clearly describe the purpose of an element. For example, a name such as &quot;customerDetails&quot; is more meaningful than a short, unclear name.</p><p>Meaningful naming helps teammates understand the purpose of different parts of a software project without having to investigate every detail.</p><p>A good rule is to choose names that explain what something represents or what it does.</p><p><strong>3. Keep Functions Small and Focused</strong></p><p>Functions should ideally perform one clearly defined task.</p><p>When functions become too complicated or handle too many responsibilities, they become difficult to understand, test, and maintain.</p><p>For example, a user registration process may involve validating information, saving user details, sending confirmation emails, and generating reports.</p><p>Instead of combining all these responsibilities into one large function, developers should organize them into smaller, focused operations.</p><p>This makes the software easier to understand, troubleshoot, and improve.</p><p><strong>4. Avoid Unnecessary Comments</strong></p><p>Comments are useful when they explain something important, such as a complex business rule or an unusual technical decision.</p><p>However, documentation should not replace clear and understandable software design.</p><p>Developers should aim to make their work self-explanatory through meaningful names, proper organization, and simple structures.</p><p>Comments should provide additional information that cannot easily be understood from the implementation itself.</p><p><strong>5. Follow Consistent Coding Standards</strong></p><p>Consistency is important when multiple developers work on the same project.</p><p>Without shared standards, a software project can become difficult to navigate because different developers may organize information, name elements, and format their work differently.</p><p>Development teams should establish common guidelines for naming conventions, indentation, spacing, file organization, error handling, documentation, and general project structure.</p><p>Following consistent standards makes a project easier to read, understand, and maintain. It also ensures that developers can work together without constantly adjusting to different coding styles.</p><p><strong>6. Avoid Repeating Yourself (DRY Principle)</strong></p><p>DRY stands for Don&#x27;t Repeat Yourself.</p><p>It is a software development principle that encourages developers to avoid unnecessarily repeating the same logic or functionality in different parts of an application.</p><p>Instead, developers should identify opportunities to create reusable components and processes.</p><p>This makes software easier to update because changes can be managed in one place rather than across multiple sections.</p><p>However, reuse should improve clarity rather than introduce unnecessary complexity.</p><p><strong>7. Make Software Easy to Test</strong></p><p>Clean code should also be easy to test.</p><p>When software is organized into smaller components with clearly defined responsibilities, developers can examine individual parts more easily.</p><p>Testing helps identify problems before software reaches users. It also improves reliability and gives development teams confidence when introducing new features or making changes to existing functionality.</p><p>Well-organized software makes it easier to identify the source of errors and ensure that different parts of an application behave as expected.</p><p><strong>8. Make Code Reviews Part of the Process</strong></p><p>Code reviews allow teammates to examine and evaluate work before it becomes part of the main project.</p><p>During a code review, developers assess whether the implementation is understandable, whether each component has a clear responsibility, whether unnecessary repetition exists, and whether the software is easy to test and maintain.</p><p>Code reviews should not only focus on identifying mistakes. They should also encourage knowledge sharing and help the entire team improve its development practices.</p><p>Through regular reviews, developers learn from one another and maintain consistent quality across the project.</p><p><strong>9. Clean Code Is a Team Responsibility</strong></p><p>Writing clean code is not something that should be left to senior developers alone. Every developer has a responsibility to contribute to a readable and maintainable software project.</p><p>Teams can achieve this through communication, shared coding standards, regular code reviews, proper documentation, and continuous improvement.</p><p>Developers should also be willing to revisit confusing sections of existing software and improve them when necessary.</p><p>A clean software project is built through consistent effort, communication, and collaboration.</p><p><strong>Conclusion</strong></p><p>Clean code is more than a programming style. It is a professional responsibility that demonstrates consideration for other developers who will read, maintain, and improve the software.</p><p>Developing software that works is important, but creating software that other people can understand is equally valuable.</p><p>By using meaningful names, creating small and focused functions, avoiding unnecessary repetition, following coding standards, and participating in code reviews, developers can build software that is easier to maintain and improve.</p>",
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
        fullContentHtml: "<p><strong>Introduction</strong></p><p>In today&#x27;s digital world, people access websites and applications using different devices, including smartphones, tablets, laptops, and desktop computers. This means that a website should not only look attractive on a large computer screen but should also provide a smooth and enjoyable experience on smaller screens.</p><p>This is where Responsive Web Design becomes important.</p><p>Responsive web design is an approach to building websites that automatically adjust their layout, content, and appearance according to the screen size and device being used.</p><p>Two powerful technologies that make this process easier are React and Tailwind CSS. React helps developers build interactive user interfaces using reusable components, while Tailwind CSS provides utility classes that make styling and responsive layouts faster and more manageable.</p><p>When used together, these technologies allow developers to create modern, flexible, and user-friendly web applications.</p><p><strong>1. Understanding Responsive Web Design</strong></p><p>Responsive web design focuses on creating websites that adapt to different screen sizes without compromising usability or appearance.</p><p>A responsive website should display its content properly whether someone is accessing it through a small smartphone, a tablet, or a large desktop monitor.</p><p>For example, a navigation menu that appears horizontally on a desktop may change into a collapsible menu on a mobile device. Similarly, a three-column layout may become a single-column layout on smaller screens.</p><p>The main goal is to ensure that users can easily navigate, read content, and interact with a website regardless of the device they are using.</p><p>According to MDN Web Docs, responsive design involves flexible layouts, adaptable images, and media queries that help websites respond to different viewing environments.</p><p>MDN</p><p><strong>2. Why Use React for Building Responsive Interfaces?</strong></p><p>React is a popular JavaScript library used for building interactive user interfaces.</p><p>One of its biggest advantages is its component-based architecture. This allows developers to divide an application into smaller, reusable parts instead of building an entire interface as one large structure.</p><p>For example, a website can have separate components for the navigation bar, header, sidebar, product cards, and footer.</p><p>These components can be reused across different pages, making the application easier to manage and maintain.</p><p>React also makes it easier to create interactive features such as dropdown menus, mobile navigation, search bars, and dynamic content.</p><p>By organizing an application into reusable components, developers can build interfaces that are easier to develop, update, and scale.</p><p>React</p><p><strong>3. Understanding Tailwind CSS</strong></p><p>Tailwind CSS is a utility-first CSS framework that allows developers to style websites directly through predefined utility classes.</p><p>Instead of writing large amounts of custom CSS, developers can use existing classes to control spacing, colors, typography, positioning, borders, and layouts.</p><p>For example, Tailwind provides utilities for creating flexible containers, arranging elements using Flexbox and Grid, and controlling how content appears on different screen sizes.</p><p>One of its greatest advantages is that developers can make styling changes directly within their interface components without constantly switching between multiple files.</p><p>This makes the development process faster and helps maintain consistent designs throughout an application.</p><p><strong>4. Combining React and Tailwind CSS</strong></p><p>React and Tailwind CSS work well together because they solve different but complementary problems.</p><p>React handles the structure, functionality, and interactivity of the user interface, while Tailwind CSS handles its visual appearance and responsive styling.</p><p>For example, when developing an online shopping website, React can manage product information, shopping cart interactions, and navigation. Tailwind CSS can control how product cards are displayed on smartphones, tablets, and desktop computers.</p><p>This combination makes it easier to build applications that are both functional and visually appealing.</p><p>It also encourages developers to create reusable components with consistent styling, improving the overall organization of a project.</p><p><strong>5. Designing with a Mobile-First Approach</strong></p><p>A mobile-first approach means designing and developing a website for smaller screens first before expanding the layout for larger devices.</p><p>This approach is important because many people access websites using smartphones.</p><p>Instead of designing a complicated desktop layout and later trying to squeeze everything onto a mobile screen, developers begin with the essential content and gradually introduce additional layout features as the available screen space increases.</p><p>Tailwind CSS supports this approach through responsive breakpoint prefixes such as sm, md, lg, xl, and 2xl.</p><p>These allow developers to apply different styling rules depending on the screen width.</p><p>Starting with mobile layouts helps developers prioritize important content, improve usability, and create more flexible interfaces.</p><p>Tailwind CSS</p><p><strong>6. Creating Flexible Layouts</strong></p><p>A good responsive interface should be flexible enough to accommodate different screen dimensions.</p><p>Modern web development uses layout techniques such as Flexbox and CSS Grid to organize content effectively.</p><p>Flexbox is useful when arranging elements in a row or column, while CSS Grid is particularly useful for creating more complex layouts involving multiple rows and columns.</p><p>For example, a dashboard may display several information cards in multiple columns on a desktop screen but arrange those cards vertically on a smartphone.</p><p>Developers should also avoid relying too heavily on fixed widths and heights because these can cause content to overflow or become difficult to view on smaller devices.</p><p>Flexible containers, appropriate spacing, and adaptable images help ensure that the interface remains usable across different screen sizes.</p><p><strong>7. Building Reusable UI Components</strong></p><p>Reusable components are an important part of React development.</p><p>Instead of designing every section of a website separately, developers can create components that can be used in multiple locations.</p><p>For example, a website may have a reusable button, navigation bar, card layout, or form component.</p><p>This approach reduces unnecessary duplication and makes it easier to maintain a consistent design.</p><p>When changes are needed, developers can update a reusable component rather than modifying several separate sections of the application.</p><p>Reusable components also make collaboration easier because different developers can work on separate parts of the same project.</p><p><strong>8. Improving User Experience and Accessibility</strong></p><p>A responsive website should not only look good but should also be easy for people to use.</p><p>User experience involves making sure that visitors can navigate a website, access information, and complete tasks without unnecessary difficulty.</p><p>Developers should pay attention to readable font sizes, sufficient color contrast, clear navigation, properly spaced buttons, and accessible form controls.</p><p>Mobile users should also be able to interact with buttons and menus comfortably without accidentally selecting the wrong elements.</p><p>Accessibility is equally important. Images should have meaningful alternative text, interactive elements should support keyboard navigation, and page structures should be understandable to assistive technologies.</p><p>A well-designed interface should provide a positive experience for as many users as possible.</p><p><strong>9. Testing Responsive Interfaces</strong></p><p>Testing is an essential part of building responsive websites.</p><p>A website may appear perfect on a developer&#x27;s computer but have layout problems when viewed on a smartphone or tablet.</p><p>Developers should test their interfaces at different screen sizes to identify issues such as overflowing content, overlapping elements, unreadable text, and poorly positioned navigation menus.</p><p>Browser developer tools can help simulate different device sizes and screen resolutions.</p><p>It is also important to test on actual devices whenever possible because real-world usage can reveal problems that may not appear during desktop testing.</p><p>Regular testing ensures that the website remains functional, accessible, and visually consistent across different devices.</p><p><strong>10. Best Practices for Building Responsive Interfaces</strong></p><p>Building effective responsive interfaces requires more than simply applying different styles to different screen sizes.</p><p>Developers should focus on simplicity, consistency, and usability throughout the development process.</p><p>A good responsive design should prioritize important content, use flexible layouts, maintain consistent spacing, optimize images, and avoid unnecessary visual elements.</p><p>React components should be organized according to their responsibilities, while Tailwind CSS utilities should be applied consistently to maintain a clear design structure.</p><p>Developers should also consider accessibility, performance, and browser compatibility when building modern web applications.</p><p>Following these practices results in interfaces that are easier to maintain and provide better experiences for users.</p><p><strong>Conclusion</strong></p><p>Building responsive interfaces is an essential skill in modern frontend development. As people continue to access websites through different devices, developers must ensure that their applications remain attractive, functional, and easy to use across all screen sizes.</p><p>React provides a powerful way to organize applications into reusable and interactive components, while Tailwind CSS simplifies the process of creating flexible and responsive designs.</p><p>When combined effectively, these technologies help developers build modern web applications that are easier to maintain, scalable, and user-friendly.</p><p>Ultimately, responsive web development is not just about making a website fit on different screens. It is about creating a consistent and enjoyable experience for every user, regardless of the device they choose.</p>",
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
        fullContentHtml: "<p><strong>Introduction</strong></p><p>Building successful software requires more than writing code and choosing the right programming languages. Developers must also understand the business problems that the software is expected to solve.</p><p>Many software projects fail to meet business expectations because developers focus too much on technical implementation without fully understanding the processes, rules, and challenges within the organization.</p><p>This is where Domain-Driven Design (DDD) becomes important.</p><p>Domain-Driven Design is a software development approach that focuses on understanding the business domain and using that understanding to guide the design and development of software.</p><p>Instead of building systems around technical requirements alone, DDD encourages developers to work closely with business experts to create software models that accurately represent real-world business operations.</p><p>The main goal is to ensure that software reflects the language, processes, and needs of the business it serves.</p><p><strong>1. Understanding Domain-Driven Design</strong></p><p>Domain-Driven Design is an approach introduced by Eric Evans that places the business domain at the centre of software development.</p><p>A domain refers to the specific area of knowledge or business activity that a software application is designed to support.</p><p>For example, a banking application operates within the banking domain, while an online shopping platform operates within the e-commerce domain.</p><p>Each domain has its own processes, rules, terminology, and challenges.</p><p>DDD encourages developers to study these business activities before designing the software. By understanding how the business operates, developers can create systems that solve the right problems rather than simply implementing technical features.</p><p>This approach is particularly useful when developing complex applications with many business rules and interconnected processes.</p><p><strong>2. Why Domain-Driven Design Matters</strong></p><p>Software should support business goals rather than force businesses to adjust their operations around poorly designed systems.</p><p>Domain-Driven Design helps bridge the communication gap between software developers and business stakeholders.</p><p>For example, when developing a hospital management system, developers need to understand how patient registration, appointments, medical records, billing, and other processes work.</p><p>Without understanding these activities, developers may create features that do not properly reflect the organization&#x27;s actual needs.</p><p>DDD improves communication, encourages better software organization, reduces misunderstandings, and helps developers focus on the most important business problems.</p><p>It also makes complex systems easier to understand by organizing them around clearly defined business concepts.</p><p><strong>3. Establishing a Ubiquitous Language</strong></p><p>One of the most important concepts in Domain-Driven Design is the Ubiquitous Language.</p><p>This refers to a shared vocabulary used by developers, business experts, and other project stakeholders when discussing the software.</p><p>The purpose is to ensure that everyone understands important business concepts in the same way.</p><p>For example, when developing an online shopping application, terms such as customer, order, payment, delivery, and refund should have clear meanings agreed upon by the development team and business stakeholders.</p><p>These terms should also be reflected in the software design, documentation, and team discussions.</p><p>Using a common language reduces confusion and makes communication more effective.</p><p>It also ensures that the software model remains closely connected to the business processes it represents.</p><p><strong>4. Understanding Bounded Contexts</strong></p><p>As software systems grow, they often become too complex to manage using one large business model.</p><p>Different departments within the same organization may use similar terms but understand them differently depending on their responsibilities.</p><p>Domain-Driven Design addresses this challenge through the concept of Bounded Contexts.</p><p>A bounded context defines a specific boundary within which a particular business model and its terminology have a consistent meaning.</p><p>For example, an e-commerce platform may have separate contexts for customer management, product inventory, order processing, and payment management.</p><p>Although these areas belong to the same application, each has its own responsibilities and business rules.</p><p>Separating them makes the system easier to understand, develop, and maintain.</p><p>It also allows different development teams to work on separate parts of a larger system while maintaining clear boundaries between their responsibilities.</p><p><strong>5. Understanding Entities and Value Objects</strong></p><p>Domain-Driven Design uses different building blocks to represent important business concepts.</p><p>Two important building blocks are Entities and Value Objects.</p><p>An Entity is an object that has a unique identity and continues to exist even when some of its information changes.</p><p>For example, a customer in an online shopping system may change their email address or phone number, but they remain the same customer because their identity is preserved.</p><p>A Value Object, on the other hand, represents something defined by its attributes rather than by a unique identity.</p><p>Examples include money, addresses, dates, and measurements.</p><p>For instance, two money values may represent the same amount and currency, making them equal based on their values rather than separate identities.</p><p>Understanding the difference between these concepts helps developers create more accurate business models and organize software responsibilities effectively.</p><p><strong>6. Understanding Aggregates</strong></p><p>Aggregates are another important concept in Domain-Driven Design.</p><p>An aggregate is a group of related objects that are treated as one unit when managing business rules and maintaining data consistency.</p><p>For example, in an online shopping application, an order may contain order details, quantities, and pricing information.</p><p>These related elements must follow certain business rules to ensure that an order remains valid.</p><p>An aggregate establishes boundaries around these related objects and controls how changes are made.</p><p>The main entry point into an aggregate is called the Aggregate Root. It ensures that business rules are respected when information is updated.</p><p>This approach helps prevent inconsistent data and makes complex business operations easier to manage.</p><p><strong>7. Identifying the Core Business Domain</strong></p><p>Not every part of a business provides the same level of competitive advantage.</p><p>Domain-Driven Design encourages development teams to identify the core domain, which represents the most important business area that differentiates an organization from its competitors.</p><p>For example, in an online learning platform, the core domain might involve course delivery, student learning experiences, and progress tracking.</p><p>Other areas, such as user authentication or general email notifications, may support the main business operations without being the primary source of competitive advantage.</p><p>Identifying the core domain helps organizations prioritize development resources and invest more effort in the software features that provide the greatest business value.</p><p><strong>8. Encouraging Collaboration Between Developers and Business Experts</strong></p><p>Successful Domain-Driven Design depends on strong collaboration between technical and non-technical stakeholders.</p><p>Developers understand programming, software architecture, and system implementation, while business experts understand organizational processes, customer needs, and industry-specific requirements.</p><p>Both perspectives are necessary when designing effective business software.</p><p>Regular discussions help developers understand business rules, clarify requirements, and identify problems that may not be obvious from technical documentation alone.</p><p>This collaboration also allows the software model to evolve as the business changes.</p><p>When developers and business experts work together, the resulting software is more likely to reflect the actual needs of the organization.</p><p><strong>9. Implementing Domain-Driven Design in Real Projects</strong></p><p>Implementing Domain-Driven Design begins with understanding the business problem before selecting technical solutions.</p><p>Development teams should first study the organization&#x27;s operations, identify important business concepts, and understand the relationships between different activities.</p><p>After gaining this understanding, they can establish a shared business vocabulary and identify appropriate boundaries for different parts of the system.</p><p>The team can then create domain models that represent important business rules and responsibilities.</p><p>As development continues, these models should be reviewed and improved through collaboration, testing, and feedback.</p><p>DDD is not a one-time design activity. It is an ongoing process of learning more about the business and improving the software to reflect that understanding.</p><p><strong>10. Challenges of Domain-Driven Design</strong></p><p>Although Domain-Driven Design provides many benefits, implementing it can also present challenges.</p><p>One major challenge is that developers must spend time understanding the business domain before beginning implementation. This may require frequent meetings and discussions with business experts.</p><p>Another challenge is managing complex business terminology, especially when different departments use the same words with different meanings.</p><p>DDD can also introduce additional design and communication effort when a project is divided into multiple bounded contexts.</p><p>Furthermore, applying advanced DDD patterns to simple applications may create unnecessary complexity.</p><p>For this reason, development teams should apply DDD where the complexity of the business domain justifies the additional modeling effort.</p><p><strong>Conclusion</strong></p><p>Domain-Driven Design is an important approach to modern software development because it places business understanding at the centre of the design process.</p><p>Rather than focusing only on programming languages, frameworks, and technical structures, DDD encourages developers to understand the real-world problems that software is intended to solve.</p><p>Through concepts such as Ubiquitous Language, Bounded Contexts, Entities, Value Objects, and Aggregates, developers can create software models that accurately represent business operations.</p><p>Most importantly, Domain-Driven Design strengthens collaboration between developers and business experts, ensuring that technical decisions support organizational goals.</p><p>Ultimately, successful software is not simply software that functions correctly. It is software that understands and supports the business it was created to serve.</p>",
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