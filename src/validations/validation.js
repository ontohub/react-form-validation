import debounce from "debounce-promise";

/**
 * further validators:
 * - value
 * - email
 */

class Validation {
  constructor(options, debounced) {
    this.options = options;
    this.id = Symbol();
    if (debounced) {
      this.run = debounce(this.run.bind(this), debounced);
    }
  }
  cancel() {}
  run(value, values) {
    this.cancel();
    return new Promise((resolve, reject) => {
      this.cancel = reject;
      Promise.resolve(this.test(value, values)).then(
        result => {
          if (result) {
            resolve();
          } else {
            reject(this.failureMessage(value, values));
          }
        },
        () => {
          reject(this.failureMessage(value, values));
        }
      );
    });
  }
}

export default Validation;
