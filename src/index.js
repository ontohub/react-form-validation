import React, { Component } from "react";
import _ from "lodash";
import { Validator } from "./Validator";
import { Validate } from "./Validate";
import {
  Validation,
  LengthValidation,
  MatchValidation,
  WaitValidation
} from "./validations";

global.onError = errors => {
  console.info(
    _.chain(nestedExample)
      .map(vs => _.map(vs, v => errors[v.id]))
      .flatten()
      .filter()
      .value()
  );
};

export default class extends Component {
  render() {
    return (
      <div>
        <Validator
          validators={[LengthValidation, MatchValidation, WaitValidation]}
        >
          <Validate
            name="E-mail"
            rules={f =>
              f
                .length({ min: 3 })
                .matches(/^[a-z0-9]/, "must not start with a dash")
                .matches(/[a-z0-9]$/, "must not end with a dash")
                .matches(/^[a-z0-9-]+$/, "must consist of only a-z, 0-9, -")
                .then(f => f.wait(1000, "is already taken", false))}
            render={({ name, validate, validating, errors }) => (
              <div style={{ backgroundColor: errors.length > 0 && "red" }}>
                <input
                  style={{ backgroundColor: validating && "lightblue" }}
                  name={name}
                  placeholder={name}
                  onChange={validate}
                />
                {errors.map((e, idx) => <p key={idx}>{e}</p>)}
              </div>
            )}
          />
        </Validator>
        <h2>Welcome to React components</h2>
      </div>
    );
  }
}
