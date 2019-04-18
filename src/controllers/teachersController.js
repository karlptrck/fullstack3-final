
import TeacherModel from '../models/teacher.js'
import error from '../error'
import validationHelper from '../validation'

const model = new TeacherModel()
const TEACHER_PARAMS = ['first_name', 'last_name']
const REQUIRED_PARAMS = ['first_name', 'last_name']

export default {
    list: async (req, res, next) => {
      try{
        const teachers = await model.getAllTeachers(next)
        res.status(200).json({
            teachers : teachers
        })
      }catch(err){
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    show: async (req, res, next) => {
      try {
        const teacherId = req.params.id * 1

        if(isNaN(teacherId))
        return res.status(400).send(error.INVALID_ID_PARAM)

        const requestTeacher = await model.findTeacherById(teacherId, next)
        
        if (requestTeacher !== undefined) {
          return res.send(requestTeacher)
        } else {
          return res.status(404).send(error.TEACHER_NOT_FOUND)
        }
      } catch (err) {
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    classes: async (req, res, next) => {
      try{
        const teacherId = req.params.id * 1

        if(isNaN(teacherId))
        return res.status(400).send(error.INVALID_ID_PARAM)

        const requestTeacher = await model.findTeacherById(teacherId, next)

        if(requestTeacher === undefined)
        return res.status(404).send(error.TEACHER_NOT_FOUND)

        const classes = await model.getAllClassesByTeacherId(teacherId, next)
        res.status(200).json({
          classes : classes
        })
      }catch(err){
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    create: async (req, res, next) => {
      try{
        const params = {
          ...req.body
        }

        if(!validationHelper.isValidParams(params, TEACHER_PARAMS))
        return res.status(400).send(error.INVALID_REQUEST_FIELDS)

        if (!validationHelper.hasValidRequiredParams(params, REQUIRED_PARAMS)) 
        return res.status(400).send(error.MISSING_REQUIRED_FIELDS)

        const teacherId = await model.createTeacher(params, next)
        const created = await model.findTeacherById(
          await teacherId.lastID,
          next
        )
        return res.status(200).send({
          teacher: created
        })
      }catch(err){
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    update: async (req, res, next) => {
      try{
          const id = req.params.id * 1

          if(isNaN(id))
          return res.status(400).send(error.INVALID_ID_PARAM)

          const updateTeacher = await model.findTeacherById(id, next)

          if(updateTeacher !== undefined){
            const params = {
              ...req.body
            }

           
            if(!validationHelper.isValidParams(params, TEACHER_PARAMS))
            return res.status(400).send(error.INVALID_REQUEST_FIELDS)

            if (!validationHelper.hasValidRequiredParams(params, REQUIRED_PARAMS)) 
            return res.status(400).send(error.MISSING_REQUIRED_FIELDS)
            
            await model.updateTeacher(id, params, next)
            const updated = await model.findTeacherById(id, next)
            return res.status(200).send({
              teacher: updated
            })

          }else{
            return res.status(404).send(error.TEACHER_NOT_FOUND)
          }
      }catch(err){
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    delete: async (req, res, next) => {
      try {
        const id = req.params.id * 1

        if(isNaN(id))
        return res.status(400).send(error.INVALID_ID_PARAM)

        const subjectTeacher = await model.findTeacherById(id, next)

        if (subjectTeacher === undefined) {
          return res.status(404).send(error.TEACHER_NOT_FOUND)
        } else {

          const activClasses = await model.getAllClassesByTeacherId(id, next)
          
          if(activClasses.length > 0)
          return res.status(200).send(error.UNABLE_TO_DELETE_TEACHER)

          const deleteTeacher = await model.deleteTeacher(id, next)
          if (deleteTeacher !== undefined || deleteTeacher !== null) {
            return res.status(200).send({
              id: id
            })
          } 
        }
      } catch (err) {
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    }
  }