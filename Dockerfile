FROM node:18.2.0-alpine3.15 as build

WORKDIR /app

COPY ./package*.json .
COPY tsconfig.json .
COPY tsconfig.base.json .
COPY ./src ./src

RUN npm ci && \
    npm run build && \
    npm prune --production

FROM node:18.2.0-alpine3.15

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY ./resources ./resources

RUN apk add --no-cache tini=0.19.0-r0
RUN adduser -D -H -s /bin/sh -g "" report

USER report

ENTRYPOINT ["tini", "--"]
CMD ["node", "dist/index.js"]
