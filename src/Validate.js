import React from "react";
import PropTypes from "prop-types";

export class Validate extends React.Component {
  static contextTypes = {
    onChange: PropTypes.func,
    validate: PropTypes.func,
    register: PropTypes.func
  };
  state = { errors: [], runningValidations: 0 };
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onErrors = this.onErrors.bind(this);
    this.validate = this.validate.bind(this);
    this.startValidation = this.startValidation.bind(this);
    this.stopValidation = this.stopValidation.bind(this);
    this.context.register(
      this.props.name,
      this.props.rules,
      this.onErrors,
      this.stopValidation,
      this.props.defaultValue || ""
    );
  }
  onErrors(errors) {
    this.setState({ errors });
  }
  startValidation() {
    this.setState(({ runningValidations }) => ({
      runningValidations: runningValidations + 1
    }));
  }
  stopValidation() {
    this.setState(({ runningValidations }) => ({
      runningValidations: runningValidations - 1
    }));
  }
  validate() {
    this.startValidation();
    this.context.validate([this.props.name, ...this.props.invalidates]);
  }
  onChange(event) {
    this.context.onChange(this.props.name, event.target.value);
    this.validate();
  }
  render() {
    let { render, ...props } = this.props;
    return render({
      ...props,
      error: this.state.errors.length > 0,
      errors: this.state.errors,
      validating: this.state.runningValidations > 0,
      validate: this.validate,
      onChange: this.onChange
    });
  }
}

export default Validate;
