var connection = require("../config/connection.js");

// I got these two helper functions from the cats orm example file.
function printQuestionMarks(num){
    var arr = [];

    for (var i=0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob){
    var arr = [];

    for (var key in ob){
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)){
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function (table, callback){
        var queryString = `SELECT * FROM ${table} ;` ;
        connection.query(queryString, function(err,result){
            if (err){
                throw err;
            }
            callback(result);
        });
    },
    
    insertOne: function (table, col, val, callback){
        var queryString = `INSERT INTO ${table} (${col.toString()}) VALUES (${printQuestionMarks(val.length)})`;
        connection.query(queryString, val, function(err,result){
            if (err){
                throw err;
            }
            callback(result);
        });
    },

    
    
    updateOne: function (table, objColVals, condition, callback){
        var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            callback(result);
        });
    }

};

module.exports = orm;