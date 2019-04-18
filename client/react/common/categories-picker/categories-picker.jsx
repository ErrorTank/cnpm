import React from "react";
import {categories} from "./categories";

const MainCategories = (props) => {
  let {list} = this.props;
  return (
    <div className="main-categories">
      {categories.map((main, i) => {

      })}
    </div>
  )

};

export class CategoriesPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  renderCategories = (list) => {

  };

  render() {
    return (
      <div className="categories-picker">

      </div>
    );
  }
}