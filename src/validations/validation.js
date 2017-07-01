class Validation {
  constructor(...options) {
    this.options = options;
    this.id = Symbol();
  }
  cancel() {}
  run(params) {
    this.cancel();
    return new Promise((resolve, reject) => {
      this.cancel = reject;
      Promise.resolve(this.test(params)).then(
        result => {
          if (result) {
            resolve();
          } else {
            reject(this.failureMessage(params));
          }
        },
        () => {
          reject(this.failureMessage(params));
        }
      );
    });
  }
}

export default Validation;
