require('dotenv').config();

const cluster = require('cluster');
const numCPUs = require('os').cpus().length

const { createServer } = require('./app')

if (cluster.isMaster) {
  console.log('Master process initiated! %i CPUs availiable', numCPUs);
  if (process.env.MULTI_CORE === '1') {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    console.log('Running on single core')
    cluster.fork()
  }
} else {
  console.log("Initiating child process", cluster.worker.id)
  createServer()
}

cluster.on('exit', (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
  console.log('Starting a new worker');
  cluster.fork();
})