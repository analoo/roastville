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

router.post("/api/orders", function(req,res){
    order.create([
        "item_id", "customer_name", "delivered"
    ], [req.body.item_id,req.body.customer_name,false
    ],
        function(result){
            console.log(result)
    });
});


module.exports = router;
