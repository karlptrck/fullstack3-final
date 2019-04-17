/* List of all available error codes */

class Error{
	constructor(code, message){
		this.errorCode = code
		this.errorMessage = message
	}
}

const error = {
    CLASS_NOT_FOUND : new Error(10, 'Class does not exist.'),
	TEACHER_NOT_FOUND : new Error(20, 'Teacher does not exist.'),
	STUDENT_NOT_FOUND : new Error(30, 'Student does not exist.'),
	NO_DATA_TO_UPDATE : new Error(100, 'No data to update')
}

module.exports = error