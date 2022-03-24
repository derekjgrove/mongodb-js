import CompaniesSL from './companies.js'
import { Logger } from './../../utils/index.js'

class ServiceLayer {
    constructor(DAL) {
        Logger('SYSTEM', process.cwd(), 'Initializing Service Layer')

        try {
            this.CompaniesSL = new CompaniesSL(DAL)
        } catch (error) {
            Logger('ERROR', process.cwd(), 'Encountered error Initializing Service Layer' + error)
            return error
        }
    }
}

export default ServiceLayer