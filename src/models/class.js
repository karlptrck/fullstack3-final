const SQL = require('sql-template-strings')
import BaseModel from './base'

const CLASS_TABLE_NAME = 'classes'
export default class ClassModel extends BaseModel{

    async getAllClasses(next){
        return this.findAll(CLASS_TABLE_NAME, next)
    }

    async updateClass(id, classObj, next){
        return this.update(CLASS_TABLE_NAME, id, classObj, next)
    }

    async deleteClass(id, next){
        return this.destroy(CLASS_TABLE_NAME, id, next)
    }

    async createClass(params, next){
        return this.create(CLASS_TABLE_NAME, params, next)
    }

    async findClassById(id, next){
        try{
            return await this.db().get(
                    SQL `SELECT c.id, c.code, c.name, 
                    t.first_name || ' ' || t.last_name AS teacher, 
                    c.start_date, c.end_date FROM classes c 
                    INNER JOIN teachers t ON c.teacher_id = t.id 
                    WHERE c.id = ${id};`)
        }catch(err){
            next(err)
        }
    }

    async getEnrolledStudentsByClassId(classId, next){
        try{
            return await this.db().all(
                SQL `SELECT id, first_name as firstname, last_name as lastname 
                FROM students WHERE id IN (SELECT student_id FROM student_classes 
                WHERE class_id = ${classId});`
            )
        }catch(err){
            next(err)
        }
    }

    async enrollStudent(classId, studentId, next){
        try{
            return await this.db().run(
                SQL `INSERT INTO student_classes(class_id, student_id)
                VALUES(${classId}, ${studentId});`
            )
        }catch(err){
            next(err)
        }
    }

    async removeStudent(classId, studentId, next){
        try {
            return await this.db().run(`DELETE FROM student_classes 
                WHERE class_id=${classId} AND student_id=${studentId}`)
		} catch (err) {
			next(err)
		}
    }

}

