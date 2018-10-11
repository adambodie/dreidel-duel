import React from "react"
import renderer from "react-test-renderer"
import Player from "../components/player"
import {shallow} from "enzyme"



describe("Player", () =>
	it("renders correctly", () => {
		const tree = renderer.create(<Player />).toJSON()
		expect(tree).toMatchSnapshot()
	}),
	it('renders a `player`', () => {
		const wrapper = shallow(<Player />);
		expect(wrapper.find('.player').length).toBe(1);
	}),
    it('has three child elements on player class', () => {
		const wrapper = shallow(<Player />);
		expect(wrapper.find('.player').children().length).toBe(3);
	}),	    
	it('has two child elements on counter class', () => {
		const wrapper = shallow(<Player />);
		expect(wrapper.find('.counter').children().length).toBe(2);
	}),	  
)

