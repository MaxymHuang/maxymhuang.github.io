#!/bin/bash

# Build the container
echo "Building container..."
podman build -t localhost/portfolio-app:latest .

# Stop and remove existing container if it exists
echo "Cleaning up existing container..."
podman stop portfolio 2>/dev/null || true
podman rm portfolio 2>/dev/null || true

# Run the new container
echo "Starting container..."
podman run -d -p 0.0.0.0:8080:80 --name portfolio localhost/portfolio-app:latest

# Get the host machine's IP address
HOST_IP=$(ip route get 1 | awk '{print $7;exit}')

echo "Deployment complete! Your application is accessible at:"
echo "Local: http://localhost:8080"
echo "LAN: http://${HOST_IP}:8080" 