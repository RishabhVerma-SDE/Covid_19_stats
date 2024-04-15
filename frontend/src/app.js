import { useEffect, useState } from "react";
import "./app.scss";
import Layout from "./common/Layout";
import LoginSignIn from "./common/LoginSignIn";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  let token = localStorage.getItem("user_token");
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!!token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      navigate("/");
    }
  }, []);

  return <div className="app_main">{token ? <Layout /> : <LoginSignIn />}</div>;
}

export default App;
