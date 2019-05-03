import React from "react";
import {IndexProductList} from "../index-product-list/index-product-list";
import {createVisitedCacheFunction} from "../../../../../common/cache/recent-product-guest-visit-cache";
import {customHistory} from "../../../routes";


export class VisitedSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    getRecentVisited = () => {
        return createVisitedCacheFunction("get")().then(arr => arr.length > 5 ? arr.slice(0, 5) : arr);
    };


    render() {
        return (
            <div className="visited-section">
                <p className="section-header">SẢN PHẨM BẠN ĐÃ XEM</p>
                <div className="section-body">
                    <IndexProductList
                        api={this.getRecentVisited}
                        deal={false}
                        cols={5}
                        onClickBtn={() => customHistory.push("/recent-visited")}
                    />
                    <div className="vs-footer">
                        <button className="btn more-btn" onClick={() => customHistory.push("/recent-visited")}>Xem
                            thêm
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}