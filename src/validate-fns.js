import _ from "lodash";

const validate = (validators, value, onErrors, cancel) => {
  let errors = _.map(validators, v => ({ [v.id]: null }));
  const onError = (validator, error) => errors[validator] = error;
  let results = validators.map(v => {
    let result = v.run({ value }).then(
      () => true,
      error => {
        onError(v.id, error);
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

const nestedValidate = (validators, value, onError, cancel) => {
  let result = Promise.resolve();
  _.each(validators, validator => {
    result = result.then(() => validate(validator, value, onError, cancel));
  });
  return result;
};

export default nestedValidate;
