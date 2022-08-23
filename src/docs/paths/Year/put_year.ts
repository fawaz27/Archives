const putYear ={
    "tags":["Year"],
    "summary":"Update year with give ID" ,
    "parameters":[
        {
            "name":"yearAcademic",
            "in":"body",
            "description":"Year Academic with new values of properties",
            "schema": {
                "$ref": "#/definitions/CreateYearAcademicDto"
            }

        }
    ],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{   
            "$ref": "#/definitions/Year_Academic"
  
        }
        }
    }
}

export default putYear;