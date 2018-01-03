FROM node:8.9.3
EXPOSE 8080
COPY server.js .
CMD node server.js
