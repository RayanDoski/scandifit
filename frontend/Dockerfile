# Steg 1: Bygg React-applikationen
FROM node:18-alpine as frontend-build

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Steg 2: Kör Nginx
FROM nginx:alpine as frontend

COPY --from=frontend-build /app/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80