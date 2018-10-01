// Libs
import React, { Component } from "react";
import styles from "./start.module.css";

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
		disabled: false
		
	}
  }

  handleChange(e) {
	this.props.onStartChange(e.target.value);  
  }

  render() {
	  let disabled = this.props.disabled;
    return (
          <button
            className={styles.startAction}
            onClick={this.handleChange}
            disabled={disabled}
          >
            Start
          </button>
    );
  }
}
