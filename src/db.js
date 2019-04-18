import sqlite from 'sqlite'
import SQL from 'sql-template-strings'
import assert from 'assert'
import fs from 'fs'
import config from './config'


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
		.then(db => {
			sqlLog('DB Initialized')
			_db = db
			_db.run('PRAGMA foreign_keys = ON;')
			return cb(null, _db)
		})
}

export const getDb = () => {
	assert.ok(_db, 'Db has not been initialized. call initDB first')
	return _db
}
