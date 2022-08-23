const postYear ={
    "tags":["Year"],
    "summary":"Create a new year",
    "parameters":[
        {
            "name":"yearAcademic",
            "in":"body",
            "description": "Year that we want to create",
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

export default postYear;