class Validation {
  constructor(options, debounced) {
    this.options = options;
    this.id = Symbol();
    if (debounced) {
      this.debounce = fn => setTimeout(fn, debounced);
    }
  }
  debounce(fn) {
    fn();
  }
  cancel() {}
  run(value, values) {
    this.cancel();
    return new Promise((resolve, reject) => {
      this.cancel = reject;
      this.debounce(() => {
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
    });
  }
}

export default Validation;
