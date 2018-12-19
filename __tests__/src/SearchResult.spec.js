import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import SearchResult from "../../src/components/SearchResult";
import App from "../../src/App";

describe("SearchResult", () => {
  it("clear has to clear form and state", () => {
    const propsMock = {
      location: "",
      temperature: "",
      humidity: "",
      conditions: "",
      error: undefined,
      showResult: true,
      isLoading: false,
      updateState: jest.fn()
    };

    const app = shallow(<App />).instance();
    const updateStateSpy = jest.fn(() => {
      app.setState(propsMock);
    });

    const wrapper = shallow(<SearchResult updateState={updateStateSpy} />).instance();

    const preventDefaultSpy = jest.fn();
    const resetFormSpy = jest.fn();

    wrapper.clear({
      preventDefault: preventDefaultSpy,
      resetForm: resetFormSpy,
      updateState: updateStateSpy
    });

    expect(preventDefaultSpy.mock.calls.length).toBe(1);
    expect(resetFormSpy.mock.calls.length).toBe(0);
    expect(updateStateSpy.mock.calls.length).toBe(1);
  });
  it("renders correctly", () => {
    const tree = renderer.create(<SearchResult />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
