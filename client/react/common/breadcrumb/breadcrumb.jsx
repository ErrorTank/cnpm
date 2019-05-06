import React, {Fragment} from "react";
import classnames from "classnames"


const BreadcrumbItem = (props) => {
    let {content, active = false, onClick} = props;
    return (
      <div className={classnames("k-breadcrumb-item", {active})}
           onClick={onClick}
      >
          <span className="item-text">
              {content}
          </span>
          <span className="item-cosmetic"></span>
      </div>
    )
};

export class Breadcrumb extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {children, items = []} = this.props;
        return(
          <Fragment>
              <div className="k-breadcrumb">
                  <div className="container content-container">
                      <div className="breadcrumb-items">
                          {items.map((each) => (
                            <BreadcrumbItem
                                key={each.key}
                                {...each}
                            />
                          ))}
                      </div>
                  </div>
              </div>
              {children}
          </Fragment>

        );
    }
}