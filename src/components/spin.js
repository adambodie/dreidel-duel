import React, {Component} from "react"

export default class Spin extends Component {
    render() {
		return(
			<h2 style={{fontSize: 64, width: 55}}>{this.props.spin}</h2>
		)
	}
}
