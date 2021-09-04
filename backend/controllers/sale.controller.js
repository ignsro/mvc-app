const BaseController = require('./base.controller')

class SaleController extends BaseController {
    constructor({ SaleService }){
        super(SaleService)
        this.service = SaleService;
    }
}

module.exports = SaleController;