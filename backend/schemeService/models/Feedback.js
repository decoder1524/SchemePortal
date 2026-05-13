import db from '../Utils/dbUtils.js'
class Feedback {
    constructor(userId,title,description,status,rejectReason){
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.rejectReason = rejectReason;
    }
    async save(){
        const sql = 'INSERT INTO feedback(userid,title,description,status,reject_reason) VALUES (?,?,?,?,?)'
        const values = [this.userId,this.title,this.description,this.status,this.rejectReason];
        return await db.execute(sql,values)
    }
    static async find(){
        const sql = 'SELECT * FROM feedback';
        return await db.execute(sql)
    }
    static async findById(userId){
        const sql = 'SELECT * FROM feedback WHERE userid = ?';
        const values = [userId]
        return await db.execute(sql,values)
    }
    static async findByFeedId(id){
        const sql = 'SELECT * FROM feedback WHERE id = ?';
        const values = [id]
        return await db.execute(sql,values)
    }
     async updateById(id){
        const sql = 'UPDATE feedback SET status = ?, reject_reason = ? WHERE id = ?';
        console.log([this.status,this.rejectReason,id]);
        const values = [this.status,this.rejectReason,id]
        return await db.execute(sql,values)
    }
}

export default Feedback;