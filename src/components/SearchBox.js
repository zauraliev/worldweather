import React, { Component } from "react";
import SearchBoxInput from "./SearchBoxInput";

//import Autocomplete from "react-autocomplete";
//let selectedValue = "";

class SearchBox extends Component {
  getWeather = async e => {
    e.preventDefault();
    const api_key = "01f0312628c56d7fcadfdee00da7c7a3";
    let api_base_url = "https://api.openweathermap.org/data/2.5/weather?q=";
    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;

    if (city && country) {
      try {
        this.props.updateState({
          isLoading: true
        });
        const callAPI = await fetch(`${api_base_url}${city},${country}&appid=${api_key}`);

        const data = await callAPI.json();

        this.props.updateState({
          location: `${data.name} City, ${data.sys.country}`,
          temperature: this.props.calculateTemp(data.main.temp),
          humidity: `${data.main.humidity}%`,
          conditions: this.props.capitalize(data.weather[0].description),
          error: "",
          city: `${city}`,
          country: `${country}`,
          showResult: true,
          isLoading: false
        });
      } catch (error) {
        this.props.updateState({
          error: error.message,
          isLoading: false
        });
      }
    } else {
      this.props.updateState({
        touched: {
          city: true,
          country: true
        }
      });
    }
  };

  updateFormInputs = e => {
    e.preventDefault();
    this.props.updateState({ [e.target.name]: e.target.value });
    if (e.target.name === "city") {
      this.props.updateState({
        city: e.target.value,
        touched: {
          city: true,
          country: this.props.touched.country
        }
      });
    }
    if (e.target.name === "country") {
      this.props.updateState({
        country: e.target.value,
        touched: {
          city: this.props.touched.city,
          country: true
        },
        countryCode: e.target.value
      });
    }
  };
  render() {
    const cityError = !this.props.city && this.props.touched.city;
    const countryError = !this.props.country && this.props.touched.country;
    const errorCondition = cityError || countryError;
    const validateFormError = errorCondition ? "was-validated" : "";
    return (
      <form
        id="weatherForm"
        onSubmit={this.getWeather}
        className={"needs-validation " + validateFormError}
        noValidate
      >
        <SearchBoxInput
          inputName="city"
          inputId="city"
          placeholder="City"
          updateFormInputs={this.updateFormInputs}
          errorType={cityError}
        />
        <SearchBoxInput
          inputName="country"
          inputId="country"
          placeholder="Country"
          updateFormInputs={this.updateFormInputs}
          errorType={countryError}
        />
        <div className="form-group">
          <button className="btn btn-main btn-md btn-block">
            <span className="btn-text">Get Weather</span>
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBox;
