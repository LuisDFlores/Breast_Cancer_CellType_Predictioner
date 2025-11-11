"""
Vercel serverless function handler for FastAPI app
This wraps the FastAPI application to work with Vercel's serverless function format
"""
import sys
import os

# Add the api directory to the path so we can import api.py
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

# Import FastAPI app
from api import app
from mangum import Mangum

# Create ASGI handler for Vercel
# Mangum converts ASGI to AWS Lambda/API Gateway format, which Vercel's Python runtime uses
handler = Mangum(app, lifespan="off")

# Vercel Python runtime expects a handler function that receives the event
def vercel_handler(event, context=None):
    """
    Vercel serverless function entry point
    event: Vercel request event (similar to AWS Lambda event)
    context: Vercel context (optional)
    """
    # Mangum handles the conversion from Lambda/API Gateway format to ASGI
    # Vercel's Python runtime uses a similar format
    response = handler(event, context)
    
    # If response is async, we need to handle it
    if hasattr(response, '__await__'):
        import asyncio
        return asyncio.run(response)
    
    return response

