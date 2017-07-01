import React from "react";
import PropTypes from "prop-types";

export class Validate extends React.Component {
  static contextTypes = {
    validateChange: PropTypes.func,
    register: PropTypes.func
  };
  state = { errors: [], runningValidations: 0 };
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onErrors = this.onErrors.bind(this);
    this.context.register(this.props.name, this.props.rules, this.onErrors);
  }
  onErrors(errors) {
    this.setState({ errors });
  }
  onChange(event) {
    this.setState(({ runningValidations }) => ({
      runningValidations: runningValidations + 1
    }));
    let stopValidation = () =>
      this.setState(({ runningValidations }) => ({
        runningValidations: runningValidations - 1
      }));
    this.context
      .validateChange(this.props.name, event.target.value)
      .then(stopValidation, stopValidation);
  }
  render() {
    let { render, ...props } = this.props;
    return render({
      ...props,
      errors: this.state.errors,
      validating: this.state.runningValidations > 0,
      validate: this.onChange
    });
  }
}

export default Validate;
