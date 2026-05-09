import db from '../Utils/dbUtils.js';

class Schemes{
    constructor(schemeId,schemeName,minAge,maxAge,gender, maritalStatus, eligibleCategory,qualification,eligibleOccupation,income,description,startDate,endDate, government,documents,applyLink){
        this.schemeId = schemeId;
        this.schemeName = schemeName;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.eligibleCategory = eligibleCategory;
        this.qualification = qualification;
        this.eligibleOccupation = eligibleOccupation;
        this.income = income;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.government = government;
        this.documents = documents;
        this.applyLink = applyLink;
    }

    async save(){
        const sql = "INSERT INTO schemes(schemeid,scheme_name,min_age,max_age,gender, marital_status, eligible_category,qualification,eligible_occupation,income,description,startdate,enddate,government, documents,applyLink) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const values = [this.schemeId,this.schemeName,this.minAge,this.maxAge,this.gender, this.maritalStatus,this.eligibleCategory,this.qualification,this.eligibleOccupation,this.income,this.description,this.startDate,this.endDate,this.government,this.documents,this.applyLink];
        return await db.execute(sql,values)
    }

    async updateById(){
        const sql = "UPDATE schemes SET scheme_name=?,min_age=?,max_age=?,gender=?,marital_status=?,eligible_category=?,qualification=?,eligible_occupation=?,income=?,description=?,startdate=?,enddate=?,government=?, documents =?, applyLink = ? WHERE schemeid=?";
        const values = [this.schemeName,this.minAge,this.maxAge, this.gender, this.maritalStatus, this.eligibleCategory,this.qualification,this.eligibleOccupation,this.income,this.description,this.startDate,this.endDate,this.government,this.documents,this.applyLink,this.schemeId];
        return await db.execute(sql,values)
    }
    static async findById(schemeId){
        const sql = "SELECT * FROM schemes Where schemeid = ?";
        return await db.execute(sql,[schemeId]);
    }
    static async find(){
        const sql = "SELECT * FROM schemes";
        return await db.execute(sql);
    }
    static async deleteById(schemeId){
        const sql = "DELETE FROM schemes Where schemeid = ?";
        return await db.execute(sql,[schemeId]);
    }
}

export default Schemes;