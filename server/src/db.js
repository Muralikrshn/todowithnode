
import pg from 'pg'
const Pool = pg.Pool;

const pool = new Pool({
  user:"postgres",
  password:"Postgresql@123",
  database:"todo_db",
  host:"localhost",
  port:5432
})

export default pool;