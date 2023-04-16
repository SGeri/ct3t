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
- [x] Added [Docker](https://www.docker.com) and [docker-compose](https://docs.docker.com/compose/) support for production deployment
- [x] Added [Clerk](https://clerk.dev) to the Expo app
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

## Docker (Web Only)

**Note:** This is for production deployment, not development mode.
**Note:** It is planned to create a development docker-compose file in the future.
**Note:** This is only for the web app, not the Expo app.

### Image + Container

First, we create a Docker image from the Dockerfile:

```bash
docker build -t my-ct3t-image .
```

Then, we run the image with port 3000 exposed:

```bash
docker run -it -p 3000:3000 --name my-ct3t-container my-ct3t-image
```

- -it: Allocate a pseudo-TTY terminal and keep STDIN open
- -p: Publish a Nextjs' port to the host
- --name: Name the container
- my-ct3t-image: The name of the image (previously created)

You can always add the -d flag to run the container in the background. (Detached Mode)

### With docker-compose

We can use docker-compose to run development environment and also production environment.
Production environment is the same as the dev, but it also builds the Dockerfile and runs it as a container.

You can read more about self hosting CT3T with Oracle Free Tier Linux in the (SELF-HOST.md file)[SELF-HOST.md].

If you wish to use docker-compose, you can just use the following command to start the container:

**Note:** This is for production deployment, not development mode.

```bash
docker-compose up -d // docker-compose -f compose/docker-compose.dev.yml up
```

If you would like to change the database credentials and start-up settings, you can edit the `docker-compose.yml` file.

## Deployment (Web Only)

### Self-Hosted

In this example repo, we use a custom VPS to host the web app. You can use any hosting provider you want to integrate our CI/CD automation workflow.
The file `.github/workflows/main.yml` contains the workflow that will be triggered when you push to the `main` branch.

This workflow utilizes [Docker](https://www.docker.com/) to build the image and [compose](https://docs.docker.com/compose/) to run the web app in a container with
the database. Environment management is partially done by Docker, but on the server you also have to create a .env file for other variables that are not in the Dockerfile.

**Note:** It is possible to integrate Github secrets, so you can change them more easily, but for now we will use a remote .env file.

The workflow uses the `appleboy/ssh-action` action to connect to the VPS and run our commands to deploy.

---

Read more about free self-hosted deployment with Oracle Free Tier Linux in the [SELF-HOST.md file](SELF-HOST.md).

### Terraform

For this example, we've created a Terraform configuration that will initialize the following providers and services:

- [Cloudflare](https://www.cloudflare.com) for Domain and DNS management

  - Used to create a DNS record that points to Vercel

- [Vercel](https://vercel.com) for hosting the web application

  - Used to create a Vercel project and deploy and inject the environment variables from other providers

- [Upstash](https://upstash.com) for Redis database
  - Used to create a Redis database

To set your own production infrastructure, you can follow these steps:

0. You have to have the Terraform CLI installed on your machine. You can download it from [here](https://www.terraform.io/downloads.html).
1. Run `npm run tf:init` to initialize the providers and modules.
2. Add your environment variables that start with `TF_VAR_` to the `.env` file.
3. Run `npm run tf:plan` to see what changes will be made to the infrastructure.
4. Run `npm run tf:apply` to apply the changes to the infrastructure.

Instead of directly using the Terraform CLI, you can also use the `npm run tf` command to ensure that the environment variables are loaded.

**Note:** Sadly, there are no established solutions for using Planetscale with Terraform that provide the connection string. Therefore,
we simply require the connection string to be passed as an environment variable.

### Best practices for your infrastructure

- Use the `compose/docker-compose.dev.yaml` file to run the development environment locally with persistent database data or use the `compose/postgres-seed.sql`
  to seed the database with some data so the same sample data will be available in every development session.

- Use the terraform configuration (`terraform.tf`) to create the production resources and use Vercel's CI/CD system to deploy the web app.

- For every other special needs, use Github Actions to automate your CI/CD workflow. This project includes a workflow that will do linting, building. Optionally you can deploy the web app to a VPS, this is also included in the workflow.

## See more

- [T3 Stack](https://github.com/t3-oss/create-t3-app)
- [T3 Turbo](https://github.com/t3-oss/create-t3-turbo/)
- [T3 Clerk](https://github.com/clerkinc/t3-turbo-and-clerk)

---

### If you like this repo, please consider giving it a star! ⭐️
