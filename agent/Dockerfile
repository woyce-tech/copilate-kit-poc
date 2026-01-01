# Dockerfile for Python LangGraph Agent
# Use Python 3.12 to match project requirement (pyproject requires >=3.12)
FROM python:3.12-slim

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
