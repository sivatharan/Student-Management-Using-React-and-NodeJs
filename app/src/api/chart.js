import axios from 'axios';
import config from './config'
const baseUrl = "http://localhost:9000/api/v1";
export default class ChartApi {

	static getStudentDataWithYearAndSubjectFilter(data) {
		return axios.post(baseUrl+"/student/filter",data)
		.then(res => {
			return res;
		}).catch(err=> {
			return err;
		});
	}

	static getStudentDataByStudentId(studentId) {
		return axios.get(baseUrl+'/student/'+studentId,{headers:{"Content-Type": "application/json; charset=utf-8"}})
		.then(res => {
			return res;
		}).catch(err=> {
			// return err;
		});
	}
}