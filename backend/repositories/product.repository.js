const BaseRepository = require('./base.repository')

class ProductRepository extends BaseRepository {
    constructor({ Product }) {
        super(Product);
        this.Product = Product;
    }

    async updateInstance(model) {
        return await model.save();
    }
}

module.exports = ProductRepository;