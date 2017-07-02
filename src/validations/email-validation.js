import Validation from "./validation";

class EmailValidation extends Validation {
  static validationName = "email";
  test(value) {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value);
  }
  failureMessage() {
    return "is not a valid email address";
  }
}

export default EmailValidation;
