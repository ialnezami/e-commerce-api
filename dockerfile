# Base image
FROM node:18-alpine

# Create and set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the API port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
