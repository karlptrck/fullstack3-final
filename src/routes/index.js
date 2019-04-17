import express from 'express'
import classes from './classes'
import teachers from './teachers'
import students from './students'

const router = express.Router()
router.use('/classes', classes)
router.use('/teachers', teachers)
router.use('/students', students)

export default router