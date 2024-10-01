FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app for production
RUN npm run build

# Use the same Node.js image to serve the static files
FROM node:18

# Set the working directory for serve
WORKDIR /app

# Copy the build files from the previous stage
COPY --from=build /app/build ./build

# Install serve globally
RUN npm install -g serve

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]