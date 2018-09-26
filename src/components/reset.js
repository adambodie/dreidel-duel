// Libs
import React, { Component } from "react";
import styles from "./main.module.css";

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
		disabled: true
	}
  }

  handleChange(e) {
	this.props.onResetChange(e.target.value);  
  }

  render() {
	  let disabled = this.props.disabled;
    return (
          <button className={styles.resetAction} onClick={this.handleChange} disabled={disabled} >
            Reset
          </button>
    );
  }
}
