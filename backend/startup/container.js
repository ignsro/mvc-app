const { createContainer, asClass, asFunction, asValue } = require('awilix')

//Config
const config = require('../config');
const app = require('.');

//Models
const db = require('../models')

//Repositories
const { ClientRepository, ProductRepository } = require('../repositories')

//Services
const { ClientService, ProductService } = require('../services')

//Controllers
const { ClientController, ProductController } = require('../controllers')

//Routes
const routes = require('../routes'); 
const { ClientRoutes, ProductRoutes } = require('../routes/index.routes');

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(routes).singleton(),
        config: asValue(config)
    })
    .register({
        Client: asValue(db['Client']),
        Product: asValue(db['Product'])
    })
    .register({
        ClientRepository: asClass(ClientRepository).singleton(),
        ProductRepository: asClass(ProductRepository).singleton()
    })
    .register({
        ClientService: asClass(ClientService).singleton(),
        ProductService: asClass(ProductService).singleton()
    })
    .register({
        ClientController: asClass(ClientController.bind(ClientController)).singleton(),
        ProductController: asClass(ProductController.bind(ProductController)).singleton()
    })
    .register({
        ClientRoutes: asFunction(ClientRoutes).singleton(),
        ProductRoutes: asFunction(ProductRoutes).singleton()
    });

module.exports = container;