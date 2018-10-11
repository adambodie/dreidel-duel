import React from "react"
import renderer from "react-test-renderer"
import { PureHeader as Header } from "../components/Header"
import {shallow} from "enzyme"

describe("Header", () =>
	it("renders correctly", () => {
		const data = {
			site: {
				siteMetadata: {
					title: "Dreidel Duel!",
					author: "Adam Bodie"
				},
			},
		}	  
		const tree = renderer.create(<Header data={data}/>).toJSON()
		expect(tree).toMatchSnapshot()
	}),
	it('renders a `button`', () => {
		const data = {
			site: {
				siteMetadata: {
					title: "Dreidel Duel!",
					author: "Adam Bodie"
				},
			},
		}
		const wrapper = shallow(<Header data={data} />);
		expect(wrapper.find('.jumbotron').length).toBe(1);
	}),
	it('renders a `button`', () => {
		const data = {
			site: {
				siteMetadata: {
					title: "Dreidel Duel!",
					author: "Adam Bodie"
				},
			},
		}
		const wrapper = shallow(<Header data={data} />);
		expect(wrapper.find('.jumbotron').children().length).toBe(2);
	}),	  
   
)
