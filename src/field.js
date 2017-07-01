import _ from "lodash";

const createValidatorGroup = validators => {
  const ValidatorGroup = class ValidatorGroup {
    validators = [];
    addValidator(validator) {
      this.validators.push(validator);
    }
  };
  _.each(validators, Validator => {
    ValidatorGroup.prototype[Validator.validationName] = function(...args) {
      this.addValidator(new Validator(args));
      return this;
    };
    ValidatorGroup.prototype[`${Validator.validationName}Debounced`] = function(
      debounceDuration,
      ...args
    ) {
      this.addValidator(new Validator(args, debounceDuration));
      return this;
    };
  });
  return ValidatorGroup;
};

class Field {
  validatorGroups = [];
  constructor(validators) {
    this.ValidatorGroup = createValidatorGroup(validators);
    let firstValidatorGroup = new this.ValidatorGroup();
    _.each(validators, Validator => {
      _.each(
        [Validator.validationName, `${Validator.validationName}Debounced`],
        name => {
          this[name] = (...args) => {
            firstValidatorGroup[name](...args);
            return this;
          };
        }
      );
    });
    this.addValidatorGroup(firstValidatorGroup);
  }
  addValidatorGroup(validatorGroup) {
    this.validatorGroups.push(validatorGroup);
  }
  then(fn) {
    this.addValidatorGroup(fn(new this.ValidatorGroup()));
    return this;
  }
  validators() {
    return _.map(this.validatorGroups, vG => vG.validators);
  }
}

export default Field;
