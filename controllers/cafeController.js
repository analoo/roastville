var express = require("express");

var router = express.Router();

var order = require("../models/order.js");
var menu = require("../models/menu.js");


router.get("/", function (req, res) {
    menu.all(function (data) {
        var menuRend = {
            menu: data
        };
        res.render("index", menuRend);
    })
});

router.post("/api/orders", function (req, res) {
    order.create([
        "item_id", "customer_name", "delivered"
    ], [req.body.item_id, req.body.customer_name, false
    ], function (result) {
        var condition = `id = ${result.insertId}`;
        order.one(condition, function (data) {

            res.render("partials/cafe/cafe-block", {
                layout: false,
                id: data[0].id,
                item: data[0].item,
                customer_name: data[0].customer_name,
                delivered: data[0].delivered,
                price: data[0].price,
                time: data[0].time
            });

        });
    });
});


router.delete("/api/orders/:id", function (req, res) {
    var condition = " id = " + req.params.id;

    order.delete(condition, function (result) {
        res.send();
    });
});

router.delete("/api/orders", function (req, res) {
    var condition = " true";

    order.delete(condition, function (result) {
        res.send();
    });

});

router.put("/api/orders/:id", function (req, res) {
    var condition = " id = " + req.params.id;

    var vals = "delivered = true";

    order.update(vals, condition, function (result) {
        order.one(condition, function (data) {

            res.render("partials/cafe/cafe-block", {
                layout: false,
                id: data[0].id,
                item: data[0].item,
                customer_name: data[0].customer_name,
                delivered: data[0].delivered,
                price: data[0].price,
                time: data[0].time
            });
    
        });
    });

    
});

module.exports = router;
