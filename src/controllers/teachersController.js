
import TeacherModel from '../models/teacher.js'
import error from '../error'

const model = new TeacherModel()

export default {
    list: async (req, res, next) => {
      try{
        const teachers = await model.getAllTeachers(next)
        res.status(200).json({
            teachers : teachers
        })
      }catch(err){
        next(err)
      }
    },
    show: async (req, res, next) => {
      try {
        const teacherId = req.params.id * 1
        const requestTeacher = await model.findTeacherById(teacherId, next)
        
        if (requestTeacher !== undefined) {
          return res.send(requestTeacher)
        } else {
          return res.status(404).send(error.TEACHER_NOT_FOUND)
        }
      } catch (err) {
        next(err)
      }
    },
    classes: async (req, res, next) => {
      try{
        const teacherId = req.params.id * 1
        const requestTeacher = await model.findTeacherById(teacherId, next)

        if(requestTeacher === undefined)
        return res.status(404).send(error.TEACHER_NOT_FOUND)

        const classes = await model.getAllClassesByTeacherId(id, next)
        res.status(200).json({
          classes : classes
        })
      }catch(err){
        next(err)
      }
    },
    create: async (req, res, next) => {
      try{
        const params = {
          ...req.body
        }

        const teacherId = await model.createTeacher(params, next)
        const created = await model.findTeacherById(
          await teacherId.lastID,
          next
        )
        return res.status(200).send({
          teacher: created
        })
      }catch(err){
        next(err)
      }
    },
    update: async (req, res, next) => {
      try{
          const id = req.params.id * 1
          const updateTeacher = await model.findTeacherById(id, next)

          if(updateTeacher !== null){
            const params = {
              ...req.body
            }

            if (Object.keys(params).length === 0) {
              res.status(200).send(error.NO_DATA_TO_UPDATE)
            }
            await model.updateTeacher(id, params, next)
            const updated = await model.findTeacherById(id, next)
            return res.status(200).send({
              teacher: updated
            })

          }else{
            return res.status(404).send(error.TEACHER_NOT_FOUND)
          }
      }catch(err){
        next(err)
      }
    },
    delete: async (req, res, next) => {
      try {
        const id = req.params.id * 1
        const subjectTeacher = await model.findTeacherById(id, next)
        if (subjectTeacher === null) {
          return res.status(404).send(error.TEACHER_NOT_FOUND)
        } else {
          const deleteTeacher = await model.deleteTeacher(id, next)
          if (deleteTeacher !== undefined || deleteTeacher !== null) {
            return res.status(200).send({
              id: id
            })
          } 
        }
      } catch (err) {
        next(err)
      }
    }
  }