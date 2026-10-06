FROM node:22-alpine3.20
WORKDIR /app
# Change to production instead of development when deploying
ENV NODE_ENV development
COPY package*.json ./
RUN npm ci
COPY . .
ARG PORT=4000
ENV PORT $PORT
EXPOSE $PORT
CMD ["npm", "run", "dev"]
