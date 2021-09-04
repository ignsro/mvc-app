class BadRequestException extends Error {
    constructor(msg = 'Bad request exception', httpStatus = 400) {
        this.message = msg;
        this.httpStatus = httpStatus
    }
}

module.exports = BadRequestException