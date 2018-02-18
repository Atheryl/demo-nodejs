FROM node:8.9.3
EXPOSE 8080
COPY server.js .
COPY version.txt .
COPY index.html .
RUN mkdir log
CMD node server.js
