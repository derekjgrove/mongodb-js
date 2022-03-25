

export default function(router, companiesSL) {

    router.post('/api/companies/createCompany', async function(req, res) {
        let response = await companiesSL.createCompany(req)
        res.json(response);
    });

    router.get('/api/companies/getCompanyById/:id', async function(req, res) {
        let response = await companiesSL.getCompanyById(req)
        res.json(response);
    });

    router.post('/api/companies/updateCompanyById/:id', async function(req, res) {
        let response = await companiesSL.updateCompanyById(req)
        res.json(response);
    });

    router.post('/api/companies/deleteCompanyById/:id', async function(req, res) {
        let response = await companiesSL.deleteCompanyById(req)
        res.json(response);
    });

}