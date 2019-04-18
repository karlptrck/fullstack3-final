
import StudentModel from '../models/student.js'
import error from '../error'
import validationHelper from '../validation'

const model = new StudentModel()
const STUDENT_PARAMS = ['first_name', 'last_name']
const REQUIRED_PARAMS = ['first_name', 'last_name']

export default {
    list: async (req, res, next) => {
      try{
        const students = await model.getAllStudents(next)
        res.status(200).json({
          students : students
        })
      }catch(err){
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    show: async (req, res, next) => {
      try {
        const studentId = req.params.id * 1

        if(isNaN(studentId))
        return res.status(400).send(error.INVALID_ID_PARAM)

        const requestStudent = await model.findStudentById(studentId, next)
        
        if (requestStudent !== undefined) {
          return res.send(requestStudent)
        } else {
          return res.status(404).send(error.STUDENT_NOT_FOUND)
        }
      } catch (err) {
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    create: async (req, res, next) => {
      try{
        const params = {
          ...req.body
        }

        if(!validationHelper.isValidParams(params, STUDENT_PARAMS))
        return res.status(400).send(error.INVALID_REQUEST_FIELDS)

        if (!validationHelper.hasValidRequiredParams(params, REQUIRED_PARAMS)) 
        return res.status(400).send(error.MISSING_REQUIRED_FIELDS)

        const studentId = await model.createStudent(params, next)
        const created = await model.findStudentById(
          await studentId.lastID,
          next
        )
        return res.status(200).send({
          student: created
        })
      }catch(err){
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    classes: async (req, res, next) => {
      try {
        const studentId = req.params.id * 1

        if(isNaN(studentId))
        return res.status(400).send(error.INVALID_ID_PARAM)

        const requestStudent = await model.findStudentById(studentId, next)

        if (requestStudent !== undefined) {
          const classes = await model.getAllClassesByStudentId(studentId, next)
          return res.send({
            classes : classes
          })
        } else {
          return res.status(404).send(error.STUDENT_NOT_FOUND)
        }
      } catch (err) {
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    update: async (req, res, next) => {
      try{
          const id = req.params.id * 1

          if(isNaN(id))
          return res.status(400).send(error.INVALID_ID_PARAM)

          const updateStudent = await model.findStudentById(id, next)

          if(updateStudent !== undefined){
            const params = {
              ...req.body
            }

            if(!validationHelper.isValidParams(params, STUDENT_PARAMS))
            return res.status(400).send(error.INVALID_REQUEST_FIELDS)
    
            if (!validationHelper.hasValidRequiredParams(params, REQUIRED_PARAMS)) 
            return res.status(400).send(error.MISSING_REQUIRED_FIELDS)

            await model.updateStudent(id, params, next)
            const updated = await model.findStudentById(id, next)
            return res.status(200).send({
              student: updated
            })

          }else{
            return res.status(404).send(error.STUDENT_NOT_FOUND)
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
        
        const subjectStudent = await model.findStudentById(id, next)
        if (subjectStudent === undefined) {
          return res.status(404).send(error.STUDENT_NOT_FOUND)
        } else {
          const deleteStudent = await model.deleteStudent(id, next)
          if (deleteStudent !== undefined || deleteStudent !== null) {
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