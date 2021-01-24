

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/studentAnalysisDB";
let dbase;
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbase = db;
});
// exports default db = db;