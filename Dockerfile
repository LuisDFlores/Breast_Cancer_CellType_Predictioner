FROM python:3.9-slim

WORKDIR /app

# Copy API files
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy API code and model files
COPY api/ .

# List files for debugging
RUN echo "Contents of /app directory:" && ls -la
RUN echo "Checking if model files exist:" && \
    test -f breast_cancer_model2.pkl && echo "Model file exists" || echo "Model file missing" && \
    test -f breast_cancer_scaler2.pkl && echo "Scaler file exists" || echo "Scaler file missing"

EXPOSE 8000

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"] 