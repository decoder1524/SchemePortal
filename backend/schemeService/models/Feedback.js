import db from '../Utils/dbUtils.js'
class Feedback {
    constructor(userId,title,description){
        this.userId = userId;
        this.title = title;
        this.description = description;
    }
    async save(){
        const sql = 'INSERT INTO feedback(userid,title,description) VALUES (?,?,?)'
        const values = [this.userId,this.title,this.description];
        return await db.execute(sql,values)
    }
    static async find(){
        const sql = 'SELECT * FROM feedback';
        return await db.execute(sql)
    }
}

export default Feedback;