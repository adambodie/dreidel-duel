import React from "react"
import renderer from "react-test-renderer"
import Start from "../components/Start";
import {shallow} from "enzyme"

describe("Start", () =>
	it("renders correctly", () => {
		const tree = renderer.create(<Start />).toJSON();
		expect(tree).toMatchSnapshot();
	}),
	it('renders a `button`', () => {
		const wrapper = shallow(<Start />);
		expect(wrapper.find('button').length).toBe(1);
	})		
)



