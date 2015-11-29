// basic server for static files
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/app'));
app.listen(process.env.PORT || 8000);

// pass ENV variables to js script
// var options = {};
// var jade = require('jade');

app.get('/getenv.js', function(req, res){
  if(process.env.REST_API_URL){
    res.send("var REST_API_URL='"+process.env.REST_API_URL+"';");
  } else {
    res.send("");
  }
});

// app.get("/rest/getenv", function(req, res) {
//     var env = process.env.ENV_VARIABLE;
//     res.json({result: env});
// });
