import React from "react"

const Pot = ({pot}) => {
	return(
		<div>
			<h3 style={{fontFamily: 'Vollkorn', margin: 0}}>Coins in the Pot:</h3>
			<h2 style={{fontFamily: 'Vollkorn', fontSize: '2em'}}>{pot}</h2>
		</div>
	)
}

export default Pot;
