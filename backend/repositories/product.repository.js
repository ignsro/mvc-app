const BaseRepository = require('./base.repository')

class ProductRepository extends BaseRepository {
    constructor({ Product }){
        super(Product);
        this.Product = Product;
    }
}

module.exports = ProductRepository;