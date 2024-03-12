This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Directory
V app
    V api
        V tasks
            V[id]
                route.ts
            route.ts
    V completed (subpage file)
        page.tsx
    V Components (code for styling pages and components)
        > Button
        V Models
            CreateContent.tsx
        V Sidebar
            Sidebar.tsx
        V TaskItem
            TaskItem.tsx (function and CSS for individual task containers)
        V Task
            Task.tsx (function and CSS for main task container)
    V Context (themes and wrappers for ?)
        gloablProvider.js (wrapper to apply useEffect hook)
        theme.js (variables for themes(colors, borders, shadows, and more similar))
    V important (subpage file)
        page.tsx
    V incomplete
        page.tsx
    V Providers (wrappers for pages)
        ContextProvider.tsx (useEffect hook)
        GlobalStylesProvider.tsx (container CSS)
    V signin (clerk sign in page wrapper)
        page.tsx
    V signup (clerk sign up page wrapper)
        page.tsx
    V Utils 
        connect.ts (logic to connect to DB)
        icons.js (links to icon images font-awesome)
        menu.js (title and path for navbar items)
    favicon.ico
    globals.css
    layout.tsx (server component for html organizing wrappers and components)
    page.tsx (main entry point/build phase)
V prisma 
    > migrations
    schema.prisma
V public
    DungeonMaster.jpg
.env (DB login info)
.env.local (clerk login and redirect info)
middleware.ts (clerk page route protection and authentication)# joy-of-coding-internship-solo-project
