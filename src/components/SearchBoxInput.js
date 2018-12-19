import React from "react";

const SearchBoxInput = props => (
  <div className="form-group">
    <input
      type="text"
      name={props.inputName}
      className="form-control"
      id={props.inputId}
      placeholder={props.placeholder}
      onChange={props.updateFormInputs}
      onBlur={props.updateFormInputs}
      required={props.errorType}
    />
    {props.errorType ? (
      <div className="invalid-feedback">Please enter {props.placeholder} field</div>
    ) : null}
  </div>
);

export default SearchBoxInput;
