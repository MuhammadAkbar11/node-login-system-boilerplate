import HTTP_STATUS from "../constants/httpStatusCodes.constants";
import BaseError from "./base.error";

class ApiError extends BaseError {
  constructor(
    name,
    statusCode = HTTP_STATUS.NOT_FOUND,
    message = "Not found.",
    errors = {}
  ) {
    super(name, statusCode, message, errors);
    this.responseType = "json";
  }
}

export default ApiError;
