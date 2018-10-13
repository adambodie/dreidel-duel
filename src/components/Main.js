// Libs
import React, { Component } from "react";
import styles from "../css/main.module.css";
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
		let dreidel = Math.floor(Math.random() * 4);
		const hebrew = ["נ", "שׁ", "ה", "ג"];
		let currentSpin = hebrew[dreidel];
		const newPlayers = [...this.state.players];
		let playerOne = newPlayers[0];
		let playerTwo = newPlayers[1];

		if (playerOne.isDisabled === true && this.state.turn >= 1) {
			this.setState(prevState => ({ isButtonDisabled: false }));
		}
		if ((playerOne.score <= 0 || playerTwo.score <= 0) && (dreidel === 1 || dreidel === 3)) {
			newPlayers.forEach((element) => element.isDisabled = true );
			this.setState(prevState => ({
				newPlayers,
				pot: "Game Over, play again"
			}));
		} else {
			if (dreidel === 0) {
			/* Spin a Nun - Nothing */
				if (playerOne.isDisabled === false) {
					newPlayers.forEach((element) => element.isDisabled = !element.isDisabled );
				} else {
					playerTwo.isDisabled = true;
				}
			} else if (dreidel === 1) {
			/* Spin a Shin - Put one in the Pot */
				if (playerOne.isDisabled === false) {
					newPlayers.forEach((element) => element.isDisabled = !element.isDisabled );
					playerOne.score -= 1;
				} else {
					playerTwo.score -= 1;
					playerTwo.isDisabled = true;
				}
				this.setState(prevState => ({ pot: this.state.pot + 1 }));
			} else if (dreidel === 2) {
			/* Spin a Hay - Win half of your coins in the Pot */
				if (playerOne.isDisabled === false) {
					newPlayers.forEach((element) => element.isDisabled = !element.isDisabled );
					playerOne.score += Math.round(this.state.pot / 2);
				} else {
					playerTwo.score += Math.round(this.state.pot / 2);
					playerTwo.isDisabled = true;
				}
				this.setState(prevState => ({ pot: Math.floor(this.state.pot / 2) }));
			} else {
			/* Spin a Gimel - Win everything  */
				if (playerOne.isDisabled === false) {
					playerOne.score += this.state.pot;
					newPlayers.forEach((element) => element.isDisabled = !element.isDisabled );
				} else {
					playerTwo.score += this.state.pot;
					playerTwo.isDisabled = true;
				}
				newPlayers.forEach((element) => element.score  -= 1 );
				this.setState(prevState => ({ pot: 2 }));
			}
			this.setState(prevState => ({
				newPlayers,
				spin: currentSpin,
				turn: this.state.turn + 1
			}));
		}
	}

  render() {
    return (
		<div className={styles.container}>
			<div className={styles.players}>
				<Player 
					score={this.state.players[0].score} 
					disabled={this.state.players[0].isDisabled} 
					onScoreChange={this.onScoreChange} 
					players={this.state.players}
					id={this.state.players[0].id}
					/>
					<Spin spin={this.state.spin} />
				<Player  
					score={this.state.players[1].score} 
					disabled={this.state.players[1].isDisabled} 
					onScoreChange={this.onScoreChange} 
					players={this.state.players}
					id={this.state.players[1].id}
					/>
			</div>
			<div className={styles.footer}>
				<Add onAddChange={this.onAddChange} disabled={this.state.isButtonDisabled}/>
				<Pot pot={this.state.pot} />
			</div>
			<div className={styles.buttons}>
				<Reset onResetChange={this.onResetChange} disabled={this.state.isDisabled} />
				<Start onStartChange={this.onStartChange} disabled={!this.state.isDisabled} />
			</div>
        </div>
    );
  }
}
