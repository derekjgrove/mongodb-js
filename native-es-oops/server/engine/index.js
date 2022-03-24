import { ExpressSingleton, MongoDBSingleton } from './plug-ins/index.js'
import { Logger } from './../../utils/index.js'
/*
    Instantiate Plug-ins and Adapters
*/

class Engine {
    constructor() {
        this.expressApp
        this.mongoClient
    }

    initialize = async () => {
        try {
            Logger('SYSTEM', process.cwd(), 'Initializing Engine')
            this.expressApp = await new ExpressSingleton()
            this.mongoClient = await new MongoDBSingleton()
            return this
        } catch (error) {
            Logger('ERROR', process.cwd(), 'Encountered error Initializing Engine' + error)
            return error
        }
    }
}

export default Engine