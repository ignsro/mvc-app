class NotFoundException extends Error {
    constructor(msg = "Not found", httpStatus = 404){
        super()
        this.message = msg;
        this.status = httpStatus
    }
}

module.exports = NotFoundException