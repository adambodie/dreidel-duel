import React from "react"
import renderer from "react-test-renderer"
import Spin from "../components/spin"

describe("Spin", () =>
  it("renders correctly", () => {
    const tree = renderer.create(<Spin />).toJSON()
    expect(tree).toMatchSnapshot()
  }))
