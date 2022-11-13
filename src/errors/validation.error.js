import HTTP_STATUS from "../constants/httpStatusCodes.constants";
import BaseError from "./base.error";

export class ValidationError extends BaseError {
  constructor(err, view, renderOpts) {
    super("BAD_VALIDATION", HTTP_STATUS.BAD_REQUEST, "Bad Validation", true, {
      errorView: view,
    });
    this.validation = this.#transform(err);
    this.renderData = { ...renderOpts };
  }

  #transform(errorValidation) {
    let errorObj = {};
    const newArrError = [...errorValidation];
    for (let i = 0, len = newArrError.length; i < len; i++) {
      const messageArr = errorValidation
        .filter(item => item.param == newArrError[i]["param"])
        .map(el => el.msg);
      errorObj[newArrError[i]["param"]] = {
        type: newArrError[i]["param"],
        message: messageArr,
      };
    }

    for (let key in errorObj) newArrError.push(errorObj[key]);

    return errorObj;
  }
}
