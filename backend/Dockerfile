FROM node:20-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости в контейнере
RUN npm install

# Копируем весь код
COPY . .

EXPOSE 5001

CMD ["node", "server.js"]