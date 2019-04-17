
import ClassModel from '../models/class.js'
const model = new ClassModel()

export default {
    list: async (req, res, next) => {
      try{
        const classes = await model.getAllClasses(next)
        res.status(200).json({
          classes : classes
        })
      }catch(err){
        next(err)
      }
    },
    show: async (req, res, next) => {
      try {
        const classId = req.params.id * 1
        const requestClass = await model.findById(classId, next)
        if (requestClass !== undefined) {
          return res.send(requestClass)
        } else {
          return res.status(404).end()
        }
      } catch (err) {
        next(err)
      }
    },
    create: async (req, res, next) => {
      try{
        const classObj = {
          ...req.body
        }

        const classId = await model.createClass(classObj, next)
        const created = await model.findById(
          await classId.lastID,
          next
        )
        return res.status(200).send({
          class: created
        })
      }catch(err){
        next(err)
      }

    },
    update: async (req, res, next) => {
      try{
          const id = req.params.id * 1
          const updateClass = await model.findById(id, next)

          if(updateClass !== null){
            const params = {
              ...req.body
            }

            if (Object.keys(params).length === 0) {
              res.status(200).send({
                error: 'No data to update'
              })
            }
            await model.updateClass(id, params, next)
            const updated = await model.findById(id, next)
            return res.status(200).send({
              class: updated
            })

          }else{
            res.status(404).send({
              errors: 'relevant resource does not exist'
            })
          }
      }catch(err){
        next(err)
      }
    },
    delete: (req, res, next) => {
      res.status(200).send({
        message: `DELETE route for comments for postID: ${req.postId}`
      })
    }
  }