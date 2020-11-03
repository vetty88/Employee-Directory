import React, { Component } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import Alert from "../components/Alert";

class Discover extends Component {
  state = {
    portrait: "",
    match: false,
    matchCount: 0
  };

  // When the component mounts, load the next User to be displayed
  componentDidMount() {
    this.loadNextUser();
  }

  handleBtnClick = event => {
    // Get the data-value of the clicked button
    const btnType = event.target.attributes.getNamedItem("data-value").value;
    // Clone this.state to the newState object
    // We'll modify this object and use it to set our component's state
    const newState = { ...this.state };

    if (btnType === "pick") {
      // Set newState.match to either true or false depending on whether or not the User likes us (1/5 chance)
      newState.match = 1 === Math.floor(Math.random() * 5) + 1;

      // Set newState.matchCount equal to its current value or its current value + 1 depending on whether the User likes us
      newState.matchCount = newState.match
        ? newState.matchCount + 1
        : newState.matchCount;
    } else {
      // If we thumbs down'ed the User, we haven't matched with it
      newState.match = false;
    }
    // Replace our component's state with newState, load the next User portrait
    this.setState(newState);
    this.loadNextUser();
  };

  loadNextUser = () => {
    API.getRandomUser()
      .then(res =>
        this.setState({
          portrait: res.data.message
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1 className="text-center">Make New Friends</h1>
        <h3 className="text-center">
          Thumbs up on any Users you'd like to meet!
        </h3>
        <Card portrait={this.state.portrait} handleBtnClick={this.handleBtnClick} />
        <h1 className="text-center">
          Made friends with {this.state.matchCount} Users so far!
        </h1>
        <Alert style={{ opacity: this.state.match ? 1 : 0 }} type="success">
          Yay! That User Liked You Too!!!
        </Alert>
      </div>
    );
  }
}

export default Discover;
