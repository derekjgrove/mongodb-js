import express from 'express';
import { PORT } from './../../../config/constants.js'
import { Logger } from './../../../utils/index.js'

let app = null

class ExpressSingleton {

    constructor() {

        if (!app) {
            try {
                app = express();
                app.listen(PORT, () => {
                    Logger('SYSTEM', process.cwd(), `Listening on Port: ${PORT}`)
                });
            } catch (error) {
                Logger('ERROR', process.cwd(), 'Encountered error creating Express Server' + error)
                return error
            }
        }
    
        return app;
    }

    getExpressApp = () => {
        return app;
    }

}

export default ExpressSingleton