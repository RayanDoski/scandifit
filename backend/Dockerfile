# Use an official Python runtime as a parent image
# We choose a slim version to keep the image size down
FROM python:3.10-slim-buster

# Set the working directory in the container
# All subsequent commands will run from this directory inside the container
WORKDIR /app

# Copy the requirements file into the container
# This step is done early to leverage Docker's build cache
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
# --no-cache-dir reduces the image size by not storing pip's cache
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
# The '.' on the left means "copy everything from the current directory (backend)"
# The '.' on the right means "to the current working directory inside the container (/app)"
COPY . .

# Expose the port your Flask app runs on (Flask's default port is 5000)
# This informs Docker that the container listens on the specified network ports at runtime.
EXPOSE 8080

# Command to run the Flask application when the container starts
# --host=0.0.0.0 makes the Flask app accessible from outside the container
# --port=5000 ensures it runs on the exposed port
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]