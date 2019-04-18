import React from "react";
import MainCategory from "./main-category";

export const MainCategories = (props) => {
  let {categories, onOpenSubCategories, current} = props;
  return (
    <div className="main-categories">
      {categories.map((each, i) => (
        <MainCategory
          key={i}
          {...each}
          onOpenSubCategories={() => onOpenSubCategories(each.label)}
          active={current === each.label}
        />
      ))

      }
    </div>
  )
};

