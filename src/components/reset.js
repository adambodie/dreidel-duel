// Libs
import React, { Component } from "react";
import styles from "./main.module.css";

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
	this.props.onResetChange(e.target.value);  
  }

  render() {
    return (
          <button className={styles.action} onClick={this.handleChange} disabled={this.props.disabled} >
            Reset
          </button>
    );
  }
}
