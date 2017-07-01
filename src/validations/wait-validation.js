import Validation from "./validation";

function wait(time, result, success) {
  return new Promise((resolve, reject) => {
    if (success) {
      setTimeout(() => resolve(result), time);
    } else {
      setTimeout(() => reject(result), time);
    }
  });
}

class WaitValidation extends Validation {
  static validationName = "wait";

  test() {
    let [time, result, success = true] = this.options;
    return wait(time, result, success);
  }
  failureMessage() {
    return this.options[1];
  }
}

export default WaitValidation;
