# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Set the working directory to /app/chatbot
WORKDIR /app/chatbot

# Make port (e.g., 5000) available to the world outside this container
EXPOSE 8080

# Run ta_server.py when the container launches
CMD ["python", "ta_server.py"]
