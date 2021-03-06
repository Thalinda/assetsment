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
   apis: ['index.js'],
}

const swaggerdoc = swaggerJSdoc(swaggerOptions)
console.log(swaggerdoc)
app.use('/api-docs',swaggerExpress.serve,swaggerExpress.setup(swaggerdoc))


// Routes
/**
 * @swagger
 * /orders:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */


// Routes
/**
 * @swagger
 * /orders/get-orders:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */


// Routes
/**
 * @swagger
 * /orders/add-order:
 *  put:
 *    description: Add new Order
 *    parameters:
 *       - in: body
 *         description: Add new order pass array of object
 *         required: true
 *         schema:
 *           type: object
 *           items:
 * 
 *                   
 *    responses:
 *      '200':
 *        description: A successful response
 */

/**
* @swagger
*  /api/addData:
*    post:
*      summary: Creates a new message.
*      consumes:
*        - application/json
*      tags:
*        - Create a new message
*      parameters:
*        - in: body
*          name: object
*          description: The user to create.
*          schema:
*            type: object
*            required:
*              - items
*            properties:
*              items:
*                type: string
*      responses:
*        201:
*          description: New message created!
*/
app.use('/orders',orders);

module.exports = server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   
   console.log("Example app listening at http://%s:%s", host, port)
})