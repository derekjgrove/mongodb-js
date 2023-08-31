import {upload} from './../../server/middleware/multerMiddleware.js'

export default function(router, filesSL) {

    router.post('/api/files/createFile', upload.any(), async function(req, res) {
        let response = await filesSL.createFile(req)
        res.json(response);
    });

    router.post('/api/files/createFileGridFS', upload.any(), async function(req, res) {
        let response = await filesSL.createFileGridFS(req)
        res.json(response);
    });

    router.get('/api/files/getFileById/:id', async function(req, res) {
        let response = await filesSL.getFileById(req)
        res.json(response);
    });

    router.get('/api/files/getFileByIdGridFS/:id', async function(req, res) {
        let response = await filesSL.getFileByIdGridFS(req)
        res.json(response);
    });

    router.get('/api/files/downloadFileByIdGridFS/:id', async function(req, res) {
        let response = await filesSL.downloadFileByIdGridFS(req)
        res.sendFile(response);
    });

    router.post('/api/files/updateFileById/:id', async function(req, res) {
        let response = await filesSL.updateFileById(req)
        res.json(response);
    });

    router.post('/api/files/deleteFileById/:id', async function(req, res) {
        let response = await filesSL.deleteFileById(req)
        res.json(response);
    });

}