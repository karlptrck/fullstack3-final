
import ClassModel from '../models/class.js'
import error from '../error'

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
        const requestClass = await model.findClassById(classId, next)
        
        if (requestClass !== undefined) {
          return res.send(requestClass)
        } else {
          return res.status(404).send(error.CLASS_NOT_FOUND)
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
              res.status(200).send(error.NO_DATA_TO_UPDATE)
            }
            await model.updateClass(id, params, next)
            const updated = await model.findById(id, next)
            return res.status(200).send({
              class: updated
            })

          }else{
            return res.status(404).send(error.CLASS_NOT_FOUND)
          }
      }catch(err){
        next(err)
      }
    },
    delete: async (req, res, next) => {
      try {
        const id = req.params.id * 1
        const subjectClass = await model.findById(id, next)
        if (subjectClass === null) {
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
        next(err)
      }
    }
  }