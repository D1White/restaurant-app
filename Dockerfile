# FROM node:18-alpine as client_build
# RUN apk add yarn
# WORKDIR /app
# COPY /client/package.json /app/
# COPY /client/yarn.lock /app/
# RUN yarn install
# COPY /client /app
# RUN npm run build


# FROM node:14-alpine as server_build
# WORKDIR /app
# COPY /server/package*.json /app/
# RUN npm install
# COPY ./server /app
# RUN npm run build


# FROM node:14-alpine
# WORKDIR /app
# COPY /server/package.json /app/package.json
# COPY /server/.env /app/.env
# RUN npm install --only=prod

# COPY --from=client_build /app/build /app/build
# COPY --from=server_build /app/build /app

# EXPOSE 5000
# CMD ["node", "server.js"]

FROM node:18-alpine AS base

FROM base as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
RUN yarn install
COPY . .
RUN yarn run build

FROM base as runner
RUN yarn global add dotenv-cli
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .env .
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
RUN yarn install --prod
COPY --from=builder /app/apps/api/dist /app/apps/api/dist
COPY --from=builder /app/apps/web/build /app/apps/web/build

EXPOSE 3001

CMD [ "yarn", "run" ,"start" ]