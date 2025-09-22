# Build stage for frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Build stage for backend
FROM node:18-alpine
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend ./
COPY --from=frontend-build /app/frontend/build ../frontend/build
EXPOSE 8080
CMD ["npm", "start"]