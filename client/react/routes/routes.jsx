import React, {lazy, Suspense} from "react";
import { createBrowserHistory } from 'history';
export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {KComponent} from "../common/k-component";
import {ModalsRegistry} from "../common/modal/modals";
import {WithLocationRoute} from "./route-types/with-location-route";
const IndexRoute =  lazy(() => import("./common/index-route/index-route"));
import {AuthenRoute, GuestRoute} from "./route-types/authen-routes";
const RedirectEmailConfirm =  lazy(() => import("./guest-route/redirect-email-confirm/redirect-email-confirm"));
const ResetPassword =  lazy(() => import("./guest-route/reset-password/reset-password"));
const ProductRoute =  lazy(() => import("./common/product-route/product-route"));
import  CartRoute  from "./common/cart-route/cart-route";
const ProductsRoute =  lazy(() => import("./guest-route/products-route/products-route"));
const ShopRoute =  lazy(() => import("./guest-route/shop-route/shop-route"));
const AccountRoute =  lazy(() => import("./authen-route/account-route/account-route"));


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
          <Suspense fallback={(<div>Con cac</div>)}>
            <Switch>
              <WithLocationRoute exact path="/" render={props => (<IndexRoute {...props}/>)}/>
              <GuestRoute exact path="/email-confirmation" component={RedirectEmailConfirm}/>
              <GuestRoute exact path="/confirm-reset-password" component={ResetPassword}/>
              <WithLocationRoute exact path="/product/:productID" render={props => (<ProductRoute {...props} />)}/>
              <WithLocationRoute exact path="/cart" render={props => (<CartRoute {...props} />)} />
              <WithLocationRoute exact path="/products" render={props => (<ProductsRoute {...props} />)} />
              <WithLocationRoute exact path="/shop/:shopID" render={props => (<ShopRoute {...props} />)} />
              <AuthenRoute exact path="/customer/account" render={props => (<AccountRoute {...props} />)} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}
