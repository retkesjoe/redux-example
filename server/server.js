const express = require('express');
const cors = require('cors');
const app = express();

var allowedOrigins = ['http://localhost:3000',
                      'http://localhost:8000'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.get('/api/users/:id', cors(), (req, res, next) => {
  res.json({"id":2,"first_name":"Janet","last_name":"Weaver","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"});
});

const hostname = '127.0.0.1';
const port = 8000;
app.listen(port, () => {
  console.log(`Serving running at http://${hostname}:${port}/`);
});