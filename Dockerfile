# Use a Node image with your preferred version
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy only the `package.json` and `pnpm-lock.yaml` files to optimize build caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of your code
COPY . .

# Build the project
RUN pnpm run build

# Expose the application port
EXPOSE 3000

# Start the application in production mode
CMD ["pnpm", "run", "start:prod"]
