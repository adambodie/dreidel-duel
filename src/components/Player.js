import React, { Component } from "react";
import styles from "../css/player.module.scss";

export default class Player extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			id: this.props.id
		}
	this.handleChange = this.handleChange.bind(this);
	this.handleNameChange = this.handleNameChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.loop = this.loop.bind(this);
	}
	handleChange(e) {
		this.props.onScoreChange(e.target.value);  
	}
	handleNameChange(e) {
		this.setState({value: e.target.value});
	}
	handleSubmit(e) {
		this.setState({id: this.state.value});
		e.preventDefault();
	}
	loop(number) {
		let numbers = [];
		for (let i = 1; i < number + 1; i++) numbers.push(i);
		const listItems = numbers.map((number, index) => <li key={index} className={styles.counterScore}></li>);
		return listItems;
	}
	
	render() {
		const { disabled, score } = this.props;
		const { value, id } = this.state;
		return (
			<div className={styles.player}>
				<div>
					<form onSubmit={this.handleSubmit}>
						{!(id === 1 || id === 2) && (<h2 className={styles.playerName}>{id}</h2>)}
						{(id === 1 || id === 2) && (
						<div className={styles.form}>
							<input type="text" value={value} onChange={this.handleNameChange} placeholder="Place your name" />
							<input type="submit" value="X" />
						</div>
						)}
					</form>
					
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
