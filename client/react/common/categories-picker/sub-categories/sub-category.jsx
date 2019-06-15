import React from "react";
import MainCategory from "../main-categories/main-categories";

const SubCategory = (props) => {
    let {label, subCategories, onClick = () => null} = props;
    return (
        <div className="sub-category"
             onClick={(e) => {
               e.stopPropagation();
               onClick();
             }}
        >
          <p className="sc-label">{label}</p>
          <div className="sub-sub-list">
            {subCategories.map(({label, onClick: subOnClick}, i) => (
              <p key={label} className="sub-item"  onClick={(e) => {
                e.stopPropagation();
                subOnClick();
              }}>{label}</p>
            ))

            }
          </div>

        </div>
    );
};

export default SubCategory;