import express from 'express'
import classes from './classes'

const router = express.Router()
router.use('/classes', classes)

export default router