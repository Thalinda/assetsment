var express = require('express');
var bodyParser = require('body-parser')
var orders = require('./routes/orders');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/orders',orders);




module.exports = server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   
   console.log("Example app listening at http://%s:%s", host, port)
})