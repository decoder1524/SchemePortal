import db from '../Utils/dbUtils.js'
class  User {
    constructor({userId,email,password,role}){
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.role = role
    }


    save(){
       return db.execute('INSERT INTO users(userId,email,password,role) VALUES(?,?,?,?);',[this.userId,this.email,this.password,this.role]);
        
    }
    static async findByEmail(email){
        return await db.execute('SELECT * FROM users WHERE email = ? ',[email]);
         
    }
    static async find(){
        return await db.execute('SELECT * FROM users');
    }
    static async findByUserId(userId){
        const sql = 'SELECT * FROM users WHERE userId = ?';
        return await db.execute(sql, [userId]);
    }
    static async deleteByUserId(userId){
        const sql = 'DELETE FROM users WHERE userId = ?';
        return await db.execute(sql, [userId]);
    }
    async updateByUserId(userId){
        const sql = "UPDATE users SET email = ?,role=? WHERE userId = ?";
        const values = [this.email,this.role,userId];
        return await db.execute(sql,values)
    }
    async updatePasswordByEmail(){
        const sql = "UPDATE users SET password = ? WHERE email = ?";
        const values = [this.password,this.email];
        return await db.execute(sql,values)
    }

}


export default User;