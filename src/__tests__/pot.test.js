import React from "react"
import renderer from "react-test-renderer"
import Pot from "../components/Pot"
import {shallow} from "enzyme"

describe("Pot", () =>
	it("renders correctly", () => {
		const tree = renderer.create(<Pot />).toJSON()
		expect(tree).toMatchSnapshot()
	}),

	it('renders an `h2` and `h3` text', () => {
		const wrapper = shallow(<Pot />);
		expect(wrapper.find('h2').length).toBe(1);
		expect(wrapper.find('h3').length).toBe(1);
	}),   
    it('has two child elements', () => {
		const wrapper = shallow(<Pot />);
		expect(wrapper.find('div').children().length).toBe(2);
	})
)
