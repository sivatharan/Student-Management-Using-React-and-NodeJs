
// var connect = require("./connection");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
let dbName = "DataGenerationDB";

exports.filterStudentResultWithSubjectAndYear = function (obj, cb) {
  MongoClient.connect(url, function (err, client) {
    if (err) cb(true, err)
    const db = client.db(dbName);
    db.collection("student").find(obj).toArray((error, result) => {
      client.close();
      if (error) return cb(true, error);
      return cb(false, result);
    });
  });
}

exports.getStudentDataByStudentId = function (obj, cb) {
  MongoClient.connect(url, function (err, client) {
    if (err) cb(true, err)
    const db = client.db(dbName);
   console.info(obj);
    db.collection("student").find(obj).toArray((error, result) => {
      client.close();
      if (error) return cb(true, error);
      return cb(false, result);
    });
  });
}

