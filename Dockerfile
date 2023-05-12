FROM node:18-alpine AS base

FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
RUN yarn install
COPY . .
RUN yarn run build

FROM node:18-alpine
RUN yarn global add dotenv-cli
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .env .
COPY apps/api/package.json ./apps/api/package.json
# COPY apps/web/package.json ./apps/web/package.json
RUN yarn install --prod
COPY --from=builder /app/apps/api/dist /app/apps/api/dist
COPY --from=builder /app/apps/web/build /app/apps/web/build

EXPOSE 3001

CMD [ "yarn", "run" ,"start" ]