FROM node:21-alpine3.19
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV development
RUN npm install
COPY . .
ARG PORT=4000
ENV PORT $PORT
EXPOSE $PORT
CMD ["npx", "nodemon", "--exec", "npm install && npm start", "--watch", "package.json"]

