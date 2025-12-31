# Dockerfile for Python LangGraph Agent
FROM python:3.11-slim

WORKDIR /app

# Copy dependency files
COPY pyproject.toml ./

# Install dependencies
RUN pip install --no-cache-dir poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-dev

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the agent
CMD ["python", "main.py"]
