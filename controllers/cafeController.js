var express = require("express");

var router = express.Router();

var order = require("../models/order.js");

router.get("/", function (req, res) {
    order.all(function (data) {
        var orderRend = {
            orders: data
        };
        res.render("index", orderRend);
    })
});

router.post("/api/orders", function (req, res) {
    order.create([
        "item_id", "customer_name", "delivered"
    ], [req.body.item_id, req.body.customer_name, false
    ], function (result) {
        var condition = `id = ${result.insertId}`;
        order.one(condition, function (data) {
            res.json(data)
        });
    });
});


router.delete("/api/orders/:id", function (req, res) {
    var condition = " id = " + req.params.id;
    console.log("condition", condition)

    order.delete(condition, function (result) {
        res.send();
        console.log(result)
    });
});

router.put("/api/orders/:id", function (req, res) {
    var condition = " id = " + req.params.id;

    var vals = "delivered = true";

    order.update(vals, condition, function (result) {
        res.send();
        console.log(result)
    });
});

module.exports = router;
