import 'dotenv/config'
import pg from 'pg'


const {HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT} = process.env
    

const pool = new pg.Pool({
                host: HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_DATABASE,
                port: DB_PORT,
                allowExitOnIdle: true
                })

export default pool



