import mysql from 'mysql2'
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'eligibilitydb'
});
 pool.getConnection((error,connection)=>{
    if(error){
      console.log(`Database Connection Failed : ${error}`);
    }
    console.log(`eligibilitydb Connected Successfully`);
    connection.release()
    
  })


export default pool.promise();