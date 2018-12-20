import React, { Component } from "react";
import SearchResultRow from "./SearchResultRow";
import ArrowSVG from "./ArrowSVG";
class SearchResult extends Component {
  clear = e => {
    e.preventDefault();
    this.props.updateState({
      location: "",
      temperature: "",
      humidity: "",
      conditions: "",
      touched: {
        city: false,
        country: false
      },
      city: "",
      country: "",
      showResult: false,
      value: "",
      countryCode: ""
    });
  };
  render() {
    const showResult = this.props.showResult;
    const isLoading = this.props.isLoading;
    return (
      <div className="search-result ">
        <div className="row justify-content-center">
          <div className="col-4">
            <i
              className={"mt-5 " + (isLoading ? "fa fa-circle-o-notch fa-spin" : "")}
              style={{ fontSize: "60px" }}
            />
            <div className={"arrow " + (showResult ? "d-none" : "")}>
              <ArrowSVG />
              <p>Enter a location above to get started</p>
            </div>
            <div className={!showResult ? "d-none" : ""}>
              <div className="row-bordered-s">
                <SearchResultRow label="Location" value={this.props.location} />
              </div>
              <div className="row-bordered-o">
                <SearchResultRow label="Temperature" value={this.props.temperature} />
              </div>
              <div className="row-bordered-s">
                <SearchResultRow label="Humidity" value={this.props.humidity} />
              </div>
              <div className="row-bordered-o">
                <SearchResultRow label="Conditions" value={this.props.conditions} />
              </div>
              <button className="btn btn-clear btn-md btn-block mt-3" onClick={this.clear}>
                <span className="btn-text">Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SearchResult;
