import React from "react"

const Pot = (props) => {
		return(
			<div style={{marginTop: 10}}>
				<h3 style={{fontFamily: 'Vollkorn'}}>Coins in the Pot:</h3>
				<h2 style={{fontFamily: 'Vollkorn'}}>{props.pot}</h2>
			</div>
		)
}

export default Pot;
