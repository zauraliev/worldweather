import React, { Component } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResult";

class App extends Component {
  state = {
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
    isLoading: false,
    value: "",
    autocompleteData: []
  };
  updateState = state => {
    this.setState(state);
  };
  capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join("").toLowerCase();

  calculateTemp = temp => {
    const tempSign = "°F";
    const dayTimeTemp = Math.round(1.8 * (temp - 273.15) + 32);

    return `${dayTimeTemp}${tempSign}`;
  };

  componentDidMount = async () => {
    // This part is for Autocomplete inputs for SearchBox
    // will continue work on it later
    const countriesData = require("./api/countries");
    const citiesData = require("./api/country_codes_cities");

    const countriesWithCodes = [];

    if (countriesData) {
      for (let i = 0; i < countriesData.length; i++) {
        let obj = {};
        obj.label = countriesData[i].name;
        obj.value = countriesData[i].alpha2Code;
        countriesWithCodes.push(obj);
      }

      var citiesClone = JSON.parse(JSON.stringify(citiesData));

      this.setState({
        countries: countriesWithCodes,
        autocompleteData: countriesWithCodes,
        cities: citiesClone
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
              <div className="col-4">
                <div className="form-group">
                  <Header />
                </div>
                <SearchBox
                  city={this.state.city}
                  country={this.state.country}
                  error={this.state.error}
                  touched={this.state.touched}
                  countries={this.state.countries}
                  updateState={this.updateState}
                  value={this.state.value}
                  autocompleteData={this.state.autocompleteData}
                  capitalize={this.capitalize}
                  calculateTemp={this.calculateTemp}
                />
              </div>
            </div>
          </div>
          <SearchResult
            location={this.state.location}
            temperature={this.state.temperature}
            humidity={this.state.humidity}
            conditions={this.state.conditions}
            error={this.state.error}
            showResult={this.state.showResult}
            isLoading={this.state.isLoading}
            updateState={this.updateState}
          />
        </div>
      </div>
    );
  }
}

export default App;
