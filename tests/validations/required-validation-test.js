import expect from "expect";
import { RequiredValidation } from "src/validations/";

describe("RequiredValidation", () => {
  let validation;

  beforeEach(() => {
    validation = new RequiredValidation();
  });

  it("resolves if the value is not empty", () => {
    let value = "f";
    return validation.run(value);
  });

  it("rejects if the value is empty", () => {
    let value = "";
    return validation.run(value).then(
      () => {
        expect(true).toBeFalsy();
      },
      error => {
        expect(error).toEqual("is required");
      }
    );
  });
});
