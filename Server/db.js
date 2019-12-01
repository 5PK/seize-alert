//StAuth10065: I JSteven Luke Thompson, 000736020 certify that this material is my original work.
//No other person's work has been used without due acknowledgement.
//I have not made my work available to anyone else.

var sqlite3 = require("sqlite3").verbose();
var file = "api.db";

var db = new sqlite3.Database(file);

db.serialize( function(){
    db.run("DROP TABLE IF EXISTS Users");
    db.run("CREATE TABLE Data (ZeroId TEXT, ZeroData TEXT, OneId TEXT, OneData TEXT, Timestamp TEXT)");
});

module.exports = db;