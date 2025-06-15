FROM python:3.9-slim

WORKDIR /app

# Copy API files
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy API code and model files
COPY api/ .

EXPOSE 8000

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"] 