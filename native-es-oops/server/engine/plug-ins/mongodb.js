import mongodb from 'mongodb';
import { MONGO_URI } from './../../../config/constants.js'
import { Logger } from './../../../utils/index.js'

let mongoClient = null

class MongoDBSingleton {

    _initMongoClient = async () => {
        return await new mongodb.MongoClient(MONGO_URI, { 
            useNewUrlParser: true
        }).connect();
    }

    constructor() {

        if (!mongoClient) {
            try {
                mongoClient = this._initMongoClient().then((db) => {
                    Logger('SYSTEM', process.cwd(), `Connected to MongoDB`)
                    return db
                })
            } catch (error) {
                Logger('ERROR', process.cwd(), 'Encountered error creating MongoDB Connection' + error)
                return error
            }
        }
    
        return mongoClient;
    }

}

export default MongoDBSingleton