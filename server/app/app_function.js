/*common function here*/

exports.isInt = function (n) {
	return Number(n) === n && n % 1 === 0;
}

exports.isFloat = function (n) {
	// console.info('----',n);
	n = parseFloat(n);
	return Number(n) === n && n % 1 !== 0;
}

exports.isString = function (s) {
	if (s.length == 0) return false;
	return typeof s === 'string' || s instanceof String;
}


function getDate(dt) {

	var year = dt.getFullYear();
	var month = dt.getMonth() + 1;
	if (month <= 9) month = '0' + month;

	var day = dt.getDate();
	if (day <= 9) day = '0' + day;

	var prettyDate = year + '-' + month + '-' + day;
	return prettyDate;

}

function getTime(dt) {
	var h = (dt.getHours() < 10 ? '0' : '') + dt.getHours(),
		m = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes(),
		s = (dt.getSeconds < 10 ? '0' : '') + dt.getSeconds();
	return h + ':' + m + ':' + s;
}

exports.getDateTime = function (dt) {
	var date = new Date(dt);
	return getDate(date) + " " + getTime(date);
}

exports.isObject = function (a) {
	return (!!a) && (a.constructor === Object);
};

exports.isArray = function (a) {
	return (!!a) && (a.constructor === Array);
};

exports.contentType = function (req) {
	if (req.get('Content-Type') == 'application/json') return 'json'
	if (req.get('Content-Type') == 'application/json;charset=UTF-8') return 'json'

	else return 'json'
};


exports.getTimeDiff = function (start, end, message) {
	var seconds = (end.getTime() - start.getTime()) / 1000;
	console.info("--" + message + "---", seconds);
}

exports.reqBodyValidation = function (req) { // request body full valiation here
	var errors = req.validationErrors();
	if (appFun.contentType(req) != 'json') {
		return 'Content type must be json';
	}
	if (errors) {
		return errors;
	}
	return null;
}

exports.successRes = function (data) {
	return {
		"result": data,
		"isError": false,
		"error": []
	}
}
exports.errorRes = function (error) {
	return {
		"result": {},
		"isError": true,
		"error": error
	}
}