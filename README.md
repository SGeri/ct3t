# CT3T & Clerk

## Why is this repo different?

This repo is a fork of [T3 Turbo](https://github.com/t3-oss/create-t3-turbo/) and also the [Clerk T3 Implementation](https://github.com/clerkinc/t3-turbo-and-clerk).
There were a few things missing from these already existing repos that I wanted to add because I felt they were important for many production ready applications.

## What are the improvements?

- [x] Reverted to using [NPM](https://www.npmjs.com) because of personal preference
- [x] Added [Clerk](https://clerk.dev) for common authentication
- [x] Added [TRPC](https://trpc.io) auth handlers
- [x] Added Custom Authentication Handler system by extending GetServerSideProps
- [x] Added support for routes protected by roles
- [x] Added [Mantine](https://mantine.dev) for global error handling
- [ ] Added [Clerk](https://clerk.dev) to the Expo app
- [ ] Created detailed description on authentication & error handling usage

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```
# Install dependencies
npm install

# Configure environment variables
# Copy `.env.example` and edit as needed
cp .env.example .env

# Generate Prisma client & types
# push the schema to your database
npm run db:push

# Run in development mode
npm run dev
```

## See more

- [T3 Stack](https://github.com/t3-oss/create-t3-app)
- [T3 Turbo](https://github.com/t3-oss/create-t3-turbo/)
- [T3 Clerk](https://github.com/clerkinc/t3-turbo-and-clerk)

---

### If you like this repo, please consider giving it a star! ⭐️
