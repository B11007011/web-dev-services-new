# Use Node.js 20 as the base image
FROM node:20-alpine

# Install dependencies required for development
RUN apk add --no-cache python3 make g++ git

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Create a script to handle npm install during development
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Use the entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"] 