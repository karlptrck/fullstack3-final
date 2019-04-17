const teachersRoutes = require('express').Router()
import teachersController from '../../controllers/teachersController'


teachersRoutes.get('/', teachersController.list)
teachersRoutes.get('/:id', teachersController.show)
teachersRoutes.get('/:id/classes', teachersController.classes)
teachersRoutes.post('/', teachersController.create)
teachersRoutes.put('/:id', teachersController.update)
teachersRoutes.delete('/:id', teachersController.delete)

export default teachersRoutes