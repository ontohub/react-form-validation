import expect from "expect";
import { EmailValidation } from "src/validations/";

describe("EmailValidation", () => {
  let validation;

  beforeEach(() => {
    validation = new EmailValidation();
  });

  it("resolves if the value is a valid email address", () => {
    let value = "foobar@example.com";
    return validation.run(value);
  });

  it("rejects if the value is not a valid email address", () => {
    let value = "foobar.com";
    return validation.run(value).then(
      () => {
        expect(true).toBeFalsy();
      },
      error => {
        expect(error).toEqual("is not a valid email address");
      }
    );
  });
});
