import db from '../Utils/dbUtils.js'
class SchemeRule {
    static async find(){
     return await db.execute(`SELECT * FROM schemes_rule`);
    }
}

export default SchemeRule;