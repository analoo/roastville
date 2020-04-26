var orm = require("../config/orm.js");

var menu = {

    all: function (cb) {
        orm.all("menu;", function (res) {
            cb(res)
        });
    },

}

module.exports = menu;