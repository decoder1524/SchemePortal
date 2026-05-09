import db from '../Utils/dbUtils.js'
class Notification {
    constructor(notificationData){
        this.userId = notificationData.userId;
        this.email = notificationData.email;
        this.notified = notificationData.notified
    }
 async save(){
        const sql = `INSERT INTO notifications(userid,email,notified) VALUES(?,?,?) ON DUPLICATE KEY UPDATE email = VALUES(email), notified = VALUES(notified)`
        const values = [this.userId,this.email,this.notified]
        return await db.execute(sql,values);
    }
    static async find(){
        const sql = `SELECT * FROM notifications`;
        return await db.execute(sql);
    }
}

export default Notification;