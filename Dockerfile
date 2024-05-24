FROM node:20-alpine AS installer
WORKDIR /var/web
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /var/web
COPY --from=installer /var/web /var/web

ENV TZ=America/Manaus
CMD npm run start

EXPOSE 3000