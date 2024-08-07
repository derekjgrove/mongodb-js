import CompaniesAPI from './companies.js'
import FilesAPI from './files.js'
import SwaggerAPI from './swagger.js'
import { Logger } from './../../utils/index.js'

class APILayer {

    constructor(router, SL) {
        Logger('SYSTEM', process.cwd(), 'Initializing API Layer')

        try {
            new CompaniesAPI(router, SL['CompaniesSL'])
            new FilesAPI(router, SL['FilesSL'])
            new SwaggerAPI(router, SL['SwaggerSL'])
            return router
        } catch (error) {
            Logger('ERROR', process.cwd(), 'Encountered error Initializing API Layer' + error)
            return error
        }
    }
}

export default APILayer