import BaseModel from './base'

export default class TeacherModel extends BaseModel{

    async getAllTeachers(){
        return this.findAll('teachers')
    }
}