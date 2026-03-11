# Start with official Node.js image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of your code
COPY . .

# Your app runs on port 3000
EXPOSE 3000

# Command to start your app
CMD ["node", "server.js"]
```

---

## 🚫 Step 3 — Create .dockerignore

Just like `.gitignore`, this tells Docker what NOT to copy:
```
node_modules
.env
.git