import info from "./config/info";
import definitions from "./definitions/definitions";
import paths from "./paths/paths";
import tags from "./tags/tags";


const swaggerDocument={

    "swagger": "2.0",
    "info": info,
    "host": "localhost:3000",
    "basePath": "/",
    "tags": tags,
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "paths": paths,
    "definitions": definitions
}

export default swaggerDocument;