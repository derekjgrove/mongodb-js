import BaseBO from './baseBO.js'

class File extends BaseBO {
    constructor(fileObject = {}) {
        super();
        this.fieldname = fileObject.fieldname
        this.originalname = fileObject.originalname
        this.encoding = fileObject.encoding
        this.mimetype = fileObject.mimetype
        this.size = fileObject.size
        this.buffer = fileObject.buffer
    }
}

export default File