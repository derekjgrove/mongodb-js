import BaseBO from './baseBO.js'

class Company extends BaseBO {
    constructor(name, permalink, description) {
        super();
        this.name = name
        this.permalink = permalink
        this.description = description
    }
}

export default Company