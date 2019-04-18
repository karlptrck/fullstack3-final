
import ClassModel from '../models/class.js'
import error from '../error'
import validationHelper from '../validation'

const model = new ClassModel()
const CLASS_PARAMS = ['code', 'name', 'teacher_id', 'start_date', 'end_date']
const REQUIRED_PARAMS = ['code', 'name', 'teacher_id']

export default {
    list: async (req, res, next) => {
      try{
        const classes = await model.getAllClasses(next)
        res.status(200).json({
          classes : classes
        })
      }catch(err){
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    show: async (req, res, next) => {
      try {
        const classId = req.params.id * 1

        if(isNaN(classId))
        return res.status(400).send(error.INVALID_ID_PARAM)

        const requestClass = await model.findClassById(classId, next)
        
        if (requestClass !== undefined) {
          res.send(requestClass)
        } else {
          res.status(404).send(error.CLASS_NOT_FOUND)
        }
      } catch (err) {
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    create: async (req, res, next) => {
      try{
        const classObj = {
          ...req.body
        }
 
        if(!validationHelper.isValidParams(classObj, CLASS_PARAMS))
        return res.status(400).send(error.INVALID_REQUEST_FIELDS)

        if (!validationHelper.hasValidRequiredParams(classObj, REQUIRED_PARAMS)) 
        return res.status(400).send(error.MISSING_REQUIRED_FIELDS)

        const teacher = await model.findById('teachers', classObj.teacher_id * 1, next)
        if(teacher === undefined)
        return res.status(404).send(error.TEACHER_NOT_FOUND)

        const classId = await model.createClass(classObj, next)
        const created = await model.findClassById(
          await classId.lastID,
          next
        )
        res.status(200).send({
          class: created
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

          const updateClass = await model.findClassById(id, next)

          if(updateClass !== undefined){
            const params = {
              ...req.body
            }

            if(!validationHelper.isValidParams(params, CLASS_PARAMS))
            return res.status(400).send(error.INVALID_REQUEST_FIELDS)
    
            if (!validationHelper.hasValidRequiredParams(params, REQUIRED_PARAMS)) 
            return res.status(400).send(error.MISSING_REQUIRED_FIELDS)
    
            const teacher = await model.findById('teachers', params.teacher_id * 1, next)
            if(teacher === undefined)
            return res.status(404).send(error.TEACHER_NOT_FOUND)

            await model.updateClass(id, params, next)
            const updated = await model.findClassById(id, next)
            return res.status(200).send({
              class: updated
            })

          }else{
            return res.status(404).send(error.CLASS_NOT_FOUND)
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

        const subjectClass = await model.findClassById(id, next)
        if (subjectClass === undefined) {
          return res.status(404).send(error.CLASS_NOT_FOUND)
        } else {
          const deleteClass = await model.deleteClass(id, next)
          if (deleteClass !== undefined || deleteClass !== null) {
            return res.status(200).send({
              id: id
            })
          } 
        }
      } catch (err) {
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    getEnrolledStudents: async (req, res, next) => {
      try{
        const class_id = req.params.class_id * 1
        const subjectClass = await model.findClassById(class_id, next)
        
        if (subjectClass === undefined) {
          return res.status(404).send(error.CLASS_NOT_FOUND)
        }else {
          const students = await model.getEnrolledStudentsByClassId(class_id)
          return res.status(200).send(JSON.stringify(students))
        }

      }catch(err){
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    enroll: async (req, res, next) => {
      try{
        const class_id = req.params.class_id * 1

        if(isNaN(class_id))
        return res.status(400).send(error.INVALID_ID_PARAM)

        const subjectClass = await model.findClassById(class_id, next)
        
        if(subjectClass !== undefined){
          const params = {
            ...req.body
          }
       
          if (Object.keys(params).length === 0 || !params.hasOwnProperty('student_id')) {
            return res.status(200).send(error.STUDENT_INVALID_REQUEST_PARAM)
          }
          const student_id = params.student_id * 1

          if(isNaN(student_id))
          return res.status(400).send(error.INVALID_ID_PARAM)

          const student = await model.findById('students', student_id, next)
          
          if(student === undefined){
            res.status(404).send(error.STUDENT_NOT_FOUND)
          } else {
            await model.enrollStudent(class_id, student_id, next)
            return res.status(200).send({
              message : 'Enrolled Successfully',
              student : student
            })
          }
        
        }else{
          return res.status(404).send(error.CLASS_NOT_FOUND)
        }

      }catch(err){
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    },
    removeStudent: async (req, res, next) => {
      try{
        const class_id = req.params.class_id * 1

        if(isNaN(class_id))
        return res.status(400).send(error.INVALID_ID_PARAM)

        const subjectClass = await model.findClassById(class_id, next)
        
        if(subjectClass !== undefined){
          
          const student_id = req.params.id * 1

          if(isNaN(student_id))
          return res.status(400).send(error.INVALID_ID_PARAM)

          const student = await model.findById('students', student_id, next)
          
          if(student === undefined){
            res.status(404).send(error.STUDENT_NOT_FOUND)
          } else {
            await model.removeStudent(class_id, student_id, next)
            return res.status(200).send({
              message : 'Removed Successfully',
              student : student
            })
          }
        
        }else{
          return res.status(404).send(error.CLASS_NOT_FOUND)
        }

      }catch(err){
        console.log(err)
        res.status(500).send(error.INTERNAL_SERVER_ERROR)
      }
    }
  }