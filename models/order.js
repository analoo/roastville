var orm = require("../config/orm.js");

var order = {

    all: function (cb) {
        orm.all("orders INNER JOIN menu ON orders.item_id=menu.id INNER JOIN customer ON orders.customer_id=customer.id", function (res) {
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