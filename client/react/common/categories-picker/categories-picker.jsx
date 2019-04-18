import React from "react";
import {categories} from "./categories";
import {MainCategories} from "./main-categories/main-categories";
import SubCategories from "./sub-categories/sub-categories";


export class CategoriesPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategories: null
    };
  };


  render() {
    let {currentCategories} = this.state;
    let subCategories = categories.find(each => each.label === currentCategories);
    console.log(currentCategories)
    return (
      <div className="categories-picker"
           onMouseLeave={() => this.setState({currentCategories: null})}
      >
        <MainCategories
          categories={categories}
          onOpenSubCategories={(c) => this.setState({currentCategories: c})}
          current={currentCategories}
        />
        {/*{subCategories && (*/}
          {/*<SubCategories*/}
            {/*categories={subCategories}*/}
          {/*/>*/}
        {/*)}*/}

      </div>
    );
  }
}