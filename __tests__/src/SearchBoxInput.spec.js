import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import SearchBoxInput from "../../src/components/SearchBoxInput";

describe("SearchBoxInput", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SearchBoxInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
