import React from "react";

const SearchResultRow = props => (
  <div className="row">
    <div className="col-md-3 text-lg-left">
      <label className="font-weight-bold list-header mr-1">{props.label}</label>
    </div>
    <div className="col-md-6 text-lg-left">
      <span>{props.value}</span>
    </div>
  </div>
);

export default SearchResultRow;
