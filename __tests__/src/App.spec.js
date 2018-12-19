import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import App from "../../src/App";

describe("App", () => {
  it("updateState should update state.value", () => {
    const wrapper = shallow(<App />).instance();

    const propsMock = {
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
    };

    wrapper.updateState(propsMock);

    wrapper.updateState({ value: "Input Value" });

    expect(wrapper.state.value).toBe("Input Value");
  });

  it("capitalize should Capitalize first letter of any string", () => {
    const wrapper = shallow(<App />).instance();

    const text = wrapper.capitalize("some text");

    expect(text).toEqual("Some text");
  });

  it("calculateTemp calculates day time temperature", () => {
    const wrapper = shallow(<App />).instance();

    const calculateTempMock = wrapper.calculateTemp(269);

    expect(calculateTempMock).toBe("25°F");
  });
});
