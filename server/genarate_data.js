
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
let dbase;
let initialSub = 999;
let totalSub = 1000;
MongoClient.connect(url, function (err, db) {

    if (err) throw err;
    dbase = db;
    subjectN0 = 1;
    studentArray = [];
    console.log("Successfully connected to MongoDB!");
    for (let i = 1; i <= 20; i++) {//student
        for (let y = 0; y <= 9; y++) {//grande
            for (let j = 1; j <= 2; j++) {//semester
                for (let k = subjectN0; k <= subjectN0 + initialSub; k++) {//subject
                    let student = {
                        studentId: i,
                        subject: "Subject" + k,
                        mark: getRandomInt(20,100),
                        semester: "201" + y + "-" + j,
                        studentName: "student" + i,
                        grade: y + 1,
                        calenderYear: 2010 + y,
                    };
                    studentArray.push(student);
                }

                subjectN0 = subjectN0 + totalSub;
            }
        }
        subjectN0 = 1;
    }

    insertData(db,studentArray);

});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insertData(client,stdArray) {
    if (stdArray.length == 0) {
        client.close();
        console.log('-----------All the record are inserted successfully--------------');
    }
    if (stdArray.length > 0) {
        const db = client.db("DataGenerationDB");
        var tempArray = stdArray.slice(0, 100000);
        db.collection("student").insertMany(tempArray, function (err, res) {
            if (err) throw err;
            stdArray.splice(0, 100000)
            insertData(client,stdArray);
            if(stdArray.length!=0){                
                console.log('inserted record 100000, Please wait untill insert '+stdArray.length);
            }
        });
    }

}