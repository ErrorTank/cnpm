import React, {lazy, Suspense} from "react";
import { createBrowserHistory } from 'history';
export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {KComponent} from "../common/k-component";
import {ModalsRegistry} from "../common/modal/modals";
import {WithLocationRoute} from "./route-types/with-location-route";
const delayLoad = fn => () => new Promise(resolve => {
  setTimeout(() => resolve(fn()), 300)
});
const IndexRoute =  lazy(delayLoad(() => import("./common/index-route/index-route")));
import {AuthenRoute, GuestRoute} from "./route-types/authen-routes";
import {OverlayLoading} from "./guest-route/redirect-email-confirm/redirect-email-confirm";
import {CheckoutRoute} from "./common/checkout-route/checkout-route";
const RedirectEmailConfirm =  lazy(delayLoad(() => import("./guest-route/redirect-email-confirm/redirect-email-confirm")));
const ResetPassword =  lazy(delayLoad(() => import("./guest-route/reset-password/reset-password")));
const ProductRoute =  lazy(delayLoad(() => import("./common/product-route/product-route")));
const CartRoute =  lazy(delayLoad(() => import("./common/cart-route/cart-route")));
const ProductsRoute =  lazy(delayLoad(() => import("./guest-route/products-route/products-route")));
const ShopRoute =  lazy(delayLoad(() => import("./guest-route/shop-route/shop-route")));
const AccountRoute =  lazy(delayLoad(() => import("./authen-route/account-route/account-route")));
const SearchRoute = lazy(delayLoad(() => import("./common/search-route/search-route")));


// const NotFoundRoute = () => {
//   let getComp = (props) => {
//
//     if (!userInfo.getState()) {
//       return (
//         <NotFoundPage isLogin = {false} path={props.location.pathname}/>
//       );
//
//     }
//     return (
//       <AuthenLayout location={props.location} match={props.match}>
//         <NotFoundPage isLogin = {true} path={props.location.pathname}/>
//       </AuthenLayout>
//     )
//   };
//
//   return (
//     <Route
//       render={props => getComp(props)}
//     />
//   )
// };

export class MainRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    return (
      <div id="main-route">
        <ModalsRegistry/>
        <Router
          history={customHistory}
        >
          <Suspense fallback={<OverlayLoading/>}>
            <Switch>
              <WithLocationRoute exact path="/" render={props => (<IndexRoute {...props}/>)}/>
              <GuestRoute exact path="/email-confirmation" component={RedirectEmailConfirm}/>
              <GuestRoute exact path="/confirm-reset-password" component={ResetPassword}/>
              <WithLocationRoute exact path="/product/:productID" render={props => (<ProductRoute {...props} />)}/>
              <WithLocationRoute exact path="/cart" render={props => (<CartRoute {...props} />)} />
              <WithLocationRoute exact path="/products" render={props => (<ProductsRoute {...props} />)} />
              <WithLocationRoute exact path="/search" render={props => (<SearchRoute {...props} />)} />
              <WithLocationRoute exact path="/shop/:shopID" render={props => (<ShopRoute {...props} />)} />
              <WithLocationRoute exact path="/checkout" render={props => (<CheckoutRoute {...props} />)} />
              <AuthenRoute exact path="/customer/account" render={props => (<AccountRoute {...props} />)} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}
