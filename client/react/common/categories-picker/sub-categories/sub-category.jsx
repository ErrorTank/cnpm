import React from "react";

const SubCategory = (props) => {
    let {label, subCategories, onClick = () => null} = props;
    return (
        <div className="sub-category"
             onClick={onClick}
        >
          <p className="sc-label">{label}</p>
          <div className="sub-sub-list">
            {subCategories.map(({label, onClick: subOnClick}, i) => (
              <p key={i} className="sub-item" onClick={subOnClick}>{label}</p>
            ))

            }
          </div>

        </div>
    );
};

export default SubCategory;