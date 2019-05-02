import React from "react";
import {convertMilToDifferent} from "../../../common/moment-utils";

export class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...convertMilToDifferent(props.value)
    };
    this.interval = null;

  };

  componentDidMount() {


    this.interval = setInterval(() => {
      let {day, hour, minute, second} = this.state;
      if(second > 0){
        this.setState({second: second - 1});
      }else{
        if(minute > 0){
          this.setState({minute: minute - 1, second: 59});
        }else{
          if(hour > 0){
            this.setState({hour: hour - 1, minute:59, second: 59});
          }else{
            if(day === 0){
              clearInterval(this.interval);
            }
            this.setState({day: day - 1 ,hour: 23, minute:59, second: 59});
          }
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    if(this.interval) clearInterval(this.interval);
  }

  render() {
    return this.props.render({...this.state})
  }
}