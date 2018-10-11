import React from "react"
import renderer from "react-test-renderer"
import Spin from "../components/Spin"
import {shallow} from "enzyme"

describe("Spin", () =>
	it("renders correctly", () => {
		const tree = renderer.create(<Spin />).toJSON()
		expect(tree).toMatchSnapshot()
	}),
	it('renders an `h2` text', () => {
		const wrapper = shallow(<Spin />);
		expect(wrapper.find('h2').length).toBe(1);
	})  
)
