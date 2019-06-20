import React from "react";
import {Comment} from "./comment";
import {LocationContext} from "../../product-route";

export class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {comments, onReply} = this.props;
    return (
      <LocationContext.Consumer>
        {props => {
          let {search, pathname} = props.location;
          return (
            <div className="comments-list">
              {comments.map(each => (
                <Comment
                  key={each._id}
                  onReply={(data) => onReply(each._id, data)}
                  redirect={search + pathname}
                  {...each}
                />
              ))}
            </div>
          )
        }}

      </LocationContext.Consumer>
    );
  }
}