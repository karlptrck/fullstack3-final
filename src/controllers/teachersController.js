
import TeacherModel from '../models/teacher.js'
const model = new TeacherModel()

export default {
    list: async (req, res, next) => {
      try{
        const teachers = await model.getAllTeachers()
        res.status(200).json({
            teachers : teachers
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