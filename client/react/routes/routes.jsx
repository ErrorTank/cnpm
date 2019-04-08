import React from "react";
import { createBrowserHistory } from 'history';
export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {KComponent} from "../common/k-component";
import {ModalsRegistry} from "../common/modal/modals";


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

          </Switch>

        </Router>
      </div>
    );
  }
}
