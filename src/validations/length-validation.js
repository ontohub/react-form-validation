import Validation from "./validation";

class LengthValidation extends Validation {
  static validationName = "length";
  test({ value }) {
    let [{ min, max }] = this.options;
    let result = true;
    if (min) {
      result = result && value.length >= min;
    }
    if (max) {
      result = result && value.length <= max;
    }
    return result;
  }
  failureMessage(params) {
    let [{ min, max }] = this.options;
    if (min && max) {
      return `must be between ${min} and ${max} characters long`;
    } else if (min) {
      return `must be at least ${min} characters long`;
    } else if (max) {
      return `must be at most ${max} characters long`;
    }
  }
}

export default LengthValidation;
