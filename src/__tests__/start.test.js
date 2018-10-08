import React from "react"
import renderer from "react-test-renderer"
import Start from "../components/start";

describe("Start", () =>
	it("renders correctly", () => {
		const tree = renderer.create(<Start />).toJSON();
		expect(tree).toMatchSnapshot();
	}),	
)



