import React from "react"
import renderer from "react-test-renderer"
import Reset from "../components/reset"

describe("Reset", () =>
  it("renders correctly", () => {
    const tree = renderer.create(<Reset />).toJSON()
    expect(tree).toMatchSnapshot()
  }))
