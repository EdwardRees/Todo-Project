# PERN Todo Project

A simple todo list project written with the PERN stack.

## Technology/Dependencies

### Frontend

- Axios
- React
- Redux
- TypeScript
- Vite

### Backend

- Bcrypt
- Express
- JsonWebToken
- Nodemon
- PostgreSQL
- Prisma
- TypeScript

## Dependencies

- NodeJS
- Postgres
- yarn / npm

## Installation

Make sure all dependencies listed above are installed.

Navigate to the `web` folder and run `yarn` or `npm install` to install the frontend dependencies.

Navigate back out to the main folder and run `yarn` or `npm install` to install the backend dependencies.

## Instructions to Run

### Backend

Run `yarn dev:server` or `npm run dev:server`, which will bind to port `5750` unless otherwise specified.

### Frontend

Run `yarn web` or `npm run web` which will bind to port `3000` unless otherwise specified.

### Simultaneous

While running both backend and frontend servers in two separate sessions is an option, alternatively, running `yarn start` or `npm run start` will run both servers concurrently using the `concurrently` npm package.

## Accessing the project

Once the servers are up and running, go to `localhost:3000` to access the frontend of the project. If the backend runs without any issues, the frontend should be able to connect to the backend using the axios requests.

## Note

This project was hosted on a linode instance before, but has been moved away. Some of the configuration for that is still here, such as the pm2 configurations. These can be ignored.
