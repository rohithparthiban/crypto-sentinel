# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy rest of the application
COPY . .

# Expose app port
EXPOSE 3000

# Start API + Worker
CMD ["npm", "start"]
