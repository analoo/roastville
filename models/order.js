var orm = require("../config/orm.js");

var order = {

    all: function (cb) {
        orm.all("orders INNER JOIN menu ON orders.item_id=menu.menu_id;", function (res) {
            cb(res)
        });
    },

    one: function (condition,cb) {
        orm.one("orders INNER JOIN menu ON orders.item_id=menu.menu_id", condition,function (res) {
            cb(res)
        });
    },

    //  
    create: function (cols, vals, cb) {
        orm.create("orders", cols, vals, cb, function (res) {
            cb(res)
        });
    },

    update: function(vals,condition,cb){
        orm.update("orders", vals, condition, function(res){
            cb(res);
        });
    },

    delete: function(condition, cb){
        orm.delete("orders", condition, function(res){
            cb(res)
        });
    }
}

module.exports = order;