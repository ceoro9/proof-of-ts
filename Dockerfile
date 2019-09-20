FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

# for production: npm ci --only=production
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
