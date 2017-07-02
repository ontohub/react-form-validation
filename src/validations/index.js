export { default as Validation } from "./validation";
import { default as EmailValidation } from "./email-validation";
import { default as EqualsValidation } from "./equals-validation";
import { default as LengthValidation } from "./length-validation";
import { default as MatchValidation } from "./match-validation";
import { default as RequiredValidation } from "./required-validation";

export default [
  EmailValidation,
  EqualsValidation,
  LengthValidation,
  MatchValidation,
  RequiredValidation
];
