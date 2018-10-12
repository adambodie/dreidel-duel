import React, { Component } from "react";
import styles from "./main.module.css";

export default class Add extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onAddChange(e.target.value);  
	}

	render() {
		return (
			<button className={styles.action} onClick={this.handleChange} disabled={this.props.disabled}>
				Add Coin
			</button>
		);
  }
}
