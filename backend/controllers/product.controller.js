const BaseController = require('./base.controller')

class ProductController extends BaseController {
    constructor({ ProductService }){
        super(ProductService)
        this.service = ProductService;
    }
}

module.exports = ProductController;