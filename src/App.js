import React, { Fragment } from "react";
import './App.css';
import Card from "./Compontens/UI/Card";
import Header from "./Compontens/UI/Header";
import image from './image/reset.jpg'
const { Component } = React;

class App extends Component {
  constructor() {
    super();
    this.state = {
      time: 1500,
      breakTime: 300
    };
    this.breakTime = 300;
    this.pomodoroStarted = false;
    this.breakStarted = false
    this.isPaused = false;
    this.div = false;
  }

  stopTimer = timer => {
    clearInterval(timer);
    timer = null;
  };

  handleStart = () => {
    if (!this.pomodoroStarted) {
      this.timer = setInterval(() => {
        this.setState({ time: this.state.time - 1 });
      }, 1000);
      this.pomodoroStarted = !this.pomodoroStarted;
    }

    if (!this.time) {
      this.time = this.state.time;
      this.breakTime = this.state.breakTime;
    }
  };

  handlePause = () => {
    if (this.pomodoroStarted) {
      this.isPaused = true;
      this.setState(this.state);
      if (!this.breakStarted) {
        this.stopTimer(this.timer);
      }

      if (this.breakStarted) {
        this.stopTimer(this.breakTimer);
      }
    }
  };

  handleResume = () => {
    if (this.pomodoroStarted) {
      this.setState(this.state);
      this.isPaused = false;

      if (!this.breakStarted) {
        this.timer = setInterval(() => {
          this.setState({ time: this.state.time - 1 });
        }, 1000);
      }

      if (this.breakStarted) {
        this.breakTimer = setInterval(() => {
          this.setState({ breakTime: this.state.breakTime - 1 });
        }, 1000);
      }
    }
  };

  handleReset = () => {
    this.setState({
      time: 1500,
      breakTime: 300
    });
    this.stopTimer(this.timer);
    this.pomodoroStarted = false;
    this.stopTimer(this.breakTimer);
    this.breakStarted = false;
    this.isPaused = false;
  };

  calculateTime = time => {
    return `${Math.floor(time / 60)}:${time % 60 > 9 ? "" + time % 60 : "0" + time % 60}`;
  };



  increaseBreakTime = () => {
    if (!this.pomodoroStarted) {
      this.breakTime = this.breakTime + 60;
      this.setState({ breakTime: this.state.breakTime + 60 });
    }
  };



  decreaseBreakTime = () => {
    if (this.breakTime > 60) {
      this.breakTime = this.breakTime - 60;
    }
    if (this.state.breakTime > 60 && !this.pomodoroStarted) {
      this.setState({ breakTime: this.state.breakTime - 60 });
    }
  };

  componentDidUpdate() {
    if (this.state.time < 1) {

      this.stopTimer(this.timer);
      this.setState({ time: this.time });
      if (!this.breakStarted) {
        this.startBreak();
        this.breakStarted = true;
      }
    }

    if (this.state.breakTime < 1) {
      this.audio.play();
      this.stopTimer(this.breakTimer);
      this.setState({ breakTime: this.breakTime });
      this.pomodoroStarted = false;
      this.breakStarted = false;
      this.handleStart();
    }
  }

  startBreak() {
    this.breakTimer = setInterval(() => {
      this.setState({ breakTime: this.state.breakTime - 1 });
    }, 1000);
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Card>
          <div>
            <div className="pomodoro">
              <div className="timer">
                {this.breakStarted
                  ? this.calculateTime(this.state.breakTime)
                  : this.calculateTime(this.state.time)}
              </div>
            </div>
            <div>
              <div className="start-pause">
                <button onClick={this.handleStart}>Start</button>
                <button
                  onClick={this.isPaused ? this.handleResume : this.handlePause}
                >
                  {this.isPaused ? "Resume" : "Pause"}
                </button>
              </div>
              <div className="content">
                <div className="contain-it">
                  <div className="reset">
                    <button onClick={this.handleReset}>
                      <img src={image} className="image" alt="" />

                    </button>
                  </div>
                  <div className="break-length">
                    <div className="break-time">

                      <button onClick={this.increaseBreakTime}>+</button>
                      <div className="break-text">
                        {this.calculateTime(this.breakTime)}
                      </div>
                      <button onClick={this.decreaseBreakTime}>-</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
              </div>
              {this.dev
                ? <table>
                  <tr>
                    <th>State</th>
                    <th>Value</th>
                  </tr>
                  <tr>
                    <td>this.state.time:</td>
                    <td>{this.state.time}</td>
                  </tr>
                  <tr>
                    <td>this.state.breakTime:</td>
                    <td>{this.state.breakTime}</td>
                  </tr>
                  <tr>
                    <td>This.time:</td>
                    <td>{this.time}</td>
                  </tr>
                  <tr>
                    <td>This.breakTime:</td>
                    <td>{this.breakTime}</td>
                  </tr>
                  <tr>
                    <td>This.pomodoroStarted:</td>
                    <td>{this.pomodoroStarted.toString()}</td>
                  </tr>
                  <tr>
                    <td>breakStarted:</td>
                    <td>{this.breakStarted.toString()}</td>
                  </tr>
                  <tr>
                    <td>isPaused:</td>
                    <td>{this.isPaused.toString()}</td>
                  </tr>
                  <tr>
                    <td>This.timer:</td>
                    <td>{this.timer}</td>
                  </tr>
                  <tr>
                    <td>This.breakTimer:</td>
                    <td>{this.breakTimer}</td>
                  </tr>
                </table>
                : ""}
            </div>
          </div>
        </Card>
      </Fragment>
    );
  }
}

export default App