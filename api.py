from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from typing import Dict
from sklearn.preprocessing import StandardScaler
import joblib

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and scaler
try:
    print("Attempting to load model from:", 'breast_cancer_model2.pkl')
    model = joblib.load('breast_cancer_model2.pkl')
    print("Model loaded successfully!")
    
    print("Attempting to load scaler from:", 'breast_cancer_scaler2.pkl')
    scaler = joblib.load('breast_cancer_scaler2.pkl')
    print("Scaler loaded successfully!")
except FileNotFoundError as e:
    print(f"Error: File not found - {str(e)}")
    model = None
    scaler = None
except Exception as e:
    print(f"Error loading model or scaler: {str(e)}")
    print(f"Error type: {type(e)}")
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
    concave_points_mean: float  # Note: This matches the API input
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
    return {"message": "Breast Cancer Prediction API is running"}

@app.post("/predict")
def predict(input_data: PredictionInput):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model or scaler not loaded. Please check the server logs.")
    
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
        
        print("Input features shape:", features.shape)
        print("Input features:", features)
        
        # Scale the features
        features_scaled = scaler.transform(features)
        print("Scaled features:", features_scaled)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        print("Raw prediction:", prediction)
        
        # Convert prediction to string
        result = "Malignant" if prediction == 1 else "Benign"
        print("Final prediction:", result)
        
        return {"prediction": result}
    
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        print(f"Error type: {type(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000) 