const env = process.env.NODE_ENV || 'dev'
console.log(env)

const dev = {
	app: {
		port: 3000
	},
	db: {
		file: './devdb.sqlite'
	}
}

const test = {
	app: {
		port: 3000
	},
	db: {
		file: './testdb.sqlite'
	}
}

const config = {
	dev,
	test
}

module.exports = config[env]
