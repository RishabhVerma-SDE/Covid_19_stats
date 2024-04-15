import { useNavigate } from "react-router-dom";
import { loginSignUpUsingGoogle } from "../api/api";

const { message } = require("antd");

const useLogin = () => {
  const navigate = useNavigate();
  const login = async (creds) => {
    try {
      let resp = await loginSignUpUsingGoogle(creds?.email);
      if (resp?.data) {
        localStorage.setItem("user_token", resp?.data?.token);
        localStorage.setItem(
          "current_user",
          JSON.stringify({ ...resp?.data?.user, ...creds })
        );
        navigate("/");
      }
    } catch (err) {
      message.error(err);
    }
  };

  return { login };
};

export default useLogin;
