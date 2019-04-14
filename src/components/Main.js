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
import store from '../store';
import { addTurn, 
		 resetTurn, 
		 enableStartButton, 
		 disableStartButton,
		 enableResetButton, 
		 disableResetButton,  
		 enableAddButton,  
		 disableAddButton,  
		 }  from '../store/actions'; 

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			pot: 10,
			spin: "",
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
		store.dispatch(disableStartButton());
		store.dispatch(enableResetButton());
		this.setState(prevState => ({
			newPlayers,
		}));
	}
	
	onResetChange() {
		const newPlayers = [...this.state.players];
		newPlayers.forEach((item) => {
			item.isDisabled = true;
			item.score = 5;
		});
		store.dispatch(resetTurn());
		store.dispatch(disableResetButton());
		store.dispatch(disableAddButton());
		store.dispatch(enableStartButton());
		this.setState(prevState => ({
			newPlayers,
			pot: 10,
			spin: "",
		}));
	}
  
	onAddChange() {
		const newPlayers = [...this.state.players];
		let playerOne = newPlayers[0];
		let playerTwo = newPlayers[1];
		if (playerOne.score === 0 || playerTwo.score === 0) {
			newPlayers.forEach((element) => element.isDisabled = store.getState().toggleButton );
			alert("Game Over");
			this.setState(prevState => ({
				newPlayers,
				pot: ""
			}));
		} else {
			if (playerOne.isDisabled === true &&  store.getState().turn >= 1) {
				newPlayers.forEach((element) => element.score -= 1 );
				playerOne.isDisabled = false;
				this.setState(prevState => ({ pot: this.state.pot + 2 }));
			}
		}
		store.dispatch(disableAddButton());
	}
  
	onScoreChange() {
		const { pot, players } = this.state;
		let dreidel = Math.floor(Math.random() * 4);
		const hebrew = [NUN, SHIN, HAY, GIMEL];
		let currentSpin = hebrew[dreidel];
		const newPlayers = [...players];
		let playerOne = newPlayers[0];
		let playerTwo = newPlayers[1];

		if (playerOne.isDisabled === true && store.getState().turn >= 1) {
			store.dispatch(enableAddButton());
		}
		if ((playerOne.score <= 0 || playerTwo.score <= 0) && (dreidel === 1 || dreidel === 3)) {
			newPlayers.forEach((element) => element.isDisabled = !element.isDisabled );
			alert("Game Over");
			this.setState(prevState => ({
				newPlayers,
				pot: ""
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
			store.dispatch(addTurn());
			this.setState(prevState => ({
				newPlayers,
				spin: currentSpin
			}));
		}
	}

	render() {
	const { pot, spin, players } = this.state;
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
					<Reset onResetChange={this.onResetChange} disabled={store.getState().resetButton} />
					<Add onAddChange={this.onAddChange} disabled={store.getState().addButton}/>
					<Start onStartChange={this.onStartChange} disabled={store.getState().startButton} />
				</div>
			</div>
		);
	}
}
