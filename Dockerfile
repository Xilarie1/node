FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# 🧠 Add this line — it installs Python and compilers for native modules
RUN apk add --no-cache python3 make g++

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

EXPOSE 3500

CMD ["node", "server.js"]
