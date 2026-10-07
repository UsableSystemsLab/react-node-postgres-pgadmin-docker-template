FROM node:22-alpine3.20
WORKDIR /app
#Change to production instead of development when deploying
ENV NODE_ENV development
COPY package*.json ./
RUN npm install
COPY . .
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
