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

### Development Platform Determination

- The `dev` command in the Expo app uses a simple bash command to determine the OS, so that the iOS / Android emulators will be correctly started.

- The environment variable $OSTYPE and the syntax used in the command is only available on Unix platforms. On Windows, we have to use WSL or Git Bash.

- Using Git Bash is always recommended in VS Code, because it is the only way to use the integrated terminal with the same syntax as the bash terminal.

- Since npm uses the default powershell by default, we have to set the script shell to Git Bash. Use the following command to achieve this:

```bash
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
```

- Replace the path with the path to your Git Bash installation's bin folder.

- Don't forget to run this command in the root of the project, otherwise the following error will occur:

```
npm ERR! code ENOWORKSPACES
npm ERR! This command does not support workspaces.
```

### Setting up emulator

If you've never started your Android emulator before, try manually starting it first. This will ensure that the emulator is ready to be started by the Expo app.

Sometimes this error will pop up:

```
CommandError: Input is required, but 'npx expo' is in non-interactive mode.
```

You can easily solve this by running the `expo start` command directly from the Expo app's root directory. This error comes up when the Expo Go app is outdated or other interaction is needed but the terminal is in non-interactive mode since you are using Turborepo. You will be prompted but to continue, but after running the command manully, you can continue development with Turbo.

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
