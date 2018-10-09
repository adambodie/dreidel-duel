// Libs
import React, { Component } from "react";
import styles from "./main.module.css";

export default class Add extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			disabled: true
		}
	}

	handleChange(e) {
		this.props.onAddChange(e.target.value);  
	}

	render() {
		let disabled = this.props.disabled;
		return (
			<button className={styles.action} onClick={this.handleChange} disabled={disabled}>
				Add Coin
			</button>
		);
  }
}
