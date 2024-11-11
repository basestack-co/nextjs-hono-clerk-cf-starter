# Next.js Project on Cloudflare Pages + Hono API + Clerk

This is a Next.js project deployed on Cloudflare Pages, leveraging Cloudflare Workers and other Cloudflare services for
high-performance serverless deployment.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 22.x)
- [NPM](https://npmjs.com/) (or yarn if preferred)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Environment Variables

The following environment variables are required to run this project. Make sure to create a `.env` file in the root
directory of the project:

```plaintext
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## Running Locally

To start the development server:

```bash
# Install dependencies
npm install

# Run the Next.js development server
npm run dev
```

To run the project with the `wrangler pages dev` command (serving on a specific port):

```bash
npm run preview
```

This will start the app at `http://localhost:3000`.

## Deploying to Cloudflare Pages

### Using Wrangler

To deploy this project to Cloudflare Pages, use the following command:

```bash
npm run deploy:local
```

### Setting Up Automatic Deployments

Alternatively, you can set up automatic deployments by linking your GitHub repository to Cloudflare Pages and enabling
automatic builds in the Cloudflare dashboard.

## Database Migrations

This project uses Prisma + D1 Migrations for database migrations. To create a new migration, run the following
command:

```bash
npm run db:migrate:create --db_name=prisma-demo-db --file_name=create_user_table
npm run db:migrate:generate  --migration_file_name=0001_create_user_table.sql
npm run db:migrate:apply:local --db_name=prisma-demo-db
npm run prisma:generate
```
