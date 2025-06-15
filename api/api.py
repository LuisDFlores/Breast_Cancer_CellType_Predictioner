from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from typing import Dict
from sklearn.preprocessing import StandardScaler
import joblib
import os
import logging
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Breast Cancer Prediction API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the absolute path to the model files
current_dir = os.getcwd()
model_path = os.path.join(current_dir, 'breast_cancer_model2.pkl')
scaler_path = os.path.join(current_dir, 'breast_cancer_scaler2.pkl')

# Load the model and scaler
try:
    logger.info(f"Current working directory: {os.getcwd()}")
    logger.info(f"Current directory contents: {os.listdir('.')}")
    logger.info(f"Attempting to load model from: {model_path}")
    model = joblib.load(model_path)
    logger.info("Model loaded successfully!")
    
    logger.info(f"Attempting to load scaler from: {scaler_path}")
    scaler = joblib.load(scaler_path)
    logger.info("Scaler loaded successfully!")
except FileNotFoundError as e:
    logger.error(f"Error: File not found - {str(e)}")
    model = None
    scaler = None
except Exception as e:
    logger.error(f"Error loading model or scaler: {str(e)}")
    logger.error(f"Error type: {type(e)}")
    model = None
    scaler = None

class PredictionInput(BaseModel):
    radius_mean: float
    texture_mean: float
    perimeter_mean: float
    area_mean: float
    smoothness_mean: float
    compactness_mean: float
    concavity_mean: float
    concave_points_mean: float
    symmetry_mean: float
    fractal_dimension_mean: float
    radius_se: float
    texture_se: float
    perimeter_se: float
    area_se: float
    smoothness_se: float
    compactness_se: float
    concavity_se: float
    concave_points_se: float
    symmetry_se: float
    fractal_dimension_se: float
    radius_worst: float
    texture_worst: float
    perimeter_worst: float
    area_worst: float
    smoothness_worst: float
    compactness_worst: float
    concavity_worst: float
    concave_points_worst: float
    symmetry_worst: float
    fractal_dimension_worst: float

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "message": "Breast Cancer Prediction API is running",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    }

@app.post("/predict")
def predict(input_data: PredictionInput):
    if model is None or scaler is None:
        error_msg = "Model or scaler not loaded. Please check the server logs."
        logger.error(error_msg)
        raise HTTPException(status_code=500, detail=error_msg)
    
    try:
        # Convert input data to numpy array
        features = np.array([[
            input_data.radius_mean, input_data.texture_mean, input_data.perimeter_mean,
            input_data.area_mean, input_data.smoothness_mean, input_data.compactness_mean,
            input_data.concavity_mean, input_data.concave_points_mean, input_data.symmetry_mean,
            input_data.fractal_dimension_mean, input_data.radius_se, input_data.texture_se,
            input_data.perimeter_se, input_data.area_se, input_data.smoothness_se,
            input_data.compactness_se, input_data.concavity_se, input_data.concave_points_se,
            input_data.symmetry_se, input_data.fractal_dimension_se, input_data.radius_worst,
            input_data.texture_worst, input_data.perimeter_worst, input_data.area_worst,
            input_data.smoothness_worst, input_data.compactness_worst, input_data.concavity_worst,
            input_data.concave_points_worst, input_data.symmetry_worst, input_data.fractal_dimension_worst
        ]])
        
        logger.info(f"Input features shape: {features.shape}")
        
        # Scale the features
        features_scaled = scaler.transform(features)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        logger.info(f"Raw prediction: {prediction}")
        
        # Convert prediction to string
        result = "Malignant" if prediction == 1 else "Benign"
        logger.info(f"Final prediction: {result}")
        
        return {"prediction": result}
    
    except Exception as e:
        error_msg = f"Error during prediction: {str(e)}"
        logger.error(error_msg)
        logger.error(f"Error type: {type(e)}")
        raise HTTPException(status_code=500, detail=error_msg)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info") 