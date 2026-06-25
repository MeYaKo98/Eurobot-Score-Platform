#build image
FROM node:18 AS builder
ARG REACT_APP_DISPLAY_VERSION=v2
ENV REACT_APP_DISPLAY_VERSION=${REACT_APP_DISPLAY_VERSION}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
#producion image
FROM node:18-slim
COPY --from=builder /app/build /app/build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "/app/build"]