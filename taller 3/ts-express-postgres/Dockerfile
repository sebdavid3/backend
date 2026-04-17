#Stage 1: Build con Node
FROM node:18-alpine as build-step
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

#Stage 2: Serve con Node
FROM node:18-alpine
WORKDIR /app    
COPY package*.json ./
RUN npm install --only=production
COPY --from=build-step /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/src/index.js"]   
