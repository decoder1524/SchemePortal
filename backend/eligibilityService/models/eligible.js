import db from '../Utils/dbUtils.js'
class Eligible {
    constructor(userId, eligibleScheme, notEligibleScheme) {
        this.userId = userId;
        this.eligibleScheme = eligibleScheme;
        this.notEligibleScheme = notEligibleScheme;
    }
    static async save(values) {
        const sql = `INSERT INTO eligibility (userId, eligible_scheme, not_Eligible_scheme) VALUES ? ON DUPLICATE KEY UPDATE eligible_scheme = VALUES(eligible_scheme), not_Eligible_scheme = VALUES(not_Eligible_scheme)`;
        
        return await db.query(sql, [values]);
    }
    static async find(userId) {
        const sql = `SELECT userid FROM eligibility WHERE userid = ?`;
        const values = [userId];
        return await db.execute(sql, values);
    }
    static async find() {
        const sql = `SELECT * FROM eligibility`;
        return await db.execute(sql);
    }
    static async findEligible(userId) {
        const sql = `SELECT eligible_scheme FROM eligibility WHERE userid = ?`;
        const values = [userId];
        return await db.execute(sql, values);
    }
}

export default Eligible;