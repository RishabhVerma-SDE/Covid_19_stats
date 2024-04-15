import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import { Avatar, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState("dashboard");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("current_user")) {
      let current_user = JSON.parse(localStorage.getItem("current_user"));
      setUser(current_user);
    }
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      setActive("dashboard");
    } else {
      setActive(pathname.split("/")[1]);
    }
  }, [pathname]);

  const toggle_menus = [
    {
      key: 0,
      name: "dashboard",
      title: "Dashboard",
      onClick: () => {
        navigate("/");
      },
    },
    {
      key: 1,
      name: "about",
      title: "About",
      onClick: () => {
        navigate("/about");
      },
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("current_user");
    navigate("/");
  };

  return (
    <div className="header_main">
      <div className="toggler_section">
        {toggle_menus?.map((item) => {
          return (
            <div
              className={`menu_item ${
                active === item?.name ? "active_menu" : ""
              }`}
              key={item?.key}
            >
              <a className="text_title" onClick={() => item?.onClick()}>
                {item?.title}
              </a>
            </div>
          );
        })}
      </div>
      <div className="util_section">
        <div className="avatar_wrapper">
          <Avatar className="avatar_main">
            {user?.picture ? (
              <img src={user?.picture} alt="" />
            ) : (
              user?.username?.[0]
            )}
          </Avatar>
        </div>
        <div className="logout_wrapper">
          <Button
            className="logout_button"
            icon={<LogoutOutlined />}
            type="ghost"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
