import React, { Component } from "react";
import styles from "../css/main.module.scss";

export default class Reset extends Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.props.onResetChange(e.target.value);  
	}
	render() {
		const { disabled } = this.props;
		return (
			<button className={styles.action} onClick={this.handleChange} disabled={disabled} >
				Reset
			</button>
		);
	}
}
