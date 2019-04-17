const classesRoutes = require('express').Router()
import classesController from '../../controllers/classesController'


classesRoutes.get('/', classesController.list)
classesRoutes.get('/:id', classesController.show)
classesRoutes.post('/', classesController.create)
classesRoutes.put('/:id', classesController.update)
classesRoutes.delete('/:id', classesController.delete)

export default classesRoutes