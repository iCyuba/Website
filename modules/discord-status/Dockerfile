FROM oven/bun:1.0.21

WORKDIR /app

# Install pnpm
# RUN bun install -g pnpm

# Install dependencies
COPY package.json .
# COPY pnpm-lock.yaml . # This doesn't work...

RUN bun install

# Copy the app
COPY src ./src

# Run
EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
