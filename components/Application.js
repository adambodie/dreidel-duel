// Libs
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
		pot: 20,
		spin: '',
		isDisabled: true,
		/*players: [
			{ name: 'Adam',
			  score: 10,
			  isDisabled: true,
			  id: 1
			},
			{ name: 'Jenn',
			  score: 10,
			  isDisabled: true,
			  id: 2
			}
		],*/
		playerOne:
			{ name: 'Adam',
			  score: 10,
			  isDisabled: true,
			  id: 1
			},
		playerTwo:
			{ name: 'Jenn',
			  score: 10,
			  isDisabled: true,
			  id: 1
			},
    };
    this.onStartChange = this.onStartChange.bind(this);
    this.onResetChange = this.onResetChange.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }
  	onStartChange() {
		const newDisabled = Object.assign({}, this.state.playerOne);
		newDisabled.isDisabled = false
		this.setState(prevState => ({
			playerOne: newDisabled,
			isDisabled: !prevState.isDisabled,
			score: 5
		}));
	}
	
	
  	onResetChange() {
		const newOneDisabled = Object.assign({}, this.state.playerOne);
		const newTwoDisabled = Object.assign({}, this.state.playerTwo);
		newOneDisabled.isDisabled = true;
		newTwoDisabled.isDisabled = true;
		newOneDisabled.score = 10,
		newTwoDisabled.score = 10
		this.setState(prevState => ({
			playerOne: newOneDisabled,
			playerTwo: newTwoDisabled,
			isDisabled: !prevState.isDisabled,
			pot: 20,
			spin: ''
		}));
	}
	
	
	onScoreChange(index) {
		let dreidel = Math.floor(Math.random() * 4);
		const hebrew = ["נ", "שׁ", "ה", "ג"];
		let currentSpin = hebrew[dreidel];
		{ /* Spin a Nun - Nothing */ }
		let newPlayerOne = Object.assign({}, this.state.playerOne);
		let newPlayerTwo = Object.assign({}, this.state.playerTwo);	
		if (dreidel == 0) {
			if (this.state.playerOne.isDisabled == false) {
				newPlayerOne.isDisabled = true;
				newPlayerTwo.isDisabled = false;
			} else {
				newPlayerOne.isDisabled = false;
				newPlayerTwo.isDisabled = true;			
			}
			this.setState(prevState => ({
				playerOne: newPlayerOne,
				playerTwo: newPlayerTwo
			}));
		{ /* Spin a Shin - Put one in the Pot */ }	
		} else if (dreidel == 1) {
			if (this.state.playerOne.isDisabled == false) {
				newPlayerOne.isDisabled = true;
				newPlayerOne.score = this.state.playerOne.score - 1;
				newPlayerTwo.isDisabled = false;
			} else {
				newPlayerOne.isDisabled = false;
				newPlayerTwo.score = this.state.playerTwo.score - 1;
				newPlayerTwo.isDisabled = true;	
			}	
			this.setState(prevState => ({
				playerOne: newPlayerOne,
				playerTwo: newPlayerTwo,
				pot: this.state.pot + 1,
			}));
		{ /* Spin a Hay - Win half of your coins in the Pot */ }	
		} else if (dreidel == 2) {
			console.log(dreidel);
			if (this.state.playerOne.isDisabled == false) {
				newPlayerOne.isDisabled = true;
				newPlayerOne.score = this.state.playerOne.score + Math.round(this.state.pot / 2);
				newPlayerTwo.isDisabled = false;
			} else {
				newPlayerOne.isDisabled = false;
				newPlayerTwo.score = this.state.playerTwo.score + Math.round(this.state.pot / 2);
				newPlayerTwo.isDisabled = true;
			}			
			this.setState(prevState => ({
				playerOne: newPlayerOne,
				playerTwo: newPlayerTwo,
				pot: Math.floor(this.state.pot / 2)
			}));
		{ /* Spin a Gimel - Win everything  */ }	
		} else {
			console.log(dreidel);
			if (this.state.playerOne.isDisabled == false) {
				newPlayerOne.isDisabled = true;
				newPlayerOne.score = this.state.playerOne.score + this.state.pot - 1;
				newPlayerTwo.isDisabled = false;
				newPlayerTwo.score = this.state.playerTwo.score - 1;
			} else {
				newPlayerOne.isDisabled = false;
				newPlayerOne.score = this.state.playerOne.score - 1;
				newPlayerTwo.score = this.state.playerTwo.score + this.state.pot;
				newPlayerTwo.isDisabled = true;
			}
			this.setState(prevState => ({
				playerOne: newPlayerOne,
				playerTwo: newPlayerTwo,
				pot: 2
			}));
		}
		this.setState(prevState => ({
			spin: currentSpin
		}));
	}
	
	
  render() {
  return(
	<div className = "scoreboard container">
		<div className="players">
			<div className="player">
				<div>
					<h2>{this.state.playerOne.name}</h2>
					<div className = "counter">
						<button className= "counter-action" disabled={this.state.playerOne.isDisabled} onClick={this.onScoreChange}>SPIN</button>
					<div className="counter-score">{this.state.playerOne.score}</div> 
				</div>
			</div>
		</div>
		<h2 id="spin">{this.state.spin}</h2>
		<div className="player">
			<div>
				<h2>{this.state.playerTwo.name}</h2>
				<div className="counter">
					<button className="counter-action" disabled={this.state.playerTwo.isDisabled} onClick={this.onScoreChange}>SPIN</button>
				<div className= "counter-score">{this.state.playerTwo.score}</div> 
			</div>
		</div>
	</div>
</div>
		<div className="footer">
			<h3>Coins in the Pot: {this.state.pot}</h3>
		</div>
		<div className="buttons">
			 <button className="reset-action" onClick={this.onResetChange} disabled={this.state.isDisabled}>Reset</button>
			<button className="start-action" onClick = {this.onStartChange} disabled={!this.state.isDisabled}>Start</button>
		</div>
	</div>
	)
  }
}
