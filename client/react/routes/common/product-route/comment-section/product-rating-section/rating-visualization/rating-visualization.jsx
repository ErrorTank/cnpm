import React from "react";
import {Process} from "../../../../../../common/process/process";


export const RatingVisualization = ({comments}) => {
  return (
    <div className="rating-visualization prs-panel">
      {[1, 2, 3, 4, 5].map(each => ({
        star: each,
        value: (comments.filter(cmt => Math.round(cmt.rating) === each).length)
      })).map(each => (
        <RatingRow
          key={each.star}
          {...each}
          length={comments.length}
        />
      ))}
    </div>
  );
};
const RatingRow = ({star, value, length}) => {
  return (
    <div className="rating-row">
      <span>{star} <i className="fas fa-star"></i></span>
      <Process
        className="star-process"
        total={length}
        value={value}

      />
      <span style={{color :"#787878", marginLeft: "12px"}}>{((value/length) * 100).toFixed()}%</span>
    </div>
  );
};

