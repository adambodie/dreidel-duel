import React from "react"
import renderer from "react-test-renderer"
import Pot from "../components/pot"

describe("Pot", () =>
  it("renders correctly", () => {
    const tree = renderer.create(<Pot />).toJSON()
    expect(tree).toMatchSnapshot()
  }))
