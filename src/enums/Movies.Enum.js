const Enum = require('./Enum.js');

class MoviesEnum extends Enum {
  static createSuccess = new MoviesEnum('Created successfully');
  static informationMissing = new MoviesEnum('Creation failed. Missing information.');
  static internalError = new MoviesEnum('An error has occured. Please, try again or contact us.');
  //TODO: idNotFound
  //TODO: titleNotFound
  //TODO: notFound
  //TODO: updateSuccess
  //TODO: deleteSuccess
}

module.exports = MoviesEnum;