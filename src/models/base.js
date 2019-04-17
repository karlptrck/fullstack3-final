const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

/*
    Contains all dynamic CRUD database queries.
*/
export default class BaseModel {

    async findAll(tableName, next){
        try{
            return await this.db().all(`SELECT * FROM ${tableName};`)
        }catch(err){
            next(err)
        }
    }

    async destroy(tableName, id, next){
		try {
			return await this.db().run(SQL `DELETE FROM ${tableName} WHERE id=${id}`)
		} catch (err) {
			next(err)
		}
	}

    async create(tableName, params, next){
        try{
            let columns = Object.keys(params)
            let columnsql = columns.join(',')
            let cvalues = columns.map(col => {
				return params[col]
            })
            
            let values = columns.map(() => {
                return '?'})
                .join(',')

            let sql = `INSERT INTO ${tableName} (${columnsql}) VALUES (${values})`
            const insertstmt = await this.db().prepare(sql)
            return await insertstmt.run(cvalues)
        }catch(err){
            next(err)
        }
    }

    async update(tableName, id, params, next){
        try{
            let columns = Object.keys(params)
            let columnsql = columns.join(',')
            let cvalues = columns.map(col => {
				return params[col]
            })
            
            let values = columns.map(() => {
                return '?'})
                .join(',')

            let sql = `UPDATE ${tableName} SET (${columnsql}) = (${values}) WHERE id='${id}'`
            const updatedstmt = await this.db().prepare(sql)
            return await updatedstmt.run(cvalues)
        }catch(err){
            next(err)
        }
    }

    db(){
        return getDb()
    }
}