import Validation from "./validation";

class EqualsValidation extends Validation {
  static validationName = "equals";
  test(value, otherValues) {
    let [otherName] = this.options;
    let other = otherValues[otherName];
    return value === other;
  }
  failureMessage() {
    let [otherName] = this.options;
    return `must be equal to ${otherName}`;
  }
}

export default EqualsValidation;
