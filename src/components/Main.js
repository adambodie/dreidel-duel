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
	// Toggle disabled state when player1 spins
	updateOne(player) {
		player.forEach((element) => element.isDisabled = !element.isDisabled )
	};
	// Toggle disabled state and adds score when player1 spins
	updateOneScore(players, player, number) {
		this.updateOne(players);
		player.score += number;
	}
	// Toggle disabled state and adds score when player2 spins
	updateTwo(player, number = 0) {
		player.isDisabled = true;
		player.score += number;
	}

	updateScores(player, number) {
		player.forEach((element) => element.score += number );	
	}
	onStartChange() {
		const newPlayers = [...this.state.players];
		newPlayers[0].isDisabled = false;
		store.dispatch(disableStartButton());
		store.dispatch(enableResetButton());
		this.setState({newPlayers});
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
		this.setState({ newPlayers, pot: 10, spin: ""});
	}
  
	onAddChange() {
		const newPlayers = [...this.state.players];
		let playerOne = newPlayers[0];
		let playerTwo = newPlayers[1];
		if (playerOne.score === 0 || playerTwo.score === 0) {
			this.updateOne(newPlayers);
			alert("Game Over");
			this.setState({newPlayers, pot: ""});
		} else {
			if (playerOne.isDisabled === true &&  store.getState().turn >= 1) {
				playerOne.isDisabled = false;
				this.updateScores(newPlayers, -1);
				this.setState({ pot: this.state.pot + 2 });
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
		const upperHalf = Math.round(pot / 2);
		const lowerHalf = Math.floor(pot / 2);

		if (playerOne.isDisabled === true && store.getState().turn >= 1) {
			store.dispatch(enableAddButton());
		}
		if ((playerOne.score <= 0 || playerTwo.score <= 0) && (dreidel === 1 || dreidel === 3)) {
			this.updateOne(newPlayers);
			this.setState({ newPlayers, pot: ""});
			alert("Game Over");
		} else {
			switch (dreidel) {
				case 0:	/* Spin a Nun - Nothing */
					playerOne.isDisabled === false ? this.updateOne(newPlayers) : this.updateTwo(playerTwo);
					break;
				case 1: /* Spin a Shin - Put one in the Pot */
					playerOne.isDisabled === false ? this.updateOneScore(newPlayers, playerOne, -1) : this.updateTwo(playerTwo, -1);
					this.setState({ pot: pot + 1 });
					break;
				case 2: /* Spin a Hay - Win half of your coins in the Pot */
					playerOne.isDisabled === false ? this.updateOneScore(newPlayers, playerOne, upperHalf) : this.updateTwo(playerTwo, upperHalf);
					this.setState({ pot: lowerHalf });
					break;
				default: /* Spin a Gimel - Win everything  */
					playerOne.isDisabled === false ? this.updateOneScore(newPlayers, playerOne, pot) : this.updateTwo(playerTwo, pot);
					this.updateScores(newPlayers, -1);
					this.setState({ pot: 2 });
				}
			store.dispatch(addTurn());
			this.setState({ newPlayers, spin: currentSpin });
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
