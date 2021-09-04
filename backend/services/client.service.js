const BaseService = require('./base.service')

class ClientService extends BaseService {
    constructor({ ClientRepository }){
        super(ClientRepository);
        this.respository = ClientRepository;
    }
}

module.exports = ClientService;