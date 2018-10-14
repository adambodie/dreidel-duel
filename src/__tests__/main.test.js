import React from "react"
import renderer from "react-test-renderer"
import Main from "../components/Main"
import Player from "../components/Player"
import Pot from "../components/Pot"
import Start from "../components/Start"
import {shallow} from "enzyme"

describe("Main", () =>
	it("renders correctly", () => {
		const tree = renderer.create(<Main />).toJSON()
		expect(tree).toMatchSnapshot()
	}),
	it('renders two <Player /> components', () => {
		const wrapper = shallow(<Main />);
		expect(wrapper.find(Player).length).toBe(2);
	}),
	it('has a isDisabled state of true', () => {
		const wrapper = shallow(<Main />);
		expect(wrapper.state().isDisabled).toEqual(true);
	})
	
)
