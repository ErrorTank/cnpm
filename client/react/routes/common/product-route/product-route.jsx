import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {client} from "../../../../graphql";
import {createVisitedCacheFunction} from "../../../../common/cache/recent-product-guest-visit-cache";
import {getFullProductDetails} from "../../../../graphql/queries/product";
import pick from "lodash/pick"

export class ProductRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            loading: true
        };
        console.log(props);

        client.query({
            query: getFullProductDetails,
            variables: {
                pID: props.match.params.productID
            }
        }).then(({data}) => {
            let result = data.getProduct;
            createVisitedCacheFunction("add")(pick(result, ["name", "_id", "options", "deal", "description", "regularDiscount"]));
            this.setState({product: {...result}, loading: false});
        })
    };

    render() {
        let {loading, product} = this.state;
        return (
            <PageTitle
                title={product ? product.name : "Đang tải thông tin sản phẩm"}
            >
                <AuthenLayout
                    showCategories={true}
                >
                    <div className="container content-container">

                    </div>


                </AuthenLayout>
            </PageTitle>
        );
    }
}