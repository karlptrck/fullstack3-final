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
	UNABLE_TO_DELETE_TEACHER : new Error(21, 'Unable to delete teacher with active classes.'),
	STUDENT_NOT_FOUND : new Error(30, 'Student does not exist.'),
	STUDENT_INVALID_REQUEST_PARAM : new Error(31, 'Invalid request parameter.'),
	NO_DATA_TO_UPDATE : new Error(100, 'No data to update'),
	MISSING_REQUIRED_FIELDS : new Error(101, 'Missing required fields.'),
	INVALID_REQUEST_FIELDS : new Error(102, 'Invalid request fields.'),
	INVALID_ID_PARAM : new Error(110, 'Invalid ID. Must be a number.'),
	INTERNAL_SERVER_ERROR : new Error(500, 'Internal Server Error.')
}

module.exports = error