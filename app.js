//Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.css';

var PLAYERS = [{
  name: "Adam",
  score: 5,
  isDisabled: true,
  id: 1,
}, {
  name: "Jenn",
  score: 5,
  isDisabled: true,
  id: 2,
}];
const INITIAL_POT = 10;

var StartGame = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },
  getInitialState: function() {
    return {
      isDisabled: false,
    }
  },
  onDisableChange: function(e) {
    this.props.onAdd(this.state.isDisabled);
    this.setState({
      isDisabled: false
    });
    this.props.onAdd(this.state.isStartDisabled);
    this.setState({
      isStartDisabled: false
    });
  },
  render: function() {
    return (<div className = "col-xs-6">
      <button className = "start-action" onClick = {this.onDisableChange}> Start </button>
      </div>);
  }
});

var ResetGame = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },
  getInitialState: function() {
    return {
      isDisabled: true,
    }
  },
  onDisableChange: function(e) {
    this.props.onAdd(this.state.isDisabled);
    this.setState({
      isDisabled: true
    });
    this.props.onAdd(this.state.isStartDisabled);
    this.setState({
      isStartDisabled: true
    });
  },
  render: function() {
    return (<div className = "col-xs-6">
      <button className = "reset-action" onClick = {this.onDisableChange} disabled = {this.isDisabled}> Reset </button> </div>);
  }
});

function Counter(props) {
  return (<div className = "counter">
    <button className = "counter-action" onClick = {function() {props.onChange();}} disabled = {props.isDisabled}> SPIN </button>
    <div className = "counter-score"> {props.score} </div> </div>);
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  isDisabled: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

function Player(props) {
  return (<div className = "player col-md-4" >
    <div className = "player-name"> {props.name} </div>
    <div className = "playerScore"> <Counter score = {props.score}
    onChange = {props.onScoreChange}
    isDisabled = {props.isDisabled}/></div>
    </div>);
}
Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  isDisabled: React.PropTypes.bool.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,

}

function Footer(props) {
  return (<div className = "footer" >
    <h3> Coins in the Pot: {props.pot} </h3>
    <h2><span> {props.spin} </span></h2>
    </div>);
}

Footer.propTypes = {
  spin: React.PropTypes.string.isRequired,
}

var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    spin: React.PropTypes.string,
    pot: React.PropTypes.number,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      isDisabled: React.PropTypes.bool.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },

  getInitialState: function() {
    return {
      players: this.props.initialPlayers,
      pot: INITIAL_POT,
      spin: "",

    }
  },
  getDefaultProps: function() {
    return {
      title: "Dreidel Duel!",
    }
  },
  onScoreChange: function(index) {
    let dreidel = Math.floor(Math.random() * 4);
    const hebrew = ["ג", "ה", "נ", "שׁ"]; { /* Remove player if player has zero coins and spins Shin and Hay */ }
    if (this.state.players[index].score <= 0 && (dreidel == 1 || dreidel == 2)) {

      this.state.players[index].isDisabled = true;
      this.state.spin = "";
      this.state.pot = "Game Over, play again"
      this.setState(this.state);
    } else {
      this.state.spin = hebrew[dreidel];

      { /* Spin a Nun - Nothing */ }
      if (dreidel == 0) {
        this.state.players[index].score += 0;

        { /* Spin a Shin - Put one in the Pot */ }
      } else if (dreidel == 1) {
        this.state.players[index].score -= 1;
        this.state.pot += 1;

        { /* Spin a Hay - Put half of your coins in the Pot */ }
      } else if (dreidel == 2) {
        this.state.players[index].score += Math.round(this.state.pot / 2);
        this.state.pot = Math.floor(this.state.pot / 2);

        { /* Spin a Gimel - Win everything  */ }
      } else {
        this.state.players[index].score += this.state.pot;
        this.state.pot = 0;

        { /* Each player puts one coin in the pot */ }
        let startIndex = index;
        for (index; index < this.state.players.length; index++) {
          if (this.state.players[index].score > 0) {
            this.state.players[index].score -= 1;
            this.state.pot += 1;
          } else {
            this.state.players[index].isDisabled = true;
          }
        }
        for (index = 0; index < startIndex; index++) {
          if (this.state.players[index].score > 0) {
            this.state.players[index].score -= 1;
            this.state.pot += 1;
          } else {
            this.state.players[index].isDisabled = true;
          }
        }
      } { /* Loop from last player in array to first */ }
      if (index >= 1) {
        this.state.players[index].isDisabled = true;
        this.state.players[0].isDisabled = false; { /* Each player add a coin to the pot, remove player if no coins to put in the pot */ }
        for (index = 0; index < 1; index++) {
          if (this.state.players[index].score > 0) {
            this.state.players[index].score -= 1;
            this.state.pot += 1;
          } else {
            this.state.players[index].isDisabled = true;
          }
        }
        this.setState(this.state);
      } else {
        this.state.players[index].isDisabled = true;
        this.state.players[index + 1].isDisabled = false;
        this.setState(this.state);
      }
    }
  },

  onDisabledAdd: function() {
    this.state.players[0].isDisabled = false;
    this.setState(this.state);
  },
  onResetAdd: function() {
    this.state.players[0].isDisabled = true;
    this.state.players[1].isDisabled = true;
    this.state.players[0].score = 5;
    this.state.players[1].score = 5;
    this.state.spin = "";
    this.state.pot = INITIAL_POT;
    this.setState(this.state);
  },

  render: function() {
    return (<div className = "scoreboard container">
      <div className = "players row"> {
        this.state.players.map(function(player, index) {
          return ( < Player onScoreChange = {
              function(delta) {
                this.onScoreChange(index, delta)
              }.bind(this)
            }
            name = {
              player.name
            }
            score = {
              player.score
            }
            isDisabled = {
              player.isDisabled
            }
            key = {
              player.id
            }
            />
          );
        }.bind(this))
      } </div>
      <Footer spin= {this.state.spin} pot = {this.state.pot}/>
      <div className = "row">
      <ResetGame onAdd = {this.onResetAdd}/>
      <StartGame onAdd = {this.onDisabledAdd}/> </div> </div>

    );
  }
});

ReactDOM.render(<Application initialPlayers = {PLAYERS}/>, document.getElementById('container'));
