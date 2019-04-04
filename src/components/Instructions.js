import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import styles from "../css/header.module.scss";

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		transform             : 'translate(-50%, -50%)'
	}
};

Modal.setAppElement('#___gatsby')

export default class Instructions extends Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
  }

	openModal() {
		this.setState({modalIsOpen: true});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}

	render() {
		return (
			<div>
				<FontAwesome 
					onClick={this.openModal}
					name='question-circle'
					className={styles.question}
					size='3x'
				/>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Instructions"
				>
				<div className={styles.modal}>
					<header className={styles.modalHeader}>
						<h2>Instructions</h2>
						<FontAwesome 
							onClick={this.closeModal} 
							name='window-close'
							className={styles.close}
							size='2x'
							style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: 'black', position: 'absolute', right: 0, top: 0 }}
						/>
					</header>
					<div className={styles.instructions}>
						<p>Spin the dreidel.  What happens depends on which side it lands.</p>
						<p>When the last player of each turn plays, each player places a coin in the pot.</p>
						<p>If there are no coins in the pot, each player places a coin in the pot.</p>
						<p>When a player has no coins and is unable to gain any coins, they are eliminated from the game.</p>
						<div className={styles.instructionFlex}>
							<p><span>ג</span> - Take all the coins in the pot.</p>
							<p><span>ה</span> - Take half of the coins in the pot.</p>
							<p><span>שׁ</span> - Put one coin in the pot.</p>
							<p><span>נ</span> - Do nothing.</p>
						</div>

					</div>
				</div>
			</Modal>
		</div>
		);
	}
}
