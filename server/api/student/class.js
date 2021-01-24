class Student {

	constructor() {
	}

	validateBody(req,res) {
		req.checkBody('year', 'Invalid year').notEmpty().withMessage("year can not be empty");
		req.checkBody('subjects', 'Invalid subjects').notEmpty().withMessage("subjects can not be empty");
	}

}

  module.exports = Student;