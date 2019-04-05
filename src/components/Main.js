// Libs
import React, { Component } from "react";
import styles from "../css/main.module.scss";
import { NUN, SHIN, HAY, GIMEL } from './Constants';
import Pot from './Pot';
import Spin from './Spin';
import Reset from './Reset';
import Start from './Start';
import Add from './Add';
import Player from './Player';


export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			pot: 10,
			spin: "",
			turn: 0,
			isDisabled: true,
			isButtonDisabled: true,
			players: [
				{ score: 5, isDisabled: true, id: 1 },
				{ score: 5, isDisabled: true, id: 2 }
			]
		};
		this.onStartChange = this.onStartChange.bind(this);
		this.onResetChange = this.onResetChange.bind(this);
		this.onScoreChange = this.onScoreChange.bind(this);
		this.onAddChange = this.onAddChange.bind(this);
	}

	onStartChange() {
		const newPlayers = [...this.state.players];
		newPlayers[0].isDisabled = false;
		this.setState(prevState => ({
			newPlayers,
			isDisabled: !prevState.isDisabled
		}));
	}
	
	onResetChange() {
		const newPlayers = [...this.state.players];
		newPlayers.forEach((item) => {
			item.isDisabled = true;
			item.score = 5;
		});
		this.setState(prevState => ({
			newPlayers,
			isDisabled: !prevState.isDisabled,
			pot: 10,
			spin: "",
			isButtonDisabled: true,
			turn: 0
		}));
	}
  
	onAddChange() {
		const newPlayers = [...this.state.players];
		let playerOne = newPlayers[0];
		let playerTwo = newPlayers[1];
		if (playerOne.score === 0 || playerTwo.score === 0) {
			newPlayers.forEach((element) => element.isDisabled = true );
			this.setState(prevState => ({
				newPlayers,
				pot: "Game Over, play again"
			}));
		} else {
			if (playerOne.isDisabled === true &&  this.state.turn >= 1) {
				newPlayers.forEach((element) => element.score -= 1 );
				playerOne.isDisabled = false;
				this.setState(prevState => ({ pot: this.state.pot + 2 }));
			}
		}
		this.setState(prevState => ({ isButtonDisabled: true }));
	}
  
	onScoreChange() {
		const { turn, pot, players } = this.state;
		let dreidel = Math.floor(Math.random() * 4);
		const hebrew = [NUN, SHIN, HAY, GIMEL];
		let currentSpin = hebrew[dreidel];
		const newPlayers = [...players];
		let playerOne = newPlayers[0];
		let playerTwo = newPlayers[1];

		if (playerOne.isDisabled === true && turn >= 1) {
			this.setState(prevState => ({ isButtonDisabled: false }));
		}
		if ((playerOne.score <= 0 || playerTwo.score <= 0) && (dreidel === 1 || dreidel === 3)) {
			newPlayers.forEach((element) => element.isDisabled = true );
			this.setState(prevState => ({
				newPlayers,
				pot: "Game Over"
			}));
		} else {
			switch (dreidel) {
				case 0:	/* Spin a Nun - Nothing */
					if (playerOne.isDisabled === false) {
						newPlayers.forEach((element) => element.isDisabled = !element.isDisabled );
					} else {
						playerTwo.isDisabled = true;
					}
					break;
				case 1: /* Spin a Shin - Put one in the Pot */
					if (playerOne.isDisabled === false) {
						newPlayers.forEach((element) => element.isDisabled = !element.isDisabled );
						playerOne.score -= 1;
					} else {
						playerTwo.score -= 1;
						playerTwo.isDisabled = true;
					}
					this.setState(prevState => ({ pot: pot + 1 }));
					break;
				case 2:/* Spin a Hay - Win half of your coins in the Pot */
					if (playerOne.isDisabled === false) {
						newPlayers.forEach((element) => element.isDisabled = !element.isDisabled );
						playerOne.score += Math.round(pot / 2);
					} else {
						playerTwo.score += Math.round(pot / 2);
						playerTwo.isDisabled = true;
					}
					this.setState(prevState => ({ pot: Math.floor(pot / 2) }));
					break;
				default: /* Spin a Gimel - Win everything  */
					if (playerOne.isDisabled === false) {
						playerOne.score += pot;
						newPlayers.forEach((element) => element.isDisabled = !element.isDisabled );
					} else {
						playerTwo.score += pot;
						playerTwo.isDisabled = true;
					}
					newPlayers.forEach((element) => element.score  -= 1 );
					this.setState(prevState => ({ pot: 2 }));
				}
			this.setState(prevState => ({
				newPlayers,
				spin: currentSpin,
				turn: turn + 1
			}));
		}
	}

	render() {
	const { pot, spin, players, isButtonDisabled, isDisabled } = this.state;
		return (
			<div className={styles.container}>
				<div className={styles.players}>
					<Player 
						score={players[0].score} 
						disabled={players[0].isDisabled} 
						onScoreChange={this.onScoreChange} 
						players={players}
						id={players[0].id}
					/>
					<div className={styles.info}>
						<Spin spin={spin} />
						<Pot pot={pot} />
					</div>
					<Player  
						score={players[1].score} 
						disabled={players[1].isDisabled} 
						onScoreChange={this.onScoreChange} 
						players={players}
						id={players[1].id}
					/>
				</div>
				<div className={styles.buttons}>
					<Reset onResetChange={this.onResetChange} disabled={isDisabled} />
					<Add onAddChange={this.onAddChange} disabled={isButtonDisabled}/>
					<Start onStartChange={this.onStartChange} disabled={!isDisabled} />
				</div>
			</div>
		);
	}
}
