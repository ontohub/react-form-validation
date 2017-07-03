import expect from "expect";
import { LengthValidation } from "src/validations/";

describe("LengthValidation", () => {
  let validation;

  describe("Just a minimum value", () => {
    beforeEach(() => {
      validation = new LengthValidation([{ min: 3 }]);
    });

    it("resolves if the length is greater than or equal to the minimum", () => {
      let value = "foo";
      return validation.run(value);
    });

    it("rejects if the length is less than the minimum", () => {
      let value = "fo";
      return validation.run(value).then(
        () => {
          expect(true).toBeFalsy();
        },
        error => {
          expect(error).toEqual("must be at least 3 characters long");
        }
      );
    });
  });

  describe("Just a maximum value", () => {
    beforeEach(() => {
      validation = new LengthValidation([{ max: 5 }]);
    });

    it("resolves if the length is less than or equal to the maximum", () => {
      let value = "fooba";
      return validation.run(value);
    });

    it("rejects if the length is greater than the maximum", () => {
      let value = "foobar";
      return validation.run(value).then(
        () => {
          expect(true).toBeFalsy();
        },
        error => {
          expect(error).toEqual("must be at most 5 characters long");
        }
      );
    });
  });

  describe("A minimum and maximum value", () => {
    beforeEach(() => {
      validation = new LengthValidation([{ min: 3, max: 5 }]);
    });

    it("resolves if the length is between the minimum and maximum", () => {
      let value = "foob";
      return validation.run(value);
    });

    it("rejects if the length is greater than the maximum", () => {
      let value = "foobar";
      return validation.run(value).then(
        () => {
          expect(true).toBeFalsy();
        },
        error => {
          expect(error).toEqual("must be between 3 and 5 characters long");
        }
      );
    });

    it("rejects if the length is less than the minimum", () => {
      let value = "fo";
      return validation.run(value).then(
        () => {
          expect(true).toBeFalsy();
        },
        error => {
          expect(error).toEqual("must be between 3 and 5 characters long");
        }
      );
    });
  });
});
