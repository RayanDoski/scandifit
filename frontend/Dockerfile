# Stage 1: Build the React application
# We use a Node.js image to build the React app
FROM node:18-alpine as build

# Set the working directory inside the build stage container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
# Install Node.js dependencies
RUN npm install

# Copy the rest of your frontend application code
COPY . .

# Build the React app for production.
# This command reads the .env.production file to embed variables like REACT_APP_API_URL.
RUN npm run build

# Stage 2: Serve the React application with Nginx
# We use a very light Nginx image for serving static files
FROM nginx:alpine

# Copy the built React app (from the 'build' stage) to Nginx's default public serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Optional: If your React app uses client-side routing (like React Router),
# Nginx needs to be configured to redirect all unknown paths to index.html.
# If you skip this, direct access to routes like /about might result in a 404.
# To use this, you would create a file named `nginx/default.conf`
# in your `frontend` directory (e.g., `your-project/frontend/nginx/default.conf`)
# and then uncomment the line below.
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80, which is Nginx's default web server port
EXPOSE 80

# Command to start Nginx in the foreground when the container launches
CMD ["nginx", "-g", "daemon off;"]