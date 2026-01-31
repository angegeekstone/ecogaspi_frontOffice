# Stage 1: Build the application
FROM node:16-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variables for production
ENV REACT_APP_ENV=production
ENV REACT_APP_API_BASE_URL=http://185.98.136.83:81
ENV REACT_APP_API_VERSION=
ENV REACT_APP_WEBSOCKET_URL=ws://185.98.136.83:81/ws
ENV REACT_APP_UPLOAD_BASE_URL=http://185.98.136.83:81/uploads
ENV REACT_APP_DEBUG=false

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]