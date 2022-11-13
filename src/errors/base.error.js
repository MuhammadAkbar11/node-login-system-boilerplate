import HTTP_STATUS from "../constants/httpStatusCodes.constants.js";

/**
 * @param {string} name Error Name
 * @param {number} statusCode HTTP status code
 * @param {string} message Error message
 * @param {object} errors custome error attributes
 */
class BaseError extends Error {
  name = "SERVER_ERROR";
  message = "Something went wrong with server";
  statusCode = HTTP_STATUS.INTERNAL_SERVER;
  constructor(name, statusCode, message, errors = {}) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name || "BASE_ERROR";
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    Error.captureStackTrace(this);
  }

  static toBaseError(err) {
    const result = {};
    Object.keys(err.errors).map(x => {
      result[x] = err.errors[x];
    });
    Object.keys(result).map(x => {
      result[x] = err[x];
    });
    delete result.errors;
    return result;
  }
}

export default BaseError;
