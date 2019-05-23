import React from "react";
import {Comment} from "./comment";

export class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {comments} = this.props;
    return (
      <div className="comments-list">
        {comments.map(each => (
          <Comment
            key={each._id}
            {...each}
          />
        ))}
      </div>
    );
  }
}