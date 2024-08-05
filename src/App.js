import React, { Component } from "react";
import { QUESTIONS } from "./questions";
import './App.css';

class App extends Component {
  state = {
    curQue: 1,
    yesAns: 0,
    allDone: false,
    allScores: [],
  };

  componentDidMount() {
    this.setState({
      allScores: localStorage.getItem("ReactTestScores")
        ? JSON.parse(localStorage.getItem("ReactTestScores"))
        : [],
    });
  }

  handleBtnClick = (ans) => {
    const isQueOver = this.state.curQue + 1;
    if (isQueOver > Object.keys(QUESTIONS).length) {
      const totalYes = ans === "y" ? this.state.yesAns + 1 : this.state.yesAns;
      const curScore = (100 * totalYes) / Object.keys(QUESTIONS).length;
      const updatedAllScore = [...this.state.allScores, curScore];
      this.setState({
        curQue: isQueOver,
        yesAns: totalYes,
        allDone: true,
        score: curScore,
        allScores: updatedAllScore,
      });
      localStorage.setItem("ReactTestScores", JSON.stringify(updatedAllScore));
    } else {
      this.setState({
        curQue: isQueOver,
        yesAns: ans === "y" ? this.state.yesAns + 1 : this.state.yesAns,
      });
    }
  };

  calculateAverageScore = () => {
    if (this.state.allScores.length === 0) return 0;
    const totalScore = this.state.allScores.reduce((a, b) => a + b, 0);
    return (totalScore / this.state.allScores.length).toFixed(2);
  };

  resetClickHandler = () => {
    this.setState({
      curQue: 1,
      yesAns: 0,
      allDone: false,
    });
  };

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          {this.state.allDone ? (
            <div>
              <h2>Your score: {this.state.score}%</h2>
              <h3>Average score: {this.calculateAverageScore()}%</h3>
              <button className="btn" onClick={this.resetClickHandler}>Reset</button>
            </div>
          ) : (
            <div>
              <div className="question">{QUESTIONS[this.state.curQue]}</div>
              <button className="btn success" onClick={() => this.handleBtnClick("y")}>Yes</button>
              <button className="btn error" onClick={() => this.handleBtnClick("n")}>No</button>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default App;
