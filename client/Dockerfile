FROM node:latest
WORKDIR /var/www/dashboard-client
ADD package*.json ./
RUN ["npm", "i"]
COPY . .
EXPOSE 8181
CMD [ "npm", "start" ]
