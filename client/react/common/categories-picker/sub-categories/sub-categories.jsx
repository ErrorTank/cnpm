import React from "react";
import classnames from "classnames";
import SubCategory from "./sub-category";

const SubCategories = ({categories}) => {
    return (
        <div className={classnames("sub-categories", {"active": categories})}>
            {categories &&
            <div className="list">
                {categories.map((each, i) => {
                    return (
                      <SubCategory
                        key={each.label}
                        {...each}
                      />
                    )
                })}
            </div>
            }

        </div>
    );
};

export default SubCategories;