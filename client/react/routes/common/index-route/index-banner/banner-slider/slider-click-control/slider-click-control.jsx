import React from "react";
import classnames from "classnames"

export class SliderClickControl extends React.Component {
    constructor(props) {
        super(props);

    };


    render() {
        let {current, onClick, length} = this.props;

        return (
            <div className="slider-click-control">
                {Array.from(Array(length)).map((each, i) => (
                    <span className={classnames("slider-nav", {active: current === i})} key={i} onClick={() => onClick(i)}>

                    </span>
                ))}
            </div>
        );
    }
}