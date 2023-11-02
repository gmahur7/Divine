const mongoose=require('mongoose')

let newUserSchema = new mongoose.Schema({
    Name:String,
    FatherName:String,
    DOB:String,
    Email:String,
    PhoneNo:String,
    Address:String,
    Profession:String,
    EmployeeCompany:String,
    SchoolName:String,
    Course:String,
    Created:String,
    Admission:String
})

module.exports = mongoose.model('user',newUserSchema)