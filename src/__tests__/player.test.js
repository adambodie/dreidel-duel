import React from "react"
import renderer from "react-test-renderer"
import Player from "../components/player"

describe("Player", () =>
  it("renders correctly", () => {
    const tree = renderer.create(<Player />).toJSON()
    expect(tree).toMatchSnapshot()
  }))

