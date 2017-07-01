import React, { Component } from "react";
import _ from "lodash";
import { Validator } from "./Validator";
import { Validate } from "./Validate";
import {
  Validation,
  LengthValidation,
  MatchValidation,
  EqualsValidation,
  RequiredValidation,
  WaitValidation
} from "./validations";

const ValidatedField = params => (
  <Validate
    name={params.name}
    invalidates={params.invalidates || []}
    rules={params.rules}
    render={({ name, onChange, validate, validating, errors, error }) => (
      <div style={{ backgroundColor: error && "red" }}>
        <input
          style={{ backgroundColor: validating && "lightblue" }}
          name={name}
          placeholder={name}
          onChange={onChange}
          onBlur={validate}
        />
        {errors.map((e, idx) => <p key={idx}>{e}</p>)}
      </div>
    )}
  />
);

export default class extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to React components</h2>
        <Validator
          validators={[
            LengthValidation,
            MatchValidation,
            EqualsValidation,
            RequiredValidation,
            WaitValidation
          ]}
        >
          <ValidatedField
            name="Username"
            rules={f =>
              f
                .required()
                .then(f =>
                  f
                    .length({ min: 3 })
                    .matches(/^[a-z0-9-]+$/, "must consist of only a-z, 0-9, -")
                )
                .then(f =>
                  f
                    .matches(/^[a-z0-9]/, "must start with a dash")
                    .matches(/[a-z0-9]$/, "must not end with a dash")
                )
                .then(f =>
                  f.waitDebounced(200, 1800, "is already taken", false)
                )}
          />
          <ValidatedField
            name="Email"
            rules={f =>
              f
                .required()
                .then(f =>
                  f.matches(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "is not a vaild email address"
                  )
                )}
          />
          <ValidatedField
            name="Password"
            invalidates={["Password confirmation"]}
            rules={f => f.required().then(f => f.length({ min: 10 }))}
          />
          <ValidatedField
            name="Password confirmation"
            rules={f => f.equals("Password")}
          />
        </Validator>
      </div>
    );
  }
}
