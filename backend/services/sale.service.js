const BaseService = require('./base.service')

class SaleService extends BaseService {
    constructor({ SaleRepository }){
        super(SaleRepository);
        this.respository = SaleRepository;
    }
}

module.exports = SaleService;