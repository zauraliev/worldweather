import React from "react";

const SearchBoxInputAC = props => (
  <div className="form-group">
    <Autocomplete
      shouldItemRender={(item, value) =>
        item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
      }
      getItemValue={props.getItemValue}
      items={props.autocompleteData}
      renderItem={props.renderItem}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onSelect={props.onSelect}
      inputProps={{
        id: "country",
        name: "country",
        className: "form-control",
        placeholder: "Country",
        required: props.errorType
      }}
      wrapperStyle={{
        position: "relative",
        display: "block",
        zIndex: 99,
        maxHeight: "100px"
      }}
    />
    {props.errorType ? (
      <div className="invalid-feedback d-block">Please enter Country field</div>
    ) : null}
  </div>
);
export default SearchBoxInputAC;
