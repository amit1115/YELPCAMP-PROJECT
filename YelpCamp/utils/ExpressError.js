class ExpressError extends Error {
    constructor(message,statusCode) {
        super();                        // its going to call error constructor
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;