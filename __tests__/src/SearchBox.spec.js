import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import App from "../../src/App";
import SearchBox from "../../src/components/SearchBox";
import SearchBoxInput from "../../src/components/SearchBoxInput";

describe("SearchBox", () => {
  it("getWeather gets weather info with async call", async () => {
    const app = shallow(<App />).instance();
    app.setState({
      touched: {
        city: false,
        country: false
      }
    });

    const wrapper = shallow(
      <SearchBox updateState={app.updateState} touched={app.state.touched} />
    ).instance();

    const preventDefaultSpy = jest.fn();

    const apiKey = "01f0312628c56d7fcadfdee00da7c7a3";
    let apiBaseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

    const e = {
      target: {
        elements: {
          city: {
            value: "New York"
          },
          country: {
            value: "United States of America"
          }
        }
      }
    };
    wrapper.getWeather({
      preventDefault: preventDefaultSpy,
      target: e.target
    });

    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;

    wrapper.props.updateState({ isLoading: true });

    expect(app.state.isLoading).toBe(true);

    const callAPI = await fetch(`${apiBaseUrl}${city},${country}&appid=${apiKey}`);

    const data = await callAPI.json();

    expect(data).toBeDefined();

    wrapper.props.updateState({
      location: `${data.name} City, ${data.sys.country}`,
      temperature: app.calculateTemp(data.main.temp),
      humidity: `${data.main.humidity}%`,
      conditions: app.capitalize(data.weather[0].description),
      error: "",
      city: `${city}`,
      country: `${country}`,
      showResult: true,
      isLoading: false
    });

    expect(app.state.showResult).toBe(true);
    expect(app.state.isLoading).toBe(false);
    expect(app.state.location).toBe("New York City, US");
    expect(app.state.temperature).toContain("°F");
    expect(app.state.conditions.length).toBeGreaterThan(0);
    expect(app.state.city).toBe("New York");
    expect(app.state.country).toBe("United States of America");

    expect(preventDefaultSpy.mock.calls.length).toBe(1);
  });

  it("updateFormInputs updates form inputs when user is typing", async () => {
    const app = shallow(<App />).instance();
    app.setState({
      touched: {
        city: false,
        country: false
      }
    });
    const wrapper = shallow(
      <SearchBox updateState={app.updateState} touched={app.state.touched} />
    ).instance();
    const preventDefaultSpy = jest.fn();

    const cityInputMock = wrapper.updateFormInputs({
      preventDefault: preventDefaultSpy,
      target: { name: "city", value: "custom value" }
    });
    const cityInput = mount(
      <SearchBoxInput name="city" onChange={cityInputMock} onBlur={cityInputMock} />
    );
    cityInput.find("input").simulate("change");
    expect(preventDefaultSpy.mock.calls.length).toBe(1);

    const countryInputMock = wrapper.updateFormInputs({
      preventDefault: preventDefaultSpy,
      target: { name: "country", value: "custom value" }
    });
    const countryInput = mount(
      <SearchBoxInput name="country" onChange={countryInputMock} onBlur={countryInputMock} />
    );
    countryInput.find("input").simulate("change");
    expect(preventDefaultSpy.mock.calls.length).toBe(2);
  });

  it("city & country are empty test", async () => {
    const app = shallow(<App />).instance();
    app.setState({
      touched: {
        city: false,
        country: false
      }
    });
    const wrapper = shallow(
      <SearchBox updateState={app.updateState} touched={app.state.touched} />
    ).instance();

    const preventDefaultSpy = jest.fn();

    const apiKey = "01f0312628c56d7fcadfdee00da7c7a3";
    let apiBaseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    const e = {
      target: {
        elements: {
          city: {
            value: ""
          },
          country: {
            value: ""
          }
        }
      }
    };

    wrapper.getWeather({
      preventDefault: preventDefaultSpy,
      target: e.target
    });

    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;

    let callAPIMock = { ok: false };
    callAPIMock = await fetch(`${apiBaseUrl}${city},${country}&appid=${apiKey}`);

    expect(app.state.touched.city).toBe(true);
    expect(app.state.touched.country).toBe(true);
  });

  it("renders correctly", () => {
    const app = shallow(<App />).instance();
    app.setState({
      touched: {
        city: false,
        country: false
      }
    });
    const tree = renderer
      .create(<SearchBox updateState={app.updateState} touched={app.state.touched} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
