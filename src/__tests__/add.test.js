import React from "react"
import renderer from "react-test-renderer"
import Add from "../components/Add"
import {shallow} from "enzyme"

describe("Add", () =>
	it("renders correctly", () => {
		const tree = renderer.create(<Add />).toJSON()
		expect(tree).toMatchSnapshot()
	}),
	it('renders a `button`', () => {
		const wrapper = shallow(<Add />);
		expect(wrapper.find('button').length).toBe(1);
	}),
	it('renders the correct text', () => {
		const wrapper = shallow(<Add />);
		expect(wrapper.text()).toEqual('Add Coin');
	})	
)
