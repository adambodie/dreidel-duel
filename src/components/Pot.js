import React from "react"

const Pot = ({pot}) => {
	return(
		<div style={{marginTop: 10}}>
			<h3 style={{fontFamily: 'Vollkorn'}}>Coins in the Pot:</h3>
			<h2 style={{fontFamily: 'Vollkorn'}}>{pot}</h2>
		</div>
	)
}

export default Pot;
