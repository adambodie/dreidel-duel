import React, {Component} from "react"

export default class Spin extends Component {
    render() {
		return(
			<h2 style={{fontSize: 64}}>{this.props.spin}</h2>
		)
	}
}
