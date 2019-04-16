const classesRoutes = require('express').Router()
import classesController from '../../controllers/classesController'

classesRoutes.get('/', classesController.list)

export default classesRoutes