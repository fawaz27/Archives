
const getTextbook ={
    "tags":["Textbooks"],
    "summary":"Get textbbok with give ID",
    "responses":{
        "200":{
        "description":"OK",
        "schema":{           
            "$ref": "#/definitions/Textbook"
        }
        }
    }
}

export default getTextbook;