import Validation from "./validation";

class RequiredValidation extends Validation {
  static validationName = "required";

  test(value) {
    return value.length > 0;
  }
  failureMessage() {
    return "is required";
  }
}

export default RequiredValidation;
