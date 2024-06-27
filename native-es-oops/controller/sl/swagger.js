import swaggerUi from 'swagger-ui-express';
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const swaggerDocument = require("./../../build/swagger-output.json") // use the require method



class SwaggerSL {
    constructor() {
        this.swaggerUi = swaggerUi
        this.swaggerDocument = swaggerDocument
    }

}

export default SwaggerSL