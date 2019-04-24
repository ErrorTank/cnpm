import React from "react";
import {categories} from "./categories";
import {MainCategories} from "./main-categories/main-categories";
import SubCategories from "./sub-categories/sub-categories";


export class CategoriesPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategories: "Điện thoại - Máy tính bảng"
    };
  };


  render() {
    let {currentCategories} = this.state;
    let currentCategoriesObj = categories.find(each => each.label === currentCategories);
    let subCategories = currentCategoriesObj ? currentCategoriesObj.subCategories : null ;
    return (
      <div className="categories-picker"
           onMouseLeave={() => this.setState({currentCategories: null})}
      >
        <MainCategories
          categories={categories}
          onOpenSubCategories={(c) => this.setState({currentCategories: c})}
          current={currentCategories}
        />
        <SubCategories
          categories={subCategories}
        />

      </div>
    );
  }
}