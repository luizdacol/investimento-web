FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json tsconfig.json *.config.js ./
RUN npm ci

COPY /public ./public/
COPY /src ./src/

RUN npm run build

#-------------

FROM node:16-alpine

WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app ./

CMD ["serve", "-s", "build"]