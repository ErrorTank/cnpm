import React from "react";
import classnames from "classnames";

export class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating
    };
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.rating === 0){
      this.setState({rating: 0})
    }
  }

  render() {
    let {className, editable, onChange,} = this.props;
    let {rating = 0} = this.state;

    return (
      <div className={classnames("stars-outer", className, {editable})}
           onMouseLeave={() => editable && this.setState({rating: this.props.rating || 0})}
      >
        {[1, 2, 3, 4, 5].map(each => (
          <span className="star"
                key={each}
                onMouseEnter={() => editable && this.setState({rating: each})}
                onClick={() => editable && onChange(each)}
          />
        ))}
        <div className="stars-inner" style={{width: (rating / 5) * 100 + "%"}}>
          {[1, 2, 3, 4, 5].map(each => (
            <span className="star"
                  key={each}
            />
            ))}
        </div>



      </div>
    );
  }
}