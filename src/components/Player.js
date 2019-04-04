import React, { Component } from "react";
import styles from "../css/player.module.scss";

export default class Player extends Component {
	constructor() {
		super();
		this.state = {
			value: ''
		}     
	this.handleChange = this.handleChange.bind(this);
	this.handleNameChange = this.handleNameChange.bind(this);
	}
	handleChange(e) {
		this.props.onScoreChange(e.target.value);  
	}
	handleNameChange(e) {
		this.setState({value: e.target.value});
	}
	render() {
		const { id, disabled, score } = this.props;
		const { value } = this.state;
		return (
			<div className={styles.player}>
				<h2 className={styles.playerName}>Player {id}</h2>
				<input type="text" value={value} onChange={this.handleNameChange} />
				<div className={styles.counter}>
					<button
						className={styles.counterAction}
						onClick={this.handleChange}
						disabled={disabled}
						>
						SPIN
					</button>
					<div className={styles.counterScore}>
						{score}
					</div>
				</div>
			</div>
		);
	}
}
