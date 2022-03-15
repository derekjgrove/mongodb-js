const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
 
const numCPUs = require('os').cpus().length;


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
 
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
 
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}
 
else{

  const dbo = require('./singleton-conn');
  const app = express();

  app.use (function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
      data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
  });


  app.post('*', (req, res) => {
      var {collection, query, method} = JSON.parse(req.body)
      const dbClient = dbo.getDb()

      dbClient.collection(collection)[method](query).toArray(function (err, result) {
        if (err) {
          res.status(400).send('Error fetching listings!');
        } else {
          res.status(200).send(result);
        }
      });
      
    });               
 
  dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      console.log("Error in server setup")
      process.exit();
    }
  
    // start the Express server
    app.listen(8000, () => {
      console.log(`Worker ${process.pid} started`);
    });
  });
}
