const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');


const app = express();
const blockchain = new Blockchain();
const PORT = 3001; //make this an env variable in future

app.use(bodyParser.json());

// GET - retrieve all blocks on the blockchain
app.get('/api/blocks', (req, res) => {
  res.send({ payload: blockchain.chain });
});

//POST - add a block to the blockchain
app.post('/api/mine', (req, res) => {
  let { data } = req.body;

  blockchain.addBlock({ data });

  res.redirect('/api/blocks');
});


app.listen(PORT, () => {
  console.log('app server started on port: ', PORT);
});
