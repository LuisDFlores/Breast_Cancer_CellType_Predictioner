import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

# Load the data
data = pd.read_csv("data.csv")

# Drop unnecessary columns
data.drop(["Unnamed: 32", "id"], axis=1, inplace=True)

# Convert diagnosis to binary
data.diagnosis = [1 if value == "M" else 0 for value in data.diagnosis]

# Separate features and target
X = data.drop("diagnosis", axis=1)
Y = data.diagnosis

# Create and fit the scaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split the data
X_train, X_test, Y_train, Y_test = train_test_split(X_scaled, Y, test_size=0.30, random_state=42)

# Create and train the model
lr = LogisticRegression()
lr.fit(X_train, Y_train)

# Evaluate the model
from sklearn.metrics import accuracy_score, classification_report
Y_pred = lr.predict(X_test)
accuracy = accuracy_score(Y_test, Y_pred)
print(f"Accuracy: {accuracy:.2f}")
print("\nClassification Report:")
print(classification_report(Y_test, Y_pred))

# Save both the model and scaler
joblib.dump(lr, "breast_cancer_model2.pkl")
joblib.dump(scaler, "breast_cancer_scaler2.pkl")

print("\nModel and scaler saved successfully!") 