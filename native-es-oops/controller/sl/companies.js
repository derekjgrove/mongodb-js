import Company from "./../../model/bo/company.js"

class CompaniesSL {
    constructor(DAL) {
        this.CompaniesDAL = DAL['CompaniesDAO']
    }

    createCompany = async (req) => {
        let companyObj = req.body
        let companyBO = new Company(
            companyObj.name,
            companyObj.permalink,
            companyObj.description
        )
        let companyId = await this.CompaniesDAL.createCompany(companyBO)
        return companyId
    }

    getCompanyById = async (req) => {
        let { id } = req.params
        let company = await this.CompaniesDAL.getCompanyById(id)
        return company
    }

    updateCompanyById = async (req) => {
        let { id } = req.params
        let dbResult = await this.CompaniesDAL.updateCompanyById(id, req.body)
        return dbResult
    }

    deleteCompanyById = async (req) => {
        let { id } = req.params
        let dbResult = await this.CompaniesDAL.deleteCompanyById(id)
        return dbResult
    }

}

export default CompaniesSL