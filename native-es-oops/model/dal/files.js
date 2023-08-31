import BaseDAL from './baseDAL.js'
import { ObjectId, GridFSBucket} from 'mongodb'
import { Readable } from 'stream'
import fs from 'fs'

const COLLECTION = 'files'

class FilesDAO extends BaseDAL {
    constructor(dbClient, dbName) {
        super();
        this.db = dbClient.db(dbName).collection(COLLECTION)
        this.bucket = new GridFSBucket(dbClient.db(dbName));
    }

    createFile = async (fileBO) => {
        return await this.db.insertOne(fileBO)
    }

    createFileGridFS = async (fileBO) => {
        let insertedId = new ObjectId()
        const stream = Readable.from(fileBO['buffer']);
        stream.pipe(this.bucket.openUploadStream(
                fileBO.originalname,
                {
                    metadata: {searchField: 'foobar'},
                    id: insertedId
                }
            ))

        return {insertedId}

    }


    getFileById = async (id) => {
        return await this.db.findOne({_id: new ObjectId(id)})
    }

    getFileByIdGridFS = async (id) => {
        return await this.bucket.find({_id: new ObjectId(id)})
            .limit(1)
            .toArray()
    }

    downloadFileByIdGridFS = async (id) => {
        //https://gist.github.com/wpscholar/270005d42b860b1c33cf5ab25b37928a#file-buffer-to-stream-js
        return await this.bucket.openDownloadStream(new ObjectId(id)).
            pipe(fs.createWriteStream('./tempFile'));
    }

    updateFileById = async (id, updateFields) => {
        return await this.db.updateOne(
            {_id: new ObjectId(id)},
            {$set: {
                ...updateFields
            }}
        )
    }

    deleteFileById = async (id) => {
        return await this.db.deleteOne({_id: new ObjectId(id)})
    }
}

export default FilesDAO