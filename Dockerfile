FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./

RUN ["npm", "install"]

COPY ./ ./

RUN ["npm", "run", "build"]

FROM nginx:alpine as server

COPY --from=builder /app/dist /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
COPY nginx.conf /etc/nginx/conf.d/configfile.template
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
