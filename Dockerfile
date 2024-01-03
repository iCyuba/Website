FROM node:lts-alpine as prod-dependencies

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --prod --frozen-lockfile

# Build
FROM prod-dependencies as build

# Install dev dependencies
RUN pnpm install --frozen-lockfile

COPY . .

ENV NODE_ENV=production
RUN pnpm build

# Run the app
FROM prod-dependencies as prod

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["pnpm", "start"]
