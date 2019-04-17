import BaseModel from './base'

export default class StudentModel extends BaseModel{

    async getAllStudents(){
        return this.findAll('students')
    }
}