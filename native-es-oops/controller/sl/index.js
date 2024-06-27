import CompaniesSL from './companies.js'
import FilesSL from './files.js'
import { Logger } from './../../utils/index.js'
import SwaggerSL from './swagger.js'

class ServiceLayer {
    constructor(DAL) {
        Logger('SYSTEM', process.cwd(), 'Initializing Service Layer')

        try {
            this.CompaniesSL = new CompaniesSL(DAL)
            this.FilesSL = new FilesSL(DAL)
            this.SwaggerSL = new SwaggerSL()
        } catch (error) {
            Logger('ERROR', process.cwd(), 'Encountered error Initializing Service Layer' + error)
            return error
        }
    }
}

export default ServiceLayer