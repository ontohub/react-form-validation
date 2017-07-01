import Validation from "./validation";

class MatchValidation extends Validation {
  static validationName = "matches";
  test({ value }) {
    let [pattern] = this.options;
    return pattern.test(value);
  }
  failureMessage(params) {
    let [_, message] = this.options;
    return message || "is invalid";
  }
}

export default MatchValidation;
