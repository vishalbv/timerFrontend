import React, { Component } from "react";
import "./mybody.css";
class MyBody extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", timers: [] };
  }

  Address = "https://mybackcodetimer.herokuapp.com";
  getData = () => {
    fetch(this.Address + "/getData")
      .then((res) => res.json())
      .then((result) => {
        this.setState({ timers: result });
        console.log(this.state);
      });
  };

  componentDidMount() {
    this.getData();
    let y = setInterval(() => {
      this.refreshData(this.state.timers);
    }, 1000);
  }
  getDisplayTime(st, interval) {
    let startTime = new Date(st);
    startTime.setHours(startTime.getHours() + parseInt(interval));
    const endTime = startTime.getTime();
    // Update the count down every 1 second

    // Get today's date and time
    const now = new Date().getTime();

    const left = endTime - now;
    // Time calculations for hours, minutes and seconds
    const hours = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((left % (1000 * 60)) / 1000);
    let status = "S";
    // var p = ((minutes + seconds / 100) / 60) * 100;
    // Output the result in an element with id="timer"
    const displayTime =
      hours < 0 ? "expired" : hours + "h" + minutes + "m" + seconds + "s";
    // If the count down is over, print expired
    if (left < 0) {
      status = "E";
    }

    return { displayTime, status };
  }

  refreshData(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "S") {
        data[i] = {
          ...data[i],
          ...this.getDisplayTime(data[i].startTime, data[i].time),
        };
      }
    }
    this.setState({ timers: data });
  }

  addTimer = ({ name, time }) => {
    // this.getDisplayTime()

    //   startTime.setHours(startTime.getHours() + time);

    //FOR 3 HRS

    const timer = {
      name,
      time,
      startTime: 0,
      status: "A",
    };
    const options = {
      method: "POST",
      // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timer),
    };

    fetch(this.Address + "/addTimer", options)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          timers: [
            ...this.state.timers,
            { ...timer, _id: result._id, displayTime: "Newly Added" },
          ],
        });
      });
    //this.addData(timer);

    // console.log(this.state.timers);
  };
  resetTimer = (timer) => {
    // const ref = this.state.timers.filter((val, key) => val.name === timer.name);
    let data = this.state.timers;
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === timer.name) {
        data[i].status = 0;
        data[i].displayTime = 0;
      }
    }
    this.setState({ timers: data });
  };

  timerStatusChange = ({ val, st }) => {
    let startTime = undefined;
    let status = undefined;
    let displayTime = undefined;
    if (st === "S") {
      startTime = new Date().getTime();
      status = "S";
      displayTime = val.displayTime;
    } else if (st === "R") {
      startTime = 0;
      status = "R";
      displayTime = 0;
    } else if (st === "D") {
      startTime = val.startTime;
      status = "D";
    } else if (st === "E") {
      startTime = val.startTime;
      status = "E";
      displayTime = "EXPIRED";
    }

    const timer = { ...val, startTime, status, displayTime };
    const options = {
      method: "POST",
      // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timer),
    };

    fetch(this.Address + "/updateTimer", options)
      .then((res) => res.json())
      .then((result) => {
        if (st === "D") {
          let data = this.state.timers.filter((v, k) => v._id !== val._id);
          this.setState({ timers: data });
        } else {
          let data = this.state.timers;
          for (let i = 0; i < data.length; i++) {
            if (data[i]._id === val._id) {
              data[i] = { ...data[i], startTime, status, displayTime };
            }
          }
          this.setState({ timers: data });
        }
      });

    // startrd
    // deleted
    // expired
  };

  render() {
    return (
      <div>
        <h1>BOSS TIMERS</h1>
        <AddTimer addTimer={this.addTimer} />
        <Timers
          timers={this.state.timers}
          timerStatusChange={this.timerStatusChange}
        />
      </div>
    );
  }
}
class AddTimer extends Component {
  timer = {};

  handleChange = (event) => {
    const target = event.target;
    if (target.name === "name") {
      this.timer.name = target.value;
    } else if (target.name === "time") {
      this.timer.time = target.value;
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTimer(this.timer);
  };
  render() {
    return (
      <form>
        <label>
          Name:
          <input type="text" name="name" onChange={this.handleChange} />
        </label>
        <label>
          time:
          <input type="text" name="time" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </form>
    );
  }
}

class Timers extends Component {
  timer = {};

  handleEvent(val, st) {
    this.props.timerStatusChange({ val, st });
  }

  render() {
    const Timer = (props) => (
      <span className="timerBlock">
        <h1>{props.timer.name}</h1>
        <h2>{props.timer.displayTime}</h2>
        <button onClick={() => this.handleEvent(props.timer, "R")}>
          Reset
        </button>
        <button onClick={() => this.handleEvent(props.timer, "S")}>
          start
        </button>
        <button onClick={() => this.handleEvent(props.timer, "D")}>
          Delete
        </button>
      </span>
    );
    return (
      <div className="timers">
        {this.props.timers.map((timer, key) => (
          <Timer key={key} timer={timer} />
        ))}
      </div>
    );
  }
}

export default MyBody;
