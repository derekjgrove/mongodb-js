

export default function(router, companiesSL) {

    router.get('/api/companies/:id', async function(req, res) {
        let response = await companiesSL.getCompanyById(req)
        res.json(response);
    });
}