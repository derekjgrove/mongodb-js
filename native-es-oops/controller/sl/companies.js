class CompaniesSL {
    constructor(DAL) {
        this.CompaniesDAL = DAL['CompaniesDAO']
    }

    getCompanyById = async (req) => {
        let { id } = req.params
        let company = await this.CompaniesDAL.getCompanyById(id)
        return company
    }
}

export default CompaniesSL