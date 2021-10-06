FROM node:16

# Create app directory
WORKDIR /rover

# Install app dependencies
COPY package.json .
COPY yarn.lock .

# If you are building your code for production
RUN rm -rf node_modules && yarn install --frozen-lockfile

# Bundle app source
COPY . .

RUN [ "yarn", "build" ]

RUN [ "chmod", "u+x", "./bin/odyssey"]

CMD [ "./bin/odyssey", "sync" ]