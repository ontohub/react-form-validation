import _ from "lodash";

/**
 * Bug:
 * validating must also cancel all validations in later groups
 */

export const validateGroup = (
  validatorGroup,
  value,
  values,
  onErrors,
  cancel
) => {
  let errors = _.map(validatorGroup, v => ({ [v.id]: null }));
  const addError = (validator, error) => errors[validator] = error;
  let results = validatorGroup.map(v => {
    let result = v.run(value, values).then(
      () => true,
      error => {
        if (error) {
          addError(v.id, error);
          onErrors(errors);
        }
        return false;
      }
    );
    cancel.then(() => v.cancel());
    return result;
  });
  return Promise.all(results).then(results => {
    if (!_.every(results)) {
      return Promise.reject("no man");
    } else {
      onErrors(errors);
    }
  });
};

export const validateGroups = (
  validatorGroups,
  value,
  values,
  onError,
  cancel
) => {
  let result = Promise.resolve();
  _.each(validatorGroups, validatorGroup => {
    result = result.then(() =>
      validateGroup(validatorGroup, value, values, onError, cancel)
    );
  });
  return result;
};

export default validateGroups;
