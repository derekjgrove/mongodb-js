import Engine from './engine/index.js'
import { Logger } from '../utils/index.js';
import express from 'express';

/*
    Add any middleware
*/

class Server {
    constructor () {
        this.engine = new Engine()
    }

    initialize = async () => {
        try {
            this.engine = await this.engine.initialize()
            Logger('SYSTEM', process.cwd(), 'Initializing Middleware')
            this.engine.expressApp.use(express.json());
            this.engine.expressApp.use(express.urlencoded({ extended: true }));
            return this
        } catch (error) {
            Logger('ERROR', process.cwd(), 'Encountered error Initializing Middleware' + error)
            return error
        }
    }
}

export default Server