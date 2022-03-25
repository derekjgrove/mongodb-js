import { ObjectId } from 'mongodb'

class BaseBO {
    constructor() {
        this._id = new ObjectId()
        this._v = 0
        this._ts = Date.now()
    }

}

export default BaseBO