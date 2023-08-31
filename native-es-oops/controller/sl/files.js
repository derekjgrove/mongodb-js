import File from "./../../model/bo/file.js"

class FilesSL {
    constructor(DAL) {
        this.FilesDAL = DAL['FilesDAO']
    }

    createFile = async (req) => {
        let filesArr = req.files

        var retIds = []
        for (var fileObj of filesArr) {
            let fileBO = new File(
                fileObj
            )
            retIds.push(await this.FilesDAL.createFile(fileBO))
        }
        return retIds
    }

    createFileGridFS = async (req) => {
        let filesArr = req.files

        var retIds = []
        for (var fileObj of filesArr) {
            let fileBO = new File(
                fileObj
            )
            retIds.push(await this.FilesDAL.createFileGridFS(fileBO))
        }
        return retIds
    }

    getFileById = async (req) => {
        let { id } = req.params
        let file = await this.FilesDAL.getFileById(id)
        return file
    }

    getFileByIdGridFS = async (req) => {
        let { id } = req.params
        let file = await this.FilesDAL.getFileByIdGridFS(id)
        return file
    }

    downloadFileByIdGridFS = async (req) => {
        let { id } = req.params
        let file = await this.FilesDAL.downloadFileByIdGridFS(id)
        return file
    }

    updateFileById = async (req) => {
        let { id } = req.params
        let dbResult = await this.FilesDAL.updateFileById(id, req.body)
        return dbResult
    }

    deleteFileById = async (req) => {
        let { id } = req.params
        let dbResult = await this.FilesDAL.deleteFileById(id)
        return dbResult
    }

}

export default FilesSL