module.exports = {
  apps: [{
    name: "node-ts-backend",
    instances: "3",
    watch: '.',
    interpreter: "./node_modules/.bin/ts-node",
    interpreter_args: '-r ts-node/register -r tsconfig-paths/register',
    script: "index.ts"
  }]
}
