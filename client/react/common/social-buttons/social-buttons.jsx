import React from "react"

const FacebookLoginButton = props => {
  return (
      <button className="btn btn-facebook-login btn-social"
              onClick={props.onClick}
      >
          <span className="fb-icon social-icon">
            <i className="fab fa-facebook-square"></i>
          </span>
          <span className="line"></span>
          <span className="btn-text">{props.text}</span>
      </button>
  )
};

const GoogleLoginButton = props => {
    return (
        <button className="btn btn-google-login btn-social"
                onClick={props.onClick}
        >
          <span className="google-icon social-icon">
            <i className="fab fa-google-plus-square"></i>
          </span>
            <span className="line"></span>
            <span className="btn-text">{props.text}</span>
        </button>
    )
};

export {
    FacebookLoginButton,
    GoogleLoginButton
}