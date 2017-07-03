import expect from "expect";
import { EqualsValidation } from "src/validations/";

describe("EqualsValidation", () => {
  let validation;

  beforeEach(() => {
    validation = new EqualsValidation(["Other field"]);
  });

  it("resolves if the value is equal to the other fields value", () => {
    let value = "foobar";
    let values = { "Other field": "foobar" };
    return validation.run(value, values);
  });

  it("rejects if the value is not equal to the other fields value", () => {
    let value = "foobar";
    let values = { "Other field": "foobaz" };
    return validation.run(value, values).then(
      () => {
        expect(true).toBeFalsy();
      },
      error => {
        expect(error).toEqual("must be equal to Other field");
      }
    );
  });
});
