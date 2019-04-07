import React, { Component } from "react";
import styles from "../css/player.module.scss";

export default class Pot extends Component {
	constructor(props) {
		super(props);
		this.loop = this.loop.bind(this);
	}
	loop(number) {
		let numbers = [];
		for (let i = 1; i < number + 1; i++) numbers.push(i);
		const listItems = numbers.map((number, index) => <li key={index} className={styles.pot}></li>);
		return listItems;
	}
	
	render() {
		const { pot } = this.props;
		return (
			<div className={styles.pot}>
				{ pot > 0 && (<p style={{top: -10 * pot}}>{pot}</p>)}
				{this.loop(pot)}
			</div>
		);
	}
}
