FROM node:22-alpine3.20
WORKDIR /app
ENV NODE_ENV development
COPY package*.json ./
RUN npm install
COPY . .
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT
CMD ["npx", "nodemon", "--exec", "npm install && npm run dev", "--watch", "package.json"]
