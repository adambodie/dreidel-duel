import React from "react"
import dreidel  from '../images/dreidel.gif'
import styles from "../css/main.module.scss";

const Spin =({ spin }) => (
	<div className={styles.dreidel}>
		<img src={dreidel} alt="Dreidel"/>
		<h2>{spin}</h2>
	</div>
)

export default Spin;
