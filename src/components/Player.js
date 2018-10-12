import React, { Component } from "react";
import styles from "./player.module.css";


export default class Player extends Component {
  constructor(props) {
    super(props);
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
    return (
		<div className={styles.player}>
			<h2>Player {this.props.id}</h2>
			<input type="text" value={this.state.value} onChange={this.handleNameChange} />
			<div className={styles.counter}>
				<button
					className={styles.counterAction}
					onClick={this.handleChange}
					disabled={this.props.disabled}
					>
					SPIN
				</button>
				<div className={styles.counterScore}>
					{this.props.score}
				</div>
			</div>
		</div>
				
    );
  }
}
