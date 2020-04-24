var express = require("express");

var router = express.Router();

var order = require ("../models/order.js");

router.get("/", function(req,res){
    order.all(function(data){
        var orderRend = {
            orders: data
        };
        console.log(orderRend);
        res.render("index", orderRend);
    })
});

router.post("/", function(req,res){
    order.create([
        "order_id", "item_id", "customer_id", "delivered"
    ], [req.body.order_id,req.body.item_id,req.body.customer_id,false
    ],
        function(result){
            console.log(result)
    });
});


module.exports = router;
