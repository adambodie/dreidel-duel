// Libs
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
		pot: 10,
		spin: '',
		value: '',
		valueOne: '',
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
			  score: 5,
			  isDisabled: true,
			  id: 1
			},
		playerTwo:
			{ name: 'Jenn',
			  score: 5,
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
		}));
	}
	
  	onResetChange() {
		const newOneDisabled = Object.assign({}, this.state.playerOne);
		const newTwoDisabled = Object.assign({}, this.state.playerTwo);
		newOneDisabled.isDisabled = true;
		newTwoDisabled.isDisabled = true;
		newOneDisabled.score = 5,
		newTwoDisabled.score = 5
		this.setState(prevState => ({
			playerOne: newOneDisabled,
			playerTwo: newTwoDisabled,
			isDisabled: !prevState.isDisabled,
			pot: 10,
			spin: ''
		}));
	}
	
	
	onScoreChange() {
		let dreidel = Math.floor(Math.random() * 4);
		const hebrew = ["נ", "שׁ", "ה", "ג"];
		let currentSpin = hebrew[dreidel];
		let newPlayerOne = Object.assign({}, this.state.playerOne);
		let newPlayerTwo = Object.assign({}, this.state.playerTwo);
		if ((this.state.playerOne.score <= 0 || this.state.playerTwo.score <= 0) && (dreidel == 1 || dreidel == 3)) {
      			this.setState(prevState => ({
				spin: "",
				pot: "Game Over, play again"
			}));
    }	else {	
		if (dreidel == 0) {
			/* Spin a Nun - Nothing */
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
		} else if (dreidel == 1) {
			/* Spin a Shin - Put one in the Pot */
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
		} else if (dreidel == 2) {
			/* Spin a Hay - Win half of your coins in the Pot */
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
		} else {	
		/* Spin a Gimel - Win everything  */
			if (this.state.playerOne.isDisabled == false) {
				newPlayerOne.isDisabled = true;
				newPlayerOne.score = this.state.playerOne.score + this.state.pot;
				newPlayerTwo.isDisabled = false;
			} else {
				newPlayerOne.isDisabled = false;
				newPlayerTwo.score = this.state.playerTwo.score + this.state.pot;
				newPlayerTwo.isDisabled = true;
			}
			this.setState(prevState => ({
				playerOne: newPlayerOne,
				playerTwo: newPlayerTwo,
				pot: 0
			}));
		}
		if (this.state.pot == 0) {
			newPlayerOne.score = this.state.playerOne.score - 1;
			newPlayerTwo.score = this.state.playerTwo.score - 1;
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
			<h3>Coins in the Pot:</h3>
			<h3>{this.state.pot}</h3>
		</div>
		<div className="buttons">
			 <button className="reset-action" onClick={this.onResetChange} disabled={this.state.isDisabled}>Reset</button>
			<button className="start-action" onClick={this.onStartChange} disabled={!this.state.isDisabled}>Start</button>
		</div>
	</div>
	)
  }
}
