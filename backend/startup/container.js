const { createContainer, asClass, asFunction, asValue } = require('awilix')

//Config
const config = require('../config');
const app = require('.');

//Models
const db = require('../models')

//Repositories
const { ClientRepository } = require('../repositories')

//Services
const { ClientService } = require('../services')

//Controllers
const { ClientController } = require('../controllers')

//Routes
const routes = require('../routes'); 
const { ClientRoutes } = require('../routes/index.routes');

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(routes).singleton(),
        config: asValue(config)
    })
    .register({
        Client: asValue(db['Client'])
    })
    .register({
        ClientRepository: asClass(ClientRepository).singleton()
    })
    .register({
        ClientService: asClass(ClientService).singleton()
    })
    .register({
        ClientController: asClass(ClientController.bind(ClientController)).singleton()
    })
    .register({
        ClientRoutes: asFunction(ClientRoutes).singleton()
    });

module.exports = container;