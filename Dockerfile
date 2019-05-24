FROM node:10-slim

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
COPY . /app
RUN npm install

# Environment
ENV APOS_NO_MIGRATE=1
ENV APOS_ALWAYS_COPY_ASSETS=1

EXPOSE 3000
CMD [ "npm", "start" ]
