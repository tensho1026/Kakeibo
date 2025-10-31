FROM node:18-alpine

# bcryptなどC++ビルドが必要なパッケージ用
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
