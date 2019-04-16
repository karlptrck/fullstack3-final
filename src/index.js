import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'

const initDb = require('./db').initDb
const getDb = require('./db').getDb
const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', routes)


let server = (err, app) => {
	if (err) {
		throw err
	}
	app.listen(process.env.PORT, () => {
		console.log('App listening at http://localhost:%s', process.env.PORT)
		app.emit("appStarted")
		process.on('SIGINT', () => {
			let db = getDb()
			console.log(db)
			if (db) {
				db.close()
			}
			process.exit(0)
		})
	})
	return app
}

initDb(err => {
	server(err, app)
})

module.exports = app