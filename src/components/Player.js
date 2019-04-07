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
	this.loop = this.loop.bind(this);
	}
	handleChange(e) {
		this.props.onScoreChange(e.target.value);  
	}
	handleNameChange(e) {
		this.setState({value: e.target.value});
	}
	
	loop(number) {
		let numbers = [];
		for (let i = 1; i < number + 1; i++) numbers.push(i);
		const listItems = numbers.map((number, index) => <li key={index} className={styles.counterScore}></li>);
		return listItems;
	}
	
	render() {
		const { id, disabled, score } = this.props;
		const { value } = this.state;
		return (
			<div className={styles.player}>
				<div>
					<h2 className={styles.playerName}>Player {id}</h2>
					<input type="text" value={value} onChange={this.handleNameChange} />
					<button
						className={styles.counterAction}
						onClick={this.handleChange}
						disabled={disabled}
						>
						SPIN
					</button>
				</div>
				<div className={styles.counter}>
					<div className={styles.counterScore}>
						{ score > 0 && (<p style={{top: -10 * score}}>{score}</p>)}
						{this.loop(score)}
					</div>
				</div>
			</div>
		);
	}
}
