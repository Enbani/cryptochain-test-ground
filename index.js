const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const PubSub = require('./pubsub');
const Blockchain = require('./blockchain');


const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3001; //make this an env variable in future
const ROOT_NODE_ADDRESS =  `http://localhost:${DEFAULT_PORT}`;

app.use(bodyParser.json());

// GET - retrieve all blocks on the blockchain
app.get('/api/blocks', (req, res) => {
  res.send({ payload: blockchain.chain });
});

//POST - add a block to the blockchain
app.post('/api/mine', (req, res) => {
  let { data } = req.body;

  blockchain.addBlock({ data });

  pubsub.broadcastChain();

  res.redirect('/api/blocks');
});

const syncChains = async () => {

  try {
    let res = await axios.get(`${ROOT_NODE_ADDRESS}/api/blocks`);

    if (res.status === 200) {
      const rootChain = res.data.payload;
      console.log('replace chain on a sync with', rootChain);
      blockchain.replaceChain(rootChain);
    }

  } catch (err) {
    console.log('There was an error: ', err);
  }
};




let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`app server started on port: ${ PORT}`);
  syncChains();
});
