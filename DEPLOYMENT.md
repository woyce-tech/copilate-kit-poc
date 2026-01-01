# AWS POC Deployment Guide

## Option 1: Quickest POC Setup (Recommended)

### Frontend: Vercel (2 minutes)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL=http://your-ec2-ip:8000`
5. Deploy (automatic)

### Backend: AWS EC2 Free Tier

#### Step 1: Launch EC2 Instance
```bash
# 1. Go to AWS Console > EC2 > Launch Instance
# 2. Choose:
#    - AMI: Ubuntu 22.04 LTS (Free tier eligible)
#    - Instance type: t2.micro (Free tier)
#    - Security Group: Allow ports 22 (SSH), 8000 (API)
# 3. Create/download key pair
# 4. Launch instance
```

#### Step 2: Connect and Setup
```bash
# SSH into your instance
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Update system
sudo apt install docker-compose -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu
```

Logout and login again, then:

```bash
# Install Docker Compose
sudo apt install docker-compose -y

# Clone your repo or copy files
# Option 1: If repo is public
git clone your-repo-url
cd product/agent

# Option 2: Copy files via SCP from local
# scp -i your-key.pem -r agent/ ubuntu@your-ec2-ip:~/
```

#### Step 3: Deploy Agent
```bash
cd agent/

# Create .env file with your API keys
cat > .env << 'EOF'
OPENAI_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
EOF

# Build and run
docker build -t langgraph-agent .
docker run -d -p 8000:8000 --env-file .env --name agent langgraph-agent

# Check logs
docker logs -f agent
```

#### Step 4: Test
```bash
# Correct usage (no extra slash before the port):
curl http://44.199.244.38:8000/health
```

---

## Option 2: All AWS Setup

### Frontend: AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize
amplify init

# Add hosting
amplify add hosting
# Choose: "Hosting with Amplify Console"

# Deploy
amplify publish
```

### Backend: Same EC2 setup as above

---

## Environment Variables Needed

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://your-ec2-ip:8000
OPENAI_API_KEY=your_openai_key
```

### Backend (agent/.env)
```bash
OPENAI_API_KEY=your_openai_key
TAVILY_API_KEY=your_tavily_key
```

---

## Costs (POC)

- **EC2 t2.micro**: Free for 12 months (750 hours/month)
- **Vercel**: Free forever for personal projects
- **AWS Amplify**: ~$0-5/month for small POC
- **Data transfer**: Minimal for POC

---

## Quick Deploy Script

Create `deploy-ec2.sh` for easy deployment:

```bash
#!/bin/bash
# Run this after SSH into EC2

cd ~/agent
docker stop agent 2>/dev/null || true
docker rm agent 2>/dev/null || true
docker build -t langgraph-agent .
docker run -d -p 8000:8000 --env-file .env --restart unless-stopped --name agent langgraph-agent
docker logs -f agent
```

---

## Production Tips (Post-POC)

When scaling beyond POC:
- Use AWS Load Balancer + Auto Scaling
- Move to RDS for database
- Use S3 for file storage
- Add CloudFront CDN
- Use AWS Secrets Manager for keys
- Set up CloudWatch monitoring
