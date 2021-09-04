const BaseRepository = require('./base.repository')

class ClientRepository extends BaseRepository {
    constructor({ Client }){
        super(Client)
        this.Client = Client
    }
}

module.exports = ClientRepository;