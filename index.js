var express = require('express');
var bodyParser = require('body-parser')
var swaggerJSdoc = require('swagger-jsdoc')
var swaggerExpress = require('swagger-ui-express');
var orders = require('./routes/orders');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const swaggerOptions = {
   swaggerDefinition:{
      info:{
         title:"Order Manager",
         version:"1.0.0",
         servers:["http://loclhost:8081"]
      }
   },
   apis: ['./routes*.js'],
}

const swaggerdoc = swaggerJSdoc(swaggerOptions)
console.log(swaggerdoc)
app.use('/api-docs',swaggerExpress.serve,swaggerExpress.setup(swaggerdoc))

/**
 * @swagger
 * /orders:
 *    get:
 *     description: Use to request
 *     responses:
 *       '200':
 *          description:A successfully respine
 *
*/
app.use('/orders',orders);

module.exports = server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   
   console.log("Example app listening at http://%s:%s", host, port)
})