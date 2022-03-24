import Server from './server/index.js'
import express from 'express';
import APILayer from './controller/api/index.js'
import DataAccessLayer from './model/dal/index.js'
import ServiceLayer from './controller/sl/index.js'
import { Logger } from './utils/index.js'


/*
    Add routes and inject functional layers
*/

async function StartUp () {
    Logger('SYSTEM', process.cwd(), 'Starting up Server')
    
    let server
    try {
        server = await new Server()
        await server.initialize()
    } catch (error) {
        Logger('ERROR', process.cwd(), 'Encountered error Starting up Server' + error)
        return error
    }

    Logger('SYSTEM', process.cwd(), 'Initializing app layers')
    try {
        let dataAccessLayer = await new DataAccessLayer(server.engine.mongoClient)
        let serviceLayer = await new ServiceLayer(dataAccessLayer)
        const router = await express.Router()
        await server.engine.expressApp.use(await new APILayer(router, serviceLayer))
    } catch (error) {
        Logger('ERROR', process.cwd(), 'Encountered error initalizing the app layers' + error)
        return error
    }
}


StartUp()