const SQL = require('sql-template-strings')
import BaseModel from './base'

const TEACHERS_TABLE_NAME = 'teachers'
export default class TeacherModel extends BaseModel{

    async getAllTeachers(next){
        return this.findAll(TEACHERS_TABLE_NAME, next)
    }

    async findTeacherById(id, next){
        return this.findById(TEACHERS_TABLE_NAME, id, next)
    }
 
    async createTeacher(params, next){
         return this.create(TEACHERS_TABLE_NAME, params, next)
     }
 
    async updateTeacher(id, student, next){
         return this.update(TEACHERS_TABLE_NAME, id, student, next)
    }
 
    async deleteTeacher(id, next){
         return this.destroy(TEACHERS_TABLE_NAME, id, next)
    }

    async getAllClassesByTeacherId(id, next){
        try{
            return await this.db().all(
                    SQL `SELECT * FROM classes
                    WHERE teacher_id = ${id};`)
        }catch(err){
            next(err)
        }
    }
}