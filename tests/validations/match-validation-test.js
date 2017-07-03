import expect from "expect";
import { MatchValidation } from "src/validations/";

describe("MatchValidation", () => {
  let validation;

  beforeEach(() => {
    let pattern = /some value/;
    validation = new MatchValidation([pattern]);
  });

  it("resolves if the value matches the pattern", () => {
    let value = "some valueee";
    return validation.run(value);
  });

  it("rejects if the value does not match the pattern", () => {
    let value = "sume value";
    return validation.run(value).then(
      () => {
        expect(true).toBeFalsy();
      },
      error => {
        expect(error).toEqual("is invalid");
      }
    );
  });

  it("returns a custom error message", () => {
    validation = new MatchValidation([
      /some value/,
      "does not match `some value`"
    ]);
    let value = "sume value";
    return validation.run(value).then(
      () => {
        expect(true).toBeFalsy();
      },
      error => {
        expect(error).toEqual("does not match `some value`");
      }
    );
  });
});
