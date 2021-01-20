require('dotenv').config();

const cluster = require('cluster');
const numCPUs = require('os').cpus().length

const { createServer } = require('./app')

if (cluster.isMaster) {
  console.log('Master process initiated!', numCPUs, 'CPUs availiable.');
  const multiCore = process.env.MULTI_CORE === '1' ? true : false
  const maxCpus = parseInt(process.env.MAX_CPUS || 0)
  if (multiCore && maxCpus !== 1) {
    const maxClusters = numCPUs >= maxCpus ? maxCpus : numCPUs
    for (let i = 0; i < maxClusters; i++) {
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