import _ from "lodash";

/**
 * Bug:
 * validating must also cancel all validations in later groups
 */

const validateGroup = (validatorGroup, value, values, onErrors, cancel) => {
  let errors = _.map(validatorGroup, v => ({ [v.id]: null }));
  const addError = (validator, error) => errors[validator] = error;
  let results = validatorGroup.map(v => {
    let result = v.run(value, values).then(
      () => true,
      error => {
        addError(v.id, error);
        onErrors(errors);
        return false;
      }
    );
    cancel.then(() => v.cancel());
    return result;
  });
  return Promise.all(results).then(results => {
    if (!_.every(results)) {
      return Promise.reject();
    } else {
      onErrors(errors);
    }
  });
};

const validateGroups = (validatorGroups, value, values, onError, cancel) => {
  let result = Promise.resolve();
  _.each(validatorGroups, validatorGroup => {
    result = result.then(() =>
      validateGroup(validatorGroup, value, values, onError, cancel)
    );
  });
  return result;
};

export default validateGroups;
