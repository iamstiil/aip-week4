const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let store = {
  title: "People Places Things",
  date: "2015-08-01",
  duration: 85,
  genre: "Comedy",
  synopsis: "Will Henry is a newly single graphic novelist balancing parenting hisyoung twin daughters and a classroom full of students while exploringand navigating the rich complexities of new love and letting go of thewoman who left him."
}

app.use(bodyParser.json());

app.use(function(req, res, next) {
  var allowedOrigins = ['http://localhost:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.get('/*', (req, res) =>{
  res.send(JSON.stringify(store));
});

app.post('/*', (req, res) => {
  store = req.body;
  res.send();
});

app.listen(8080, () => {
  console.log("API up and running...")
});