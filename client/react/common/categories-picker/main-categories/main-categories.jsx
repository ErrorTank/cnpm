import React from "react";
import MainCategory from "./main-category";

export const MainCategories = (props) => {
  let {categories, onOpenSubCategories, current} = props;
  return (
    <div className="main-categories">
      {categories.map(({onClick, ...rest}, i) => (
        <MainCategory
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          {...rest}
          onOpenSubCategories={() => onOpenSubCategories(rest.label)}
          active={current === rest.label}
        />
      ))

      }
    </div>
  )
};

