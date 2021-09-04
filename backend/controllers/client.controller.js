const BaseController = require('./base.controller')

class ClientController extends BaseController {
    constructor({ ClientService }){
        super(ClientService);
        this.service = ClientService;
    }

}

module.exports = ClientController;