import React from "react";
import {rolesHelper, userInfo} from "../../../common/states/user-info";
import {Route, Redirect} from "react-router-dom"
import {TrackLocation} from "../../common/location-tracker";
import {AuthenLayout} from "../../layout/authen-layout/authen-layout";
import {authenCache} from "../../../common/cache/authen-cache";
import {KComponent} from "../../common/k-component";


export class GuestRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {};
    // this.onUnmount(userInfo.onChange(() => {
    //   this.forceUpdate();
    // }));
  };

  render() {
    let {render, component: Component, ...rest} = this.props;
    return (
      <Route
        {...rest}
        render={props => !authenCache.getAuthen() ? render ? render(props) : (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )}
      />
    );
  }
}

export const AuthenRoute = ({component: Component, excludeRoles = null, ...rest}) => {
  let getComp = (props) => {
    let info = userInfo.getState();
    if (!authenCache.getAuthen()) {
      return (
        <Redirect to={{pathname: "/login"}}/>
      )
    }
    if (info && excludeRoles && excludeRoles.length) {

      if (excludeRoles.includes(info.role)) {
        return (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    }
    return (
      <AuthenLayout location={props.location} match={props.match}>
        <Component {...props}/>
      </AuthenLayout>
    )
  };
  return (
    <Route
      {...rest}
      render={props => {

        return (
          <TrackLocation
            location={props.match.url}
            render={() => getComp(props)}
          />


        )
      }}
    />
  );
};
