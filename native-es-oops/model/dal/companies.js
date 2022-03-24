import BaseDAL from './baseDAL.js'
import { ObjectId } from 'mongodb'

const COLLECTION = 'companies'

class CompaniesDAO extends BaseDAL {
    constructor(dbClient, dbName) {
        super();
        this.db = dbClient.db(dbName).collection(COLLECTION)
    }

    getCompanyById = async (id) => {
        return await this.db.findOne({_id: new ObjectId(id)})
    }
}

export default CompaniesDAO