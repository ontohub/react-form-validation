import expect from "expect";
import { Validation } from "src/";

class TestValidation extends Validation {
  test(value) {
    return this.options[0](value);
  }

  failureMessage() {
    return this.options[1]();
  }
}

describe("Validation", () => {
  let validation;

  describe("Synchronous validations", () => {
    beforeEach(() => {
      let correctValue = "some value";
      let testFn = value => value === correctValue;
      let failureMessage = value => `must equal ${correctValue}`;
      validation = new TestValidation([testFn, failureMessage]);
    });

    it("resolves when the test function returns true", () => {
      return validation.run("some value");
    });

    it("rejects when the test function returns false", () => {
      return validation.run("some false value").catch(error => {
        expect(error).toEqual("must equal some value");
      });
    });
  });

  describe("Asynchronous validations", () => {
    beforeEach(() => {
      let correctValue = "some value";
      let testFn = value =>
        new Promise((resolve, reject) => {
          let result = value === correctValue;
          if (result) {
            resolve(result);
          } else {
            reject();
          }
        });
      let failureMessage = value => `must equal ${correctValue}`;
      validation = new TestValidation([testFn, failureMessage]);
    });

    it("resolves when the test function resolves", () => {
      return validation.run("some value");
    });

    it("rejects when the test function rejects", () => {
      return validation.run("some false value").then(
        () => {
          // This should never run
          expect(true).toBeFalsy();
        },
        error => {
          expect(error).toEqual("must equal some value");
        }
      );
    });
  });

  describe("Cancelling validations", () => {
    beforeEach(() => {
      let correctValue = "some value";
      let testFn = value =>
        new Promise(resolve =>
          setTimeout(() => resolve(value === correctValue), 200)
        );
      let failureMessage = value => `must equal ${correctValue}`;
      validation = new TestValidation([testFn, failureMessage]);
    });

    it("does nothing before the validation started", () => {
      let result = validation.cancel();
      expect(result).toNotExist();
    });

    it("does nothing after the validation finished", () => {
      let failureMessage = value => `must equal ${correctValue}`;
      validation = new TestValidation([
        value => Promise.resolve(value === "some value"),
        failureMessage
      ]);
      return validation.run("some value").then(
        () => {
          validation.cancel();
          expect(true).toBeTruthy();
        },
        () => {
          // This should never be called
          expect(true).toBeFalsy();
        }
      );
    });

    it("cancels a running validation", () => {
      let v = validation.run("some value").catch(error => {
        expect(error).toNotExist();
      });
      validation.cancel();
      return v;
    });

    it("cancels running validations when a new is started", () => {
      validation.run("some value").then(
        () => {
          // This should never be run
          expect(true).toBeFalsy();
        },
        error => {
          expect(error).toNotExist();
        }
      );
      return validation.run("some value");
    });
  });

  describe("Debouncing validations", () => {
    let testSpy;
    beforeEach(() => {
      let correctValue = "some value";
      testSpy = expect
        .createSpy(value => value === correctValue)
        .andCallThrough();
      let failureMessage = value => `must equal ${correctValue}`;
      validation = new TestValidation([testSpy, failureMessage], 20);
    });

    it("only calls the test function once", () => {
      let v1 = validation.run("some valu");
      return validation.run("some value").then(() => {
        expect(testSpy.calls.length).toBe(1);
      });
    });
  });
});
