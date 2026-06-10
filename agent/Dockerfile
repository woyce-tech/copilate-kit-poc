# Dockerfile for Python LangGraph Agent
# Use Python 3.12 to match project requirement (pyproject requires >=3.12)
FROM python:3.12-slim

WORKDIR /app

# Copy dependency files
# Copy dependency files
COPY pyproject.toml ./
COPY requirements.txt ./

# Install dependencies via pip using requirements.txt (avoids poetry/pyproject differences)
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run FastAPI app with uvicorn so the container provides a health endpoint
# and keeps the process alive. The real LangGraph runtime should be
# deployed separately for production; this provides a minimal POC server.
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
