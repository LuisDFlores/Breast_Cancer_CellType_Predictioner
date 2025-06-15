"use client";

import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://breast-cancer-api-74zl.onrender.com/predict';

const Cancerform = () => {
  const [inputValues, setInputValues] = useState({
    radius_mean: '',
    texture_mean: '',
    perimeter_mean: '',
    area_mean: '',
    smoothness_mean: '',
    compactness_mean: '',
    concavity_mean: '',
    concave_points_mean: '',
    symmetry_mean: '',
    fractal_dimension_mean: '',
    radius_se: '',
    texture_se: '',
    perimeter_se: '',
    area_se: '',
    smoothness_se: '',
    compactness_se: '',
    concavity_se: '',
    concave_points_se: '',
    symmetry_se: '',
    fractal_dimension_se: '',
    radius_worst: '',
    texture_worst: '',
    perimeter_worst: '',
    area_worst: '',
    smoothness_worst: '',
    compactness_worst: '',
    concavity_worst: '',
    concave_points_worst: '',
    symmetry_worst: '',
    fractal_dimension_worst: ''
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Convert string values to numbers
      const numericValues = Object.fromEntries(
        Object.entries(inputValues).map(([key, value]) => [key, parseFloat(value)])
      );

      console.log('Sending data to API:', numericValues);
      const response = await axios.post(API_URL, numericValues, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log('API Response:', response.data);
      
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error('Error:', err);
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.detail || 'Error connecting to the API';
        setError(`API Error: ${errorMessage}`);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (label: string) => {
    return label
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto pt-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-white via-[#20BEFF] to-white px-8 py-6 border-b border-gray-200 rounded-t-lg">
          <h2 className="text-3xl font-bold text-black">Breast Cancer Cell Diagnostic Prediction</h2>
          <p className="text-gray-600 mt-2 text-lg">Enter cell measurements to predict cell type</p>
        </div>

        {/* Main Content */}
        <div className="px-8 py-6">
          {/* Disclaimer Section */}
          <div className="mb-8 bg-gradient-to-r from-white via-yellow-50 to-white rounded-lg p-6 border border-yellow-200">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">⚠️ Medical Disclaimer</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              This tool is for research and educational purposes only. The predictions provided are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding a medical condition.
            </p>
          </div>

          {/* Model Limitations Section */}
          <div className="mb-8 bg-gradient-to-r from-white via-yellow-50 to-white rounded-lg p-6 border border-yellow-200">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Model Limitations</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              This prediction model has several limitations: it lacks cross-validation, learning curves, and comprehensive evaluation metrics like precision, recall, and F1-score. The model's performance metrics (98.25% accuracy) are based on a single test set and may not reflect real-world performance. Feature importance analysis is not included, and the model may not account for all relevant factors in breast cancer diagnosis. The predictions should be used as one of many tools in the diagnostic process, not as a definitive diagnosis.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Object.entries(inputValues).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                      {formatLabel(key)}
                    </label>
                    <input
                      type="number"
                      step="any"
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white border-gray-300 text-gray-900 shadow-sm focus:border-[#20BEFF] focus:ring-[#20BEFF] sm:text-sm"
                      placeholder={`Enter ${formatLabel(key).toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-4 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-white via-[#20BEFF] to-white hover:from-white hover:via-[#20BEFF]/90 hover:to-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20BEFF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Predict Cell Type'
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-red-600">{error}</div>
              </div>
            )}

            {prediction && (
              <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className={`text-2xl font-semibold ${prediction === 'Malignant' ? 'text-red-600' : 'text-[#20BEFF]'}`}>
                  Prediction: {prediction}
                </div>
                <p className="mt-3 text-gray-700 text-lg">
                  {prediction === 'Malignant' 
                    ? 'The cell type is predicted to be malignant. Please consult with a healthcare professional.'
                    : 'The cell type is predicted to be benign. However, please consult with a healthcare professional for confirmation.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancerform; 