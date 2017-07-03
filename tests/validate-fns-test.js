import expect from "expect";
import {
  RequiredValidation,
  LengthValidation,
  MatchValidation
} from "src/validations";
import { validateGroup, validateGroups } from "src/validate-fns";

describe("validateGroup", () => {
  let validatorGroup = [
    new RequiredValidation(),
    new LengthValidation([{ min: 3 }]),
    new MatchValidation([/^[a-z]*$/])
  ];
  it("calls onErrors for each failed validation", () => {
    let onErrors = expect.createSpy();
    let cancel = new Promise(() => {});

    return validateGroup(validatorGroup, "00", {}, onErrors, cancel).then(
      () => {
        expect(true).toBeFalsy();
      },
      () => {
        expect(onErrors.calls.length).toBe(2);
      }
    );
  });
  it("calls onErrors once if all validations pass", () => {
    let onErrors = expect.createSpy();
    let cancel = new Promise(() => {});

    return validateGroup(validatorGroup, "aaa", {}, onErrors, cancel).then(
      () => {
        expect(onErrors.calls.length).toBe(1);
      },
      () => {
        expect(true).toBeFalsy();
      }
    );
  });
  it("cancels all validations when cancel resolves", () => {
    let cancel;
    let onErrors = expect
      .createSpy(a => {
        cancel();
      })
      .andCallThrough();
    let cancelPromise = Promise.resolve();

    return validateGroup(
      validatorGroup,
      "00",
      {},
      onErrors,
      cancelPromise
    ).then(
      () => {
        expect(true).toBeFalsy();
      },
      () => {
        expect(onErrors.calls.length).toBe(0);
      }
    );
  });
});

describe("validateGroups", () => {
  let validatorGroups = [
    [new RequiredValidation()],
    [new LengthValidation([{ min: 3 }])]
  ];
  it("validates a group only if the previous passed without error", () => {
    let onError = expect.createSpy();
    let cancel = new Promise(() => {});

    return validateGroups(validatorGroups, "", {}, onError, cancel).then(
      () => {
        // Should never be called
        expect(true).toBeFalsy();
      },
      () => {
        expect(onError.calls.length).toBe(1);
      }
    );
  });
});
