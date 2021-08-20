var sqlite3 = require('sqlite3').verbose();
var path = require('path')
var database = new sqlite3.Database(path.resolve(__dirname,'database.db'));

 class DatabaseConnections{
     constructor(){
      var create = `CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT,order_placed_by INTEGER,order_place_at TEXT DEFAULT CURRENT_TIMESTAMP,order_state INTEGER)`
       var create_products = `CREATE TABLE IF NOT EXISTS products (
           products_id INTEGER PRIMARY KEY AUTOINCREMENT,
           products_name TEXT,
           state INTEGER
       )`;
       var ordered_products = `CREATE TABLE IF NOT EXISTS ordered_items (id INTEGER PRIMARY KEY AUTOINCREMENT,order_id INTEGER,prd_id INTEGER,qty INTEGER,state INTEGER)`;

       database.run(create_products,(res,err)=>{
           database.run(create,(res,err)=>{
               database.run(ordered_products,(res,err)=>{
                   this.SelecAllProducts((prodcts)=>{
                       if(prodcts.length===0){
                        this.InsertListTempProducts(()=>{
                        })
                       }else{
                        //    console.log(prodcts)
                       }
                   })
                   
               })
           })
       })
     }

   

     SelecAllProducts(callback){
         let select = "SELECT * FROM products";
         database.all(select,[],function(err,res){
           callback(res)
         })
     }

     SelectOrderItemsAll(callback){
        let select = "SELECT * FROM ordered_items";
        database.all(select,[],function(err,res){
          callback(res)
        })
    }
     InsertListTempProducts(callback){
         let insert = "INSERT INTO products (products_name,state) VALUES (?,?)";
         let a = 0;
         let prd = [{
             "prd_name":"Soup",
             "state":1
         },
         {
            "prd_name":"Chicken curry",
            "state":1
        },
        {
            "prd_name":"Fish curry",
            "state":1
        },
        {
            "prd_name":"Soup",
            "state":1
        },
        {
            "prd_name":"Lump Rice",
            "state":1
        },
        {
            "prd_name":"Naci Guran",
            "state":1
        },
        ];
        prd.forEach(element => {
           let param = [element.prd_name,element.state];
           database.run(insert,param,function(err){
               if(err){console.log(err)}
                
               a++;
               if(prd.length===a){
                  
                   callback()
               }
           })

        });
     }

     InsertNewOrder(order,user_id,callback){
       try {
        let slf = this;
        let sql = `INSERT INTO orders 
        (order_placed_by,
            order_place_at,
        order_state) VALUES (?,CURRENT_TIMESTAMP,3)`;
        let params = [user_id]
        database.run(sql,params,function(err){
        if(err){console.trace(err)}
        slf.InsertOrderedItems(order.items,this.lastID,()=>{
                callback([])
            })
            
        }) 
       } catch (error) {
        console.log(error)
       }
     }

     
     InsertOrderedItems(ordered_items,order_id,callback){
         let sql =`INSERT INTO ordered_items (
            order_id,
            prd_id,
            qty,
            state) VALUES (?,?,?,?)`;
            let a = 0;
        ordered_items.forEach(element => {
            let params = [order_id,element.product_id,element.qty,1]
            database.run(sql,params,(err)=>{
                if(err){console.log(err)}
                a++;
                if(a===ordered_items.length){
                    callback()
                }
            })
        });
     }


     SelectOrderedItems(order_id,callback){
         let se = "SELECT ordered_items.*,products.* FROM ordered_items INNER JOIN products ON products.products_id = ordered_items.prd_id WHERE ordered_items.order_id = ?";
         database.all(se,[order_id],function(err,res){
             if(err){console.log(err)}
            callback(res)
          })
      

     }

    SelectOrder(callback){
        let order = "SELECT * FROM orders WHERE order_state =3";
        let orders = [];
        database.all(order,[],(err,items_list)=>{
            items_list.forEach(element => {
               
            this.SelectOrderedItems(element.order_id,(res)=>{
                orders.push({order_id:element.order_id,orders:res});
                if(orders.length===items_list.length){
                    callback(orders)
                }
            });
           
            
        });
            
        })
    }

    

 }

 module.exports = {DatabaseConnections}