
const teacherdefinitions ={
    "required":["id","email","hashPassword","role"],
    "properties":{
        "id":{
            "type":"integer",
            "uniqueItems":true
        },
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


export default teacherdefinitions;