FROM node:18.7.0

# Create app directory on the node image 
RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app
RUN yarn

# Copying source files
COPY . /app

# Building app
RUN yarn run build
EXPOSE 3001

# Running the app
CMD ["yarn", "start:dev"]