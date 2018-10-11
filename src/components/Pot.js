import React, {Component} from "react"

export default class Pot extends Component {
    render() {
		return(
			<div>
				<h3>Coins in the Pot:</h3>
				<h2>{this.props.pot}</h2>
			</div>
		)
	}
}
