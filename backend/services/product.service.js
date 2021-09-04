const BaseService = require('./base.service')

class ProductService extends BaseService {
    constructor({ ProductRepository }){
        super(ProductRepository);
        this.respository = ProductRepository;
    }
}

module.exports = ProductService;