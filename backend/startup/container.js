const { createContainer, asClass, asFunction, asValue } = require('awilix')

//Config
const config = require('../config');
const app = require('.');

//Models
const db = require('../models')

//Repositories
const { ClientRepository, ProductRepository, SaleRepository } = require('../repositories')

//Services
const { ClientService, ProductService, SaleService } = require('../services')

//Controllers
const { ClientController, ProductController, SaleController } = require('../controllers')

//Routes
const routes = require('../routes'); 
const { ClientRoutes, ProductRoutes, SaleRoutes } = require('../routes/index.routes');

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(routes).singleton(),
        config: asValue(config)
    })
    .register({
        Client: asValue(db['Client']),
        Product: asValue(db['Product']),
        Sale: asValue(db['Sale'])
    })
    .register({
        ClientRepository: asClass(ClientRepository).singleton(),
        ProductRepository: asClass(ProductRepository).singleton(),
        SaleRepository: asClass(SaleRepository).singleton()
    })
    .register({
        ClientService: asClass(ClientService).singleton(),
        ProductService: asClass(ProductService).singleton(),
        SaleService: asClass(SaleService).singleton()
    })
    .register({
        ClientController: asClass(ClientController.bind(ClientController)).singleton(),
        ProductController: asClass(ProductController.bind(ProductController)).singleton(),
        SaleController: asClass(SaleController.bind(SaleController)).singleton()
    })
    .register({
        ClientRoutes: asFunction(ClientRoutes).singleton(),
        ProductRoutes: asFunction(ProductRoutes).singleton(),
        SaleRoutes: asFunction(SaleRoutes).singleton()
    });

module.exports = container;