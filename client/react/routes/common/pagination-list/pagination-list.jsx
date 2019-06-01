import React from "react";

export class PaginationList extends React.Component{
    constructor(props){
        super(props);
        this.state={
          currentPage: 0,
        };
    };
    render(){
        return(
            <div className="pagination-list">
            </div>
        );
    }
}