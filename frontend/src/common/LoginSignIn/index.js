import { useState } from "react";
import "./style.scss";
import { Button, Divider, Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { SignupUser, loginSignUpUsingGoogle, loginUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import useLogin from "../../hooks/useLogin";

const LoginSignIn = () => {
  const navigate = useNavigate();
  const [isLoginSigninSelected, setIsLoginSigninSelected] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confimePassword, setConfirmPassword] = useState("");
  const { login } = useLogin();

  const handleLoginSignUp = async () => {
    if (!username) {
      message.error("Username must be defined!");
      return;
    }

    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!username.match(validRegex)) {
      message.error("Username must be an email!");
      return;
    }

    if (isLoginSigninSelected !== "login" && password !== confimePassword) {
      message.error("Password and confirm password are not same!");
      return;
    }
    if (password.length < 5) {
      message.error("Password length can not be less than 5!");
      return;
    }

    if (isLoginSigninSelected == "login") {
      try {
        const data = await loginUser(username, password);
        if (data?.data) {
          localStorage.setItem("user_token", data?.data?.token);
          localStorage.setItem(
            "current_user",
            JSON.stringify(data?.data?.user)
          );
          navigate("/");
        }
      } catch (error) {
        message.error("Invalid details");
      }
    }

    if (isLoginSigninSelected !== "login") {
      try {
        const data = await SignupUser(username, password);
        if (data?.data) {
          localStorage.setItem("user_token", data?.data?.token);
          localStorage.setItem(
            "current_user",
            JSON.stringify(data?.data?.user)
          );
          navigate("/");
        }
      } catch (error) {
        message.error("Invalid details");
      }
    }
  };

  const getLeftSection = () => {
    return (
      <div className="left_wrapper">
        <img src="landing_image.png" alt="" />
      </div>
    );
  };

  const getRightSection = () => {
    return (
      <div className="right_wrapper">
        <div className="outer_wrapper">
          <div className="inner_wrapper">
            <div className="title_text">
              <span>Welcome Back</span>
            </div>
            <div className="input_username">
              <Input
                className="username"
                name="username"
                placeholder="username or email"
                onChange={(e) => {
                  setUsername(e?.target?.value);
                }}
                prefix={<UserOutlined />}
                value={username}
              />
            </div>
            <div className="input_password">
              <Input.Password
                className="password"
                name="password"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e?.target?.value);
                }}
                value={password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            {isLoginSigninSelected !== "login" && (
              <div className="input_confirm_password">
                <Input.Password
                  className="confirm_password"
                  name="confirm_password"
                  placeholder="confirm password"
                  onChange={(e) => {
                    setConfirmPassword(e?.target?.value);
                  }}
                  value={confimePassword}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
            )}
            <div className="signup_login_btn_wrapper">
              <Button
                className="login_signup_button"
                onClick={() => {
                  handleLoginSignUp();
                }}
              >
                {isLoginSigninSelected === "login" ? "Login" : "Sign Up"}
              </Button>
            </div>
            <div className="divider" />
            <div className="google_login_wrapper">
              <GoogleLogin
                onSuccess={(credsResponse) => {
                  var decoded = jwtDecode(credsResponse.credential);
                  login(decoded);
                }}
                onError={(err) => {
                  message.error(err);
                }}
              />
            </div>
            <div className="note_wrapper">
              <Button
                className="instead_btn"
                type="ghost"
                onClick={() => {
                  isLoginSigninSelected === "login"
                    ? setIsLoginSigninSelected("signup")
                    : setIsLoginSigninSelected("login");
                }}
              >
                {isLoginSigninSelected === "login"
                  ? "Sign Up Instead"
                  : "Log in Instead"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="login_wrapper">
      {getLeftSection()}
      {getRightSection()}
    </div>
  );
};

export default LoginSignIn;
