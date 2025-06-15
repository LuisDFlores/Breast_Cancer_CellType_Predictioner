FROM python:3.9-slim

WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy API code and model files
COPY api/ .

# Debug: List contents of /app
RUN ls -la /app

# Debug: Check if model files exist
RUN test -f breast_cancer_model2.pkl && echo "Model file exists" || echo "Model file missing"
RUN test -f breast_cancer_scaler2.pkl && echo "Scaler file exists" || echo "Scaler file missing"

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "info"] 