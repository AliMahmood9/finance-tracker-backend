# Step 1 — Use Node.js 22 as base image
FROM node:22-alpine

# Step 2 — Set working directory inside container
WORKDIR /app

# Step 3 — Copy package files first (for caching)
COPY package*.json ./

# Step 4 — Install dependencies
RUN npm install --production

# Step 5 — Copy rest of the code
COPY . .

# Step 6 — Expose port
EXPOSE 5000

# Step 7 — Start the app
CMD ["node", "server.js"]