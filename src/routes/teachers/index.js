const teachersRoutes = require('express').Router()
import teachersController from '../../controllers/teachersController'


teachersRoutes.get('/', teachersController.list)

export default teachersRoutes