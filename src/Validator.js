import React from "react";
import PropTypes from "prop-types";
import Field from "./field";
import validate from "./validate-fns";

export class Validator extends React.Component {
  fields = {};
  static childContextTypes = {
    register: PropTypes.func,
    validateChange: PropTypes.func
  };
  constructor(props) {
    super(props);
    let { validators } = props;
    this.validators = validators;
    this.register = this.register.bind(this);
    this.validateChange = this.validateChange.bind(this);
  }
  render() {
    return <div>{this.props.children}</div>;
  }
  register(name, rules, callback) {
    this.fields[name] = { callback, rules: rules(new Field(this.validators)) };
  }
  cancel() {}
  validateChange(name, value) {
    this.cancel();
    let cancel = new Promise(resolve => {
      this.cancel = resolve;
    });
    let field = this.fields[name];
    let validators = field.rules.validators();
    let cb = errors =>
      field.callback(
        _.chain(validators)
          .flatten()
          .map(validator => errors[validator.id])
          .filter()
          .value()
      );
    return validate(validators, value, cb, cancel);
  }
  getChildContext() {
    return {
      register: this.register,
      validateChange: this.validateChange
    };
  }
}

export default Validator;
