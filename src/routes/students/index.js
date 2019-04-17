const studentRoutes = require('express').Router()
import studentsController from '../../controllers/studentsController'


studentRoutes.get('/', studentsController.list)
studentRoutes.get('/:id', studentsController.show)
studentRoutes.post('/', studentsController.create)
studentRoutes.put('/:id', studentsController.update)
studentRoutes.delete('/:id', studentsController.delete)

export default studentRoutes