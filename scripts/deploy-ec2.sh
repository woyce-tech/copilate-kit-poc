#!/bin/bash
# Quick deployment script for EC2
# Run this on your EC2 instance after copying files

set -e

echo "🚀 Deploying LangGraph Agent to EC2..."

# Navigate to agent directory
cd ~/agent || cd /home/ubuntu/agent || { echo "Agent directory not found"; exit 1; }

# Stop and remove old container
echo "📦 Stopping old container..."
docker stop agent 2>/dev/null || true
docker rm agent 2>/dev/null || true

# Build new image
echo "🔨 Building Docker image..."
docker build -t langgraph-agent .

# Run container
echo "▶️  Starting container..."
docker run -d \
  -p 8000:8000 \
  --env-file .env \
  --restart unless-stopped \
  --name agent \
  langgraph-agent

# Wait for container to start
echo "⏳ Waiting for container to start..."
sleep 3

# Show logs
echo "📋 Container logs:"
docker logs agent

echo ""
echo "✅ Deployment complete!"
echo "🌐 API should be available at: http://$(curl -s ifconfig.me):8000"
echo ""
echo "📊 To view logs: docker logs -f agent"
echo "🔄 To restart: docker restart agent"
echo "🛑 To stop: docker stop agent"
