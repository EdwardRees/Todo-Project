const name="todolist.edwardrees.info";
const user="erees";
const host="todolist.edwardrees.info";
const port=5750;
const build="yarn install; yarn build";

module.exports = {
  apps: [
    {
      name,
      script: 'yarn server',
      args: `--port ${port}`,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '74.207.247.118',
      ref: 'origin/master',
      repo: 'git@github.com:EdwardRees/Todo-Project.git',
      path: '/var/www/html/todolist.edwardrees.info',
      ssh_options: 'ForwardAgent=yes',
      'post-deploy': `${build} && pm2 reload ecosystem.config.js --env production && pm2 save`
    }
  }
}