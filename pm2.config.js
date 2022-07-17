const name = "todolist.edwardrees.info";
const user = "erees";
const host = "todolist.edwardrees.info";
const port = 5750;
const build = "yarn install; yarn build";

module.exports = {
  apps: [
    {
      name,
      script: "yarn server",
      args: `--port ${port}`,
      env: {
        PORT: 5750,
        NODE_ENV: "development",
        DATABASE_URL: "postgres://postgres:TheModBros@74.207.247.118:5432/tododb",
        ACCESS_TOKEN_SECRET: "19-20-8-22-11-1-3",
        JWT_SECRET: "19-20-8-22-11-1-3"
      },
      env_production: {
        PORT: 5750,
        NODE_ENV: "production",
        DATABASE_URL: "postgres://postgres:TheModBros@74.207.247.118:5432/tododb",
        ACCESS_TOKEN_SECRET: "19-20-8-22-11-1-3",
        JWT_SECRET: "19-20-8-22-11-1-3"
      },
    },
  ],
  deploy: {
    production: {
      user: "root",
      host: "74.207.247.118",
      ref: "origin/master",
      repo: "git@github.com:EdwardRees/Todo-Project.git",
      path: "/var/www/html/todolist.edwardrees.info",
      ssh_options: "ForwardAgent=yes",
      "post-deploy": `${build} && pm2 reload pm2.config.js --env production && pm2 save`,
    },
  },
};