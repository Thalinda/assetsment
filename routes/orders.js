
const express = require('express');
var sqlite3 = require('sqlite3').verbose();
var {DatabaseConnections} = require('../database/database');
var dobj = new DatabaseConnections();
const orders = express.Router();
var path = require('path');

orders.get('/', function (req, res) {
    dobj.SelecAllProducts((prds)=>{
        res.send(prds);
    })
 })

 orders.post('/add-order', function (req, res) {
    dobj.InsertNewOrder(req.body,1,(items)=>{
        res.send({'state':true})
    })
 })

 orders.post('/get-orders', function (req, res) {
    dobj.SelectOrder((items)=>{
        res.send({'state':true,items:items})
    })
 })


 
module.exports = orders;
 