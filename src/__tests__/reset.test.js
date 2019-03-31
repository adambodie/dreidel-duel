import React from "react"
import renderer from "react-test-renderer"
import Reset from "../components/Reset"
import {shallow} from "enzyme"

describe("Reset", () =>
	it("renders correctly", () => {
		const tree = renderer.create(<Reset />).toJSON()
		expect(tree).toMatchSnapshot()
	}),
	it('renders a `button`', () => {
		const wrapper = shallow(<Reset />);
		expect(wrapper.find('button').length).toBe(1);
	})
)
