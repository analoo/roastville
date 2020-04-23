var order = require ("../models/order.js");

router.get("/", function(req,res){
    order.all(function(data){
        var orderRend = {
            orders: data
        };

        console.log(orderRend);

        res.render("index", orderRend);
    })
})