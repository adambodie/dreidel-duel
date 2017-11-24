// Libs
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
		pot: 10,
		spin: '',
		score: 5,
		isDisabled: true,
		players: [
			{ name: 'Adam',
			  score: 5,
			  isDisabled: true,
			  id: 1
			},
			{ name: 'Jenn',
			  score: 5,
			  isDisabled: true,
			  id: 2
			}
		]	
    };
    this.onDisableChange = this.onDisableChange.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }
  	onDisableChange() {
		this.setState(prevState => ({
			isDisabled: !prevState.isDisabled,
			score: 5,
			spin: '',
		}));
	}	
	onScoreChange() {
		let dreidel = Math.floor(Math.random() * 4);
		const hebrew = ["ג", "ה", "נ", "שׁ"]; { /* Remove player if player has zero coins and spins Shin and Hay */ }
		let currentSpin = hebrew[dreidel];
		if (dreidel == 0) {
			console.log(dreidel);
		} else if (dreidel == 1) {
			console.log(dreidel);
		} else if (dreidel == 2) {
			console.log(dreidel);
		} else if (dreidel) {
			console.log(dreidel);
		}
		this.setState(prevState => ({
			spin: currentSpin
		}));
	}
  render() {
	
  return(
	<div className = "scoreboard container">
		<div className="players">
		<div>
			<h2>{this.state.players[0].name}</h2>
				<div className = "counter">
					<button className = "counter-action" 
							disabled = {this.state.isDisabled} 
							onClick= {this.onScoreChange}
					> 
					SPIN 
					</button>
					<div className = "counter-score"> {this.state.players[0].score} </div> 
				</div>
		</div>
		<div className="footer">
			<h2>{this.state.spin}</h2>
		</div>
		<div>
			<h2>{this.state.players[1].name}</h2>
				<div className = "counter">
					<button className = "counter-action" 
							disabled = {this.state.isDisabled} 
							onClick= {this.onScoreChange}
					> 
					SPIN 
					</button>
					<div className = "counter-score"> {this.state.players[1].score} </div> 
				</div>
		</div>
		</div>
		<div className="footer">
		<h3> Coins in the Pot: {this.state.pot} </h3>
		</div>
		<div className="buttons">
			 <button className = "reset-action" 
					 onClick = {this.onDisableChange} 
					 disabled = {this.state.isDisabled}
					 > Reset 
			</button>
			<button className = "start-action" 
					onClick = {this.onDisableChange} 
					disabled={!this.state.isDisabled}
					> Start 
			</button>
		</div>
	</div>
	)
  }
}
