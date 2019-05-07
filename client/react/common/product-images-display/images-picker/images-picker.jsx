import React from "react";
import classnames from "classnames"

export const ImagesPicker = props => {
  let {current, images, onPick} = props;
  return (
    <div className={classnames("images-picker")}>
      {images.map((each) => {
        <div className={classnames("ip-item", {active: current === each})}
             key={each}
             onClick={() => onPick(each)}
        >

          <img src={each}/>
        </div>
      })}
    </div>
  )
};