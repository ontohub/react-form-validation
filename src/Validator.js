import React from "react";
import PropTypes from "prop-types";
import Field from "./field";
import validate from "./validate-fns";

export class Validator extends React.Component {
  fields = {};
  values = {};
  static childContextTypes = {
    register: PropTypes.func,
    onChange: PropTypes.func,
    validate: PropTypes.func
  };
  constructor(props) {
    super(props);
    let { validators } = props;
    this.validators = validators;
    this.register = this.register.bind(this);
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  render() {
    return <div>{this.props.children}</div>;
  }
  register(name, rules, onErrors, onValidateFinish, defaultValue) {
    this.fields[name] = {
      onErrors,
      onValidateFinish,
      rules: rules(new Field(this.validators)),
      cancel: () => {}
    };
    this.values[name] = defaultValue;
  }
  onChange(name, value) {
    this.values[name] = value;
  }
  validate(names) {
    _.each(names, name => {
      this.fields[name].cancel();
      let cancel = new Promise(resolve => {
        this.fields[name].cancel = resolve;
      });
      let field = this.fields[name];
      let validators = field.rules.validators();
      let value = this.values[name];
      let cb = errors =>
        field.onErrors(
          _.chain(validators)
            .flatten()
            .map(validator => errors[validator.id])
            .filter()
            .value()
        );
      validate(validators, value, this.values, cb, cancel).then(
        this.fields[name].onValidateFinish,
        this.fields[name].onValidateFinish
      );
    });
  }
  getChildContext() {
    return {
      register: this.register,
      onChange: this.onChange,
      validate: this.validate
    };
  }
}

export default Validator;
