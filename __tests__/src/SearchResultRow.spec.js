import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import SearchResultRow from "../../src/components/SearchResultRow";

describe("SearchResultRow", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SearchResultRow />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
