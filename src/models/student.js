import BaseModel from './base'

const STUDENTS_TABLE_NAME = 'students'
export default class StudentModel extends BaseModel{

    async getAllStudents(next){
        return this.findAll(STUDENTS_TABLE_NAME, next)
    }

    async findStudentById(id, next){
       return this.findById(STUDENTS_TABLE_NAME, id, next)
    }

    async createStudent(params, next){
        return this.create(STUDENTS_TABLE_NAME, params, next)
    }

    async updateStudent(id, student, next){
        return this.update(STUDENTS_TABLE_NAME, id, student, next)
    }

    async deleteStudent(id, next){
        return this.destroy(STUDENTS_TABLE_NAME, id, next)
    }
}