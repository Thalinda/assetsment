let chai = require('chai')
let chaiHttp = require('chai-http');
let server = require('../index')
chai.should()
chai.use(chaiHttp)

describe('TASK API',()=>{
    describe('GET /all Products',()=>{
        it("should get all products",(done)=>{
            chai.request(server).get('/orders')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array')
                done();
            })
        })
    })


    describe('GET /orders/get-orders',()=>{
        it("should get all orders in the que",(done)=>{
            chai.request(server).get('/orders/get-orders')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('state')
                res.body.should.have.property('items')
                done();
            })
        })
    })

    describe('PUT /orders/add-order',()=>{
        it("Should insert a new order to system",(done)=>{
            chai.request(server).put('/orders/add-order')
            .send(
                {
                    "items":[
                        {
                "product_id":4,
                "qty":5
                    },
                        {
                "product_id":3,
                "qty":10
                    },
                
                {
                "product_id":5,
                "qty":5
                    }
                    
                    ]
                }
            ).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('state')  
                done();
            })
        })
    })

})