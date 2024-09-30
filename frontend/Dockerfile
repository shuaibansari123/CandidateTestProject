FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if applicable)
COPY package*.json /app/

# Install Node.js dependencies
RUN npm install

# Copy the rest of the project files
COPY . /app/

# Build the React app for production
RUN npm run build

# Use a minimal HTTP server to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000


# Command to run the app
CMD ["serve", "-s", "build"]