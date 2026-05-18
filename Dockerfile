# Bonus: application + Playwright tests in one image
FROM mcr.microsoft.com/playwright:v1.60.0-noble

WORKDIR /workspace

# Application (Kitchen Sink)
COPY app/package.json app/package-lock.json ./app/
RUN cd app && npm ci --omit=dev

COPY app/ ./app/

# Test automation
COPY package.json package-lock.json* ./
COPY playwright.config.ts tsconfig.json ./
COPY tests ./tests
COPY test-plan ./test-plan

RUN npm ci && npx playwright install chromium

ENV CI=true
ENV BASE_URL=http://127.0.0.1:8080

# Run app in background, then execute tests
CMD ["bash", "-c", "cd app && npm start & sleep 3 && cd /workspace && npm test && npm run allure:generate"]
