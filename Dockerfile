# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy source code to the working directory
COPY . .

# Install the npm packages, including the package manager
RUN npm ci

# Declare arguments from docker-compose.yml
ARG DATABASE_URL 
ARG UPSTASH_REDIS_REST_URL
ARG UPSTASH_REDIS_REST_TOKEN

ENV DATABASE_URL $DATABASE_URL
ENV UPSTASH_REDIS_REST_URL $UPSTASH_REDIS_REST_URL
ENV UPSTASH_REDIS_REST_TOKEN $UPSTASH_REDIS_REST_TOKEN

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1
ENV UPSTASH_TELEMETRY_DISABLED 1

# Build the application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
