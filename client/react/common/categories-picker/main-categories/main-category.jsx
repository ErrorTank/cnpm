import React from "react"
import classnames from "classnames"

const MainCategory = (props) => {
  let {label, onClick = () => null, icon, onOpenSubCategories, active} = props;
  return (
    <div className={classnames("main-category", {"active": active})}
         onClick={(e) => {
           e.stopPropagation();
           console.log(e)
           onClick();
         }}
         onMouseEnter={onOpenSubCategories}
    >
      {icon}
      {label}
      <span className="pointer"></span>
    </div>
  );
};

export default MainCategory;