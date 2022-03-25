import BaseDAL from './baseDAL.js'
import { ObjectId } from 'mongodb'

const COLLECTION = 'companies'

class CompaniesDAO extends BaseDAL {
    constructor(dbClient, dbName) {
        super();
        this.db = dbClient.db(dbName).collection(COLLECTION)
    }

    createCompany = async (companyBO) => {
        return await this.db.insertOne(companyBO)
    }

    getCompanyById = async (id) => {
        return await this.db.findOne({_id: new ObjectId(id)})
    }

    updateCompanyById = async (id, updateFields) => {
        return await this.db.updateOne(
            {_id: new ObjectId(id)},
            {$set: {
                ...updateFields
            }}
        )
    }

    deleteCompanyById = async (id) => {
        return await this.db.deleteOne({_id: new ObjectId(id)})
    }
}

export default CompaniesDAO