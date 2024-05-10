# Use the official Node.js image as a base
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .
 
# Build the React app
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
