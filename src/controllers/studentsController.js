
import StudentModel from '../models/student.js'
const model = new StudentModel()

export default {
    list: async (req, res, next) => {
      try{
        const students = await model.getAllStudents()
        res.status(200).json({
          students : students
        })
      }catch(err){
        next(err)
      }
    },
    create: (req, res, next) => {
      res.status(200).send({
        message: `POST route for comments for postID: ${req.postId}`
      })
    },
    delete: (req, res, next) => {
      res.status(200).send({
        message: `DELETE route for comments for postID: ${req.postId}`
      })
    }
  }