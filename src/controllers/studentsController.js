
import StudentModel from '../models/student.js'
import error from '../error'

const model = new StudentModel()

export default {
    list: async (req, res, next) => {
      try{
        const students = await model.getAllStudents(next)
        res.status(200).json({
          students : students
        })
      }catch(err){
        next(err)
      }
    },
    show: async (req, res, next) => {
      try {
        const studentId = req.params.id * 1
        const requestStudent = await model.findStudentById(studentId, next)
        
        if (requestStudent !== undefined) {
          return res.send(requestStudent)
        } else {
          return res.status(404).send(error.STUDENT_NOT_FOUND)
        }
      } catch (err) {
        next(err)
      }
    },
    create: async (req, res, next) => {
      try{
        const params = {
          ...req.body
        }

        const studentId = await model.createStudent(params, next)
        const created = await model.findStudentById(
          await studentId.lastID,
          next
        )
        return res.status(200).send({
          student: created
        })
      }catch(err){
        next(err)
      }
    },
    classes: async (req, res, next) => {
      try {
        const studentId = req.params.id * 1
        const requestStudent = await model.findStudentById(studentId, next)
        
        if (requestStudent !== undefined) {
          const classes = await model.getAllClassesByStudentId(studentId, next)
          return res.send(JSON.stringify(classes))
        } else {
          return res.status(404).send(error.STUDENT_NOT_FOUND)
        }
      } catch (err) {
        next(err)
      }
    },
    update: async (req, res, next) => {
      try{
          const id = req.params.id * 1
          const updateStudent = await model.findStudentById(id, next)

          if(updateStudent !== undefined){
            const params = {
              ...req.body
            }

            if (Object.keys(params).length === 0) {
              res.status(200).send(error.NO_DATA_TO_UPDATE)
            }
            await model.updateStudent(id, params, next)
            const updated = await model.findStudentById(id, next)
            return res.status(200).send({
              student: updated
            })

          }else{
            return res.status(404).send(error.STUDENT_NOT_FOUND)
          }
      }catch(err){
        next(err)
      }
    },
    delete: async (req, res, next) => {
      try {
        const id = req.params.id * 1
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
        next(err)
      }
    }
  }