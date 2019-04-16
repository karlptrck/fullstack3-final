import sqlite from 'sqlite'
import SQL from 'sql-template-strings'
import assert from 'assert'
import fs from 'fs'
import config from './config'

// This connects our DB
// initDb is used in our main index.js file
// to initialize our apps connection to the db
// and run any outstanding migrations
let _db

const sqlLog = (...message) => {
	if (process.env.NODE_ENV === 'dev') {
		console.log(...message)
	}
}

const dbExists = fs.existsSync(config.db.file)

export const initDb = cb => {
	if (_db) {
		sqlLog('DB has already been initialized')
		return cb(null, _db)
	}
	Promise.resolve()
		// opens the sqlite db
		.then(() =>
			sqlite.open(config.db.file, {
				Promise,
				cached: false,
				verbose: true
			})
		)

		// then we run our migrations
		// NOTE the migrations are only run for a fresh/new db
		// IF you require migration/rollback capability for applying to
		// An Existing db then you will need to write a seperate script
		.then(db => {
			if (dbExists & process.env.NODE_ENV === 'dev') {
				sqlLog('DB EXISTS - SO NO MIGRATIONS')
				return new Promise((resolve, reject) => {
					resolve(db)
				})
			} else {
				sqlLog('running migrations fresh db')
				return new Promise((resolve, reject) =>
					resolve(
						db.migrate({
							migrationsPath: './db/migrations',
							force: 'last'
						})
					)
				)
			}
		})

		// checks to see whether we have any users if not
		// creates our first Admin
		.then(db => {
			sqlLog('DB Initialized')
			// this line caches our db connection
			// so that multiple connections arent opened if there is
			// already one
			_db = db
			// db.get(`SELECT count(*) as count FROM users`).then(result => {
			// 	sqlLog(result['count'], ' Users Currently ')
			// 	if (result['count'] === 0) {
			// 		createAdminUser(_db)
			// 	}
			// }).then(() => sqlLog('created users'))
			return cb(null, _db)
		})
}

export const getDb = () => {
	assert.ok(_db, 'Db has not been initialized. call initDB first')
	return _db
}
