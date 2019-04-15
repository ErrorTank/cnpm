import React, {Fragment} from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import {FacebookLoginButton, GoogleLoginButton} from "../../../social-buttons/social-buttons";

export class SocialAuthActions extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };

    };

    facebookResponse = (res) => {
        this.props.onResponse(res, "facebook");
    };

    googleResponse = (res) => {
      this.props.onResponse(res, "google");
    };

    render(){
        return(
            <div className={"social-auth-container"}>
                <FacebookLogin
                    appId={process.env.FACEBOOK_CLIENT_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={() => this.props.handleClickSocialBtn()}
                    callback={this.facebookResponse}
                    render={props => {
                        return (
                            <FacebookLoginButton
                                onClick={props.onClick}
                                text={"Đăng nhập bằng Facebook"}
                            />
                        )
                    }}
                />
                <GoogleLogin
                    clientId={process.env.GOOGLE_CLIENT_ID}
                    render={props => (
                        <Fragment>
                            <br/>
                            <GoogleLoginButton
                                onClick={props.onClick}
                                text={"Đăng nhập bằng Google"}
                            />
                        </Fragment>

                    )}
                    onClick={() => this.props.handleClickSocialBtn()}
                    onSuccess={this.googleResponse}
                    cookiePolicy={'single_host_origin'}
                    onFailure={this.googleResponse}
                />
            </div>
        );
    }
}