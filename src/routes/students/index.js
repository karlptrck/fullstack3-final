const studentRoutes = require('express').Router()
import studentsController from '../../controllers/studentsController'


studentRoutes.get('/', studentsController.list)

export default studentRoutes