var express = require("express");

var rout = express.Router();

var menu = require ("../models/menu.js");

rout.get("/", function(req,res){
    menu.all(function(data){
        var orderRend = {
            menu: data
        };
        res.render("index", orderRend);
    })
});

module.exports = rout;
