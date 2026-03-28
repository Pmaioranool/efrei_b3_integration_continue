FROM node:20-alpine AS build

# Install openssl for Prisma
RUN apk add --no-cache openssl openssl-dev

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx --no-install prisma generate

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
