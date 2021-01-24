'use strict';
var db = require("../../database/mongo/sudent");
var Student = require('./class')
var Student = new Student();

exports.filterStudentResultWithSubjectAndYear = function (req, res, next) {
	Student.validateBody(req);
	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if (reqBodyResult != null) return res.status(400).json(
		appFun.errorRes([{ message: reqBodyResult }])
	);
	let obj = {};
	if (req.body.subjects.length > 0) {
		obj["subject"] = {
			$in: req.body.subjects,
		};
	}
	if (req.body.year) {
		obj["calenderYear"] = req.body.year;
	}
	// if (req.body.studentId) {
	// 	obj["studentId"] = {
	// 		$in: req.body.studentId,
	// 	};
	// }
	console.info(obj)
	db.filterStudentResultWithSubjectAndYear(obj, (err, result) => {
		if (err) {
			return res.status(400).json(
				appFun.errorRes([{ message: result }]));
		} else {
			return res.status(200).json(appFun.successRes(result));
		}
	});
}

exports.filterStudentResultWithStudentId = function (req, res, next) {

	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if (reqBodyResult != null) return res.status(400).json(
		appFun.errorRes([{ message: reqBodyResult }])
	);
	db.getStudentDataByStudentId({studentId:parseInt(req.params.id)}, (err, result) => {
		
		if (err) {
			return res.status(400).json(
				appFun.errorRes([{ message: result }]));
		} else {
			
			let temYear = [];
			let yearIndexTem = 0;
			let temMarks = [];
			for(let i = 0; i < result.length; i++){
				// temYear.push(result[i].calenderYear)
				// let yearIndex = temYear.findIndex(StdData=>StdData.year===result[i].calenderYear);
				let yearIndex = temYear.findIndex(StdData=>StdData===result[i].calenderYear);
				if(yearIndex>=0){
					temMarks.push([getRandomInt(0.0,0.1)+yearIndex,result[i].mark]);
					// temYear[yearIndex]["marks"].push([getRandomInt(0.0,0.1)+yearIndex,result[i].mark]);
					// temMarks.push([getRandomInt(0.0,0.1)+yearIndexTem,result[i].mark]);
					// temYear[yearIndex]["marks"].push({mark:result[i].mark,subject:result[i].subject});
				}else{
					temYear.push(result[i].calenderYear)
					temMarks.push([getRandomInt(0.0,0.1)+yearIndexTem,result[i].mark]);
					// temYear.push({year:result[i].calenderYear,marks:[[getRandomInt(0.0,0.1)+yearIndexTem,result[i].mark]]})
					yearIndexTem++;
					// temYear.push({year:result[i].calenderYear,marks:[{mark:result[i].mark,subject:result[i].subject}]})
				}
			}
			console.info("----------------------1-----------------");
			return res.status(200).json(appFun.successRes({year:temYear,marks:temMarks}));
		}
	});
	function getRandomInt(min, max) {
		return (Math.random() * (max - min)) + min;
	}

}