# BUILD
FROM node:10 as build
WORKDIR /build
ADD package*.json ./
RUN ["npm", "i"]

# RUN DEV
FROM node:10-alpine
WORKDIR /var/www/dashboard
COPY --from=build /build/node_modules ./node_modules
COPY . .
EXPOSE 8181
CMD [ "npm", "run", "watch" ]
