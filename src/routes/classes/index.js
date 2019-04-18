const classesRoutes = require('express').Router()
import classesController from '../../controllers/classesController'


classesRoutes.get('/', classesController.list)
classesRoutes.get('/:id', classesController.show)
classesRoutes.post('/', classesController.create)
classesRoutes.put('/:id', classesController.update)
classesRoutes.delete('/:id', classesController.delete)
classesRoutes.get('/:class_id/students', classesController.getEnrolledStudents)
classesRoutes.post('/:class_id/students', classesController.enroll)
classesRoutes.delete('/:class_id/students/:id', classesController.removeStudent)

export default classesRoutes