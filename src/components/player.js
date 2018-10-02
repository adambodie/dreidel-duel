// Libs
import React, { Component } from "react";
import styles from "./player.module.css";


export default class Player extends Component {
  constructor(props) {
    super(props);    
	this.handleChange = this.handleChange.bind(this);
  }
	handleChange(e) {
		this.props.onScoreChange(e.target.value);  
  }

  render() {
    return (
		<div className={styles.player}>
			<div>
				<h2>{this.props.name}</h2>
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
		</div>
				
    );
  }
}
