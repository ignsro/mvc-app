const BaseRepository = require('./base.repository')

class SaleRepository extends BaseRepository {
    constructor({ Sale }){
        super(Sale)
        this.Sale = Sale
    }
}

module.exports = SaleRepository;