#!/bin/bash

# Step 1: Pull the latest code from Git
echo "Pulling latest code from Git..."
git pull origin master || { echo "Git pull failed"; exit 1; }

echo "Stopping current Docker containers..."
sudo docker-compose down || { echo "Failed to stop Docker containers"; exit 1; }


echo "Clearing image"
sudo docker image prune -f || { echo "Failed to clear Docker image "; exit 1; }

# echo "Clearing container"
# sudo docker container prune  || { echo "Failed to clear container Docker "; exit 1; }

echo "Clearing docker system"
sudo docker system prune -f || { echo "Failed to clear system Docker "; exit 1; }

# Step 3: Rebuild and start Docker containers
echo "Rebuilding and starting Docker containers..."
sudo docker-compose up -d --build || { echo "Failed to start Docker containers"; exit 1; }

# Step 4: Reload Nginx to apply changes
echo "Reloading Nginx..."
sudo systemctl reload nginx || { echo "Failed to reload Nginx"; exit 1; }

# Step 6: Check Docker logs (optional)
# echo "Checking Docker logs..."
# docker-compose logs -f

echo "Project update complete!"