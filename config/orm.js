var connection = require("../config/connection.js");

//needed to generate the correct number of '?s' for the methods defined
function getTheQs(num){
    var str = ""
    for(let i = 0; i<num; i++){
        str += "?";
    }
    return str.split("").join(",")
}


var orm = {
    all: function (table, cb) {
        var queryStr = "SELECT * FROM " + table + ";";
        connection.query(queryStr, function (err, result) {
            if (err) throw err;
            cb(result)
        });
    },

    create: function(table,cols,vals,cb){
        var queryStr = "INSERT INTO " +table;
        queryStr+= " (";
        queryStr+= cols.toString();
        queryStr+= ") VALUES (";
        queryStr+=getTheQs(vals.length);
        queryStr+= ") "

        console.log(queryStr);

        connection.query(queryStr, vals, function(err,result){
            if(err) throw err;
            cb(result);
        }) 
    },

    update: function(table,valsInSql,condition, cb){
        var queryStr = "UPDATE " + table;
        queryStr+= " SET " + valsInSql;
        queryStr+= " WHERE ";
        queryStr += condition;

        console.log(queryStr)

        connection.query(queryStr, function(err,result){
            if(err) throw err;
            cb(result);
        })
    },

    delete: function(table, condition, cb){
        var queryStr = "DELETE FROM " + table;
        queryStr+= " WHERE ";
        queryStr+= condition;

        console.log(queryStr)
        connection.query(queryStr, function(err,result){
            if(err) throw err;
            cb(result);
        })
    }

}

module.exports = orm;