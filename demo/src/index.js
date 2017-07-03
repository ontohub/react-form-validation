import React, { Component } from "react";
import { render } from "react-dom";

import "./index.css";
import { Validator, Validate } from "../../src";
import WaitValidation from "../../src/validations/wait-validation";

import _ from "lodash";
const ValidatedField = params => (
  <Validate
    name={params.name}
    invalidates={params.invalidates || []}
    rules={params.rules}
    render={({ name, onChange, validate, validating, errors, error }) => (
      <div
        className={[
          "field",
          (error && "error") || "",
          (validating && "validating") || ""
        ].join(" ")}
      >
        <input
          name={name}
          type={params.type}
          placeholder={name}
          onChange={onChange}
          onBlur={validate}
        />
        <div className="errors">
          {errors.map((e, idx) => <p key={idx}>{e}</p>)}
        </div>
      </div>
    )}
  />
);

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>Form validations</h1>
        <Validator validators={[WaitValidation]}>
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
                    .matches(/^[a-z0-9]/, "must not start with a dash")
                    .matches(/[a-z0-9]$/, "must not end with a dash")
                )
                .then(f =>
                  f.waitDebounced(500, 500, "is already taken", false)
                )}
          />
          <ValidatedField
            name="Email"
            rules={f => f.required().then(f => f.email())}
          />
          <ValidatedField
            name="Password"
            type="password"
            invalidates={["Password confirmation"]}
            rules={f => f.required().then(f => f.length({ min: 10 }))}
          />
          <ValidatedField
            name="Password confirmation"
            type="password"
            rules={f => f.equals("Password")}
          />
          <ValidatedField
            name="Admin"
            type="checkbox"
            rules={f => f.required()}
          />
          <Validate
            invalidates={[
              "Username",
              "Email",
              "Password",
              "Password confirmation",
              "Admin"
            ]}
            render={({ validate }) => (
              <button onClick={validate}>Validate all</button>
            )}
          />
        </Validator>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
