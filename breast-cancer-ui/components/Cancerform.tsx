"use client";

import React, { useState } from "react";
import axios from "axios";

type InputValues = {
    [key: string]: number;
};

const initialState: InputValues = {
    radius_mean: 0,
    texture_mean: 0,
    perimeter_mean: 0,
    area_mean: 0,
    smoothness_mean: 0,
    compactness_mean: 0,
    concavity_mean: 0,
    concave_points_mean: 0,
    symmetry_mean: 0,
    fractal_dimension_mean: 0,
    radius_se: 0,
    texture_se: 0,
    perimeter_se: 0,
    area_se: 0,
    smoothness_se: 0,
    compactness_se: 0,
    concavity_se: 0,
    concave_points_se: 0,
    symmetry_se: 0,
    fractal_dimension_se: 0,
    radius_worst: 0,
    texture_worst: 0,
    perimeter_worst: 0,
    area_worst: 0,
    smoothness_worst: 0,
    compactness_worst: 0,
    concavity_worst: 0,
    concave_points_worst: 0,
    symmetry_worst: 0,
    fractal_dimension_worst: 0,
};

const API_URL = "http://127.0.0.1:8000/predict";

const Form: React.FC = () => {
    const [values, setValues] = useState<InputValues>(initialState);
    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: parseFloat(value) || 0 });
        setError(null); // Clear any previous errors when user makes changes
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setPrediction("");
        setError(null);

        try {
            console.log('Sending data to API:', values); // Debug log
            const response = await axios.post(API_URL, values);
            console.log('API Response:', response.data); // Debug log
            setPrediction(response.data.prediction);
        } catch (err) {
            console.error('API Error:', err); // Debug log
            if (axios.isAxiosError(err)) {
                if (err.code === 'ECONNREFUSED') {
                    setError("Could not connect to the prediction server. Please make sure the server is running at " + API_URL);
                } else if (err.response) {
                    setError(`Server error: ${err.response.data.message || err.response.statusText}`);
                } else {
                    setError("An error occurred while making the prediction. Please try again.");
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
            setPrediction("");
        } finally {
            setLoading(false);
        }
    };

    const formatLabel = (key: string) => {
        return key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-blue-600 px-6 py-4">
                        <h1 className="text-2xl font-semibold text-white">
                            Breast Cancer Prediction Tool
                        </h1>
                        <p className="mt-1 text-blue-100">
                            Enter the patient's diagnostic measurements below
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.keys(values).map((key) => (
                                <div key={key} className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {formatLabel(key)}
                                    </label>
                                    <input
                                        type="number"
                                        name={key}
                                        value={values[key]}
                                        onChange={handleChange}
                                        step="any"
                                        required
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        placeholder="Enter value"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    'Generate Prediction'
                                )}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="px-6 py-4 bg-red-50 border-t border-red-200">
                            <div className="text-center">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        </div>
                    )}

                    {prediction && !error && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-gray-900">Prediction Result</h2>
                                <div className={`mt-2 text-xl font-semibold ${
                                    prediction === "Malignant" 
                                        ? "text-red-600" 
                                        : prediction === "Benign"
                                        ? "text-green-600"
                                        : "text-gray-600"
                                }`}>
                                    {prediction}
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    {prediction === "Malignant" 
                                        ? "Further medical evaluation recommended"
                                        : "No immediate concerns detected"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Form;