import CompaniesDAO from './companies.js'
import { Logger } from './../../utils/index.js'

const DB_NAME = 'sample_training'

class DataAccessLayer {
    constructor(mongoClient) {
        try {
            Logger('SYSTEM', process.cwd(), 'Initializing Data Access Layer')
            this.CompaniesDAO = new CompaniesDAO(mongoClient, DB_NAME)
        } catch (error) {
            Logger('ERROR', process.cwd(), 'Encountered error Initializing Data Access Layer' + error)
            return error
        }
    }
}

export default DataAccessLayer