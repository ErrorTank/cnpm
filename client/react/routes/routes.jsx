import React from "react";
import { createBrowserHistory } from 'history';
export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {KComponent} from "../common/k-component";
import {ModalsRegistry} from "../common/modal/modals";
import {WithLocationRoute} from "./route-types/with-location-route";
import {IndexRoute} from "./common/index-route/index-route";
import {AuthenRoute, GuestRoute} from "./route-types/authen-routes";
import {RedirectEmailConfirm} from "./guest-route/redirect-email-confirm/redirect-email-confirm";
import {ResetPassword} from "./guest-route/reset-password/reset-password";
import {ProductRoute} from "./common/product-route/product-route";
import  CartRoute  from "./common/cart-route/cart-route";
import {ProductsRoute} from "./guest-route/products-route/products-route";
import {ShopRoute} from "./guest-route/shop-route/shop-route";
import {AccountRoute} from "./authen-route/account-route/account-route";


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
          <Switch>
            <WithLocationRoute exact path="/" render={props => (<IndexRoute {...props}/>)}/>
            <GuestRoute exact path="/email-confirmation" component={RedirectEmailConfirm}/>
            <GuestRoute exact path="/confirm-reset-password" component={ResetPassword}/>
            <WithLocationRoute exact path="/product/:productID" render={props => (<ProductRoute {...props} />)}/>
            <WithLocationRoute exact path="/cart" render={props => (<CartRoute {...props} />)} />
            <GuestRoute exact path="/products" render={props => (<ProductsRoute {...props} />)} />
            <GuestRoute exact path="/shop/:shopID" render={props => (<ShopRoute {...props} />)} />
            <AuthenRoute exact path="/customer/account" render={props => (<AccountRoute {...props} />)} />
          </Switch>

        </Router>
      </div>
    );
  }
}
