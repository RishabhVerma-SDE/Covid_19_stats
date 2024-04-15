import { Route, Routes } from "react-router-dom";
import MapContainer from "../../component/MapContainer";
import Header from "../Header";
import "./style.scss";
import About from "../../component/About";

const Layout = () => {
  return (
    <div className="layout_main">
      <Header />
      <div className="content_section">
        <Routes>
          <Route path={"/"} exact={true} element={<MapContainer />} />
          <Route path={"/about"} exact={true} element={<About />} />
          <Route path={"*"} exact={true} element={<>This is 404</>} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
