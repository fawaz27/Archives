
const createTeacherDtodefinitions ={
    "required":["email","hashPassword","role"],
    "properties":{
        "lastName":{
            "type":"string"
        },
        "firstName":{
            "type":"string"
        },
        "email":{
            "type":"string"
        },
        "hashPassword":{
            "type":"string"
        },
        "phone":{
            "type":"string"
        },
        "role":{
            "type":"string"
        }
    }

}


export default createTeacherDtodefinitions;