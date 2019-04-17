const SQL = require('sql-template-strings')
import BaseModel from './base'

const CLASS_TABLE_NAME = 'classes'
export default class ClassModel extends BaseModel{

    async getAllClasses(next){
        return this.findAll(CLASS_TABLE_NAME, next)
    }

    async createClass(params, next){
        return this.create(CLASS_TABLE_NAME, params, next)
    }

    async updateClass(id, classObj, next){
        return this.update(CLASS_TABLE_NAME, id, classObj, next)
    }

    async deleteClass(id, next){
        return this.destroy(CLASS_TABLE_NAME, id, next)
    }

    async findById(id, next){
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


    // async create(classObj, next){
    //     try{
    //         return await this.db().run(
    //                 SQL `INSERT INTO classes(code, name, teacher_id)
    //                 VALUES(${classObj.code}, ${classObj.name}, ${classObj.teacher_id})`
    //         )
    //     }catch(err){
    //         next(err)
    //     }
    // }

}

