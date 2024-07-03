FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . ./
RUN npm run build

FROM node:16-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev \
    && npm i -g pm2
COPY --from=builder /app/dist ./dist
COPY ./ecosystem.config.js ./
ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js" ]
