# Dockerfile for Python LangGraph Agent
# Use Python 3.12 to match project requirement (pyproject requires >=3.12)
FROM python:3.12-slim

WORKDIR /app

# Copy dependency files
COPY pyproject.toml ./

# Install dependencies
# Pin Poetry to a 1.x release (modern "poetry" package v2 has a different CLI)
RUN pip install --no-cache-dir "poetry==1.5.1" && \
    poetry config virtualenvs.create false && \
    poetry install --no-dev

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the agent
CMD ["python", "main.py"]
