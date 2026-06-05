FROM node:24-alpine AS builder
WORKDIR /app
RUN npm i -g pnpm
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm i
COPY . .
ENV VITE_APP_REST_API_URL=https://bis.laogw.la:8443 \
    VITE_APP_REST_API_BASE_PATH=api \
    VITE_APP_REST_API_VERSION=v1 \
    VITE_APP_LIMIT_FILE_SIZE=10
RUN pnpm build

FROM nginx:1.27.1-alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]