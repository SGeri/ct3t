## Setting up this template

### Adding Database Connection URL

Add the DATABASE_URL environment variable to the `.env` file in the root directory. You can use the `.env.example` file as a reference.

### Adding Clerk API Keys

Add the Clerk API keys to the `.env` file in the root directory. You can again use the `.env.example` file as a reference.
Both NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY are required in order to use Clerk.

### Before first-start

Run `npm run db:push` to push the Prisma schema to your database.

### Development

Run `npm run dev` to start the development server.
