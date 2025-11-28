
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

ENV NODE_ENV production

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY next.config.ts ./

RUN npm install 

COPY --from=builder --chown=nextjs:nextjs /app/.next ./.next
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]