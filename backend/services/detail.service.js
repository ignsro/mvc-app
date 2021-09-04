const BaseService = require('./base.service')

class DetailService extends BaseService {
    constructor({ DetailRepository }){
        super(DetailRepository);
        this.respository = DetailRepository;
    }
}

module.exports = DetailService;