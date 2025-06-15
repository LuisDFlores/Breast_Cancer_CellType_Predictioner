FROM python:3.9-slim

WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy API code and model files
COPY api.py .
COPY breast_cancer_model2.pkl .
COPY breast_cancer_scaler2.pkl .

# Debug: List contents of /app
RUN echo "Contents of /app directory:" && ls -la /app

# Debug: Check if model files exist and their sizes
RUN echo "Checking model files:" && \
    test -f breast_cancer_model2.pkl && echo "Model file exists" && ls -l breast_cancer_model2.pkl || echo "Model file missing" && \
    test -f breast_cancer_scaler2.pkl && echo "Scaler file exists" && ls -l breast_cancer_scaler2.pkl || echo "Scaler file missing"

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Expose port
EXPOSE 8000

# Run the application with debug logging
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "debug"] 