const BaseRepository = require("./base.repository");

class DetailRepository extends BaseRepository {
    constructor({ Detail }){
        super(Detail);
        this.detail = Detail;
    }
}

module.exports = DetailRepository;