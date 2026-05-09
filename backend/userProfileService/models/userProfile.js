import db from '../Utils/dbUtils.js'

class UserProfile {
    constructor({userId, profilePhoto,firstName, lastName, age, gender, marital_status, dob,phone, category,minority,income, street, city, district, state, pincode, landmark, qualification, occupation_status}){
        this.userId = userId;
        this.profilePhoto = profilePhoto;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.marital_status = marital_status;
        this.dob = dob;
        this.phone = phone;
        this.category = category;
        this.minority = minority;
        this.income = income;
        this.street = street;
        this.city = city;
        this.district = district;
        this.state = state;
        this.pincode = pincode;
        this.landmark = landmark;
        this.qualification = qualification;
        this.occupation_status = occupation_status;
    }

    async save(){
        const sql = `INSERT INTO user_profiles (userId,profilePhoto, firstName, lastName, age,phone, gender, marital_status, dob, category,minority,income, street, city, district, state, pincode, landmark, qualification, occupation_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [this.userId,this.profilePhoto, this.firstName, this.lastName, this.age,this.phone, this.gender,this.marital_status, this.dob, this.category, this.minority,this.income, this.street, this.city, this.district, this.state, this.pincode, this.landmark, this.qualification, this.occupation_status];
        return await db.execute(sql, values);
    }
    
    static async findByUserId(userId){
        const sql = 'SELECT * FROM user_profiles WHERE userId = ?';
        return await db.execute(sql, [userId]);
    }
    static async findUserIds(){
        const sql = 'SELECT userId FROM user_profiles';
        return await db.execute(sql);
    }
    
    static async find(){
        const sql = 'SELECT * FROM user_profiles';
        return await db.execute(sql);
    }
    
    async updateByUserId(userId){
        console.log(this);  
        const sql = `UPDATE user_profiles SET profilePhoto=?, firstName=?, lastName=?, age=?, gender=?, marital_status=?, dob=?, phone=?, category=?,minority=?,income=?, street=?, city=?, district=?, state=?, pincode=?, landmark=?, qualification=?, occupation_status=? WHERE userId = ?`;
        const values = [this?.profilePhoto, this.firstName, this.lastName, this.age, this.gender,this.marital_status, this.dob, this.phone, this.category, this.minority,this.income, this.street, this.city, this.district, this.state, this.pincode, this.landmark, this.qualification, this.occupation_status,userId]
        return await db.execute(sql, values);
    }

    static async deleteByUserId(userId){
        const sql = 'DELETE FROM user_profiles WHERE userId = ?';
        return await db.execute(sql, [userId]);
    }
}

export default UserProfile;