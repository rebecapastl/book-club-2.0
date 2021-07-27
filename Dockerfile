# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy frontend application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY frontend/package*.json frontend/yarn.lock /frontend/

# Copy frontend files from local to the container image.
COPY /frontend /frontend

#change to frontend directory
WORKDIR /frontend

#Install frontend
RUN yarn install

# Build the frontend
RUN yarn build

#change to backend directory
WORKDIR ../

# Copy backend application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY backend/package*.json /backend/

# Copy backend files from local to the container image.
COPY /backend /backend

#change to backend directory
WORKDIR /backend

# Install backend production dependencies.
# If the package.json and package-lock.json haven't changed, it will not install
# all the dependencies again
RUN npm install

# Run the web service on container startup (backend).
CMD ["npm", "run", "dev"]
