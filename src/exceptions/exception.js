const { BadRequest, NotFound,  } = require('http-errors');

class NotFoundException extends NotFound {
    constructor(message) {
      super(message);
      this.statusCode = 404;
    }
}


class AlreadyExistException extends BadRequest {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class InvalidException extends BadRequest {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = { NotFoundException, AlreadyExistException, InvalidException };

