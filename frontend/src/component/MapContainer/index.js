import { useEffect, useState } from "react";
import LeftSection from "../LeftSection";
import RightSection from "../RightSection";
import "./style.scss";
import { fetchCountriesList } from "../../api/api";
import { message } from "antd";

const MapContainer = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [countryStats, setCountryStats] = useState({});
  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await fetchCountriesList();
        if (data?.data?.data) {
          setCountriesList(data?.data?.data);
        }
      } catch (error) {
        console.log(error);
        message.error("Error in fetching list!");
      }
    }

    loadCountries();
  }, []);
  return (
    <div className="map_container_main">
      <LeftSection
        countriesList={countriesList}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        countryStats={countryStats}
        setCountryStats={setCountryStats}
      />
      <RightSection
        selectedLocation={selectedLocation}
        countryStats={countryStats}
      />
    </div>
  );
};

export default MapContainer;
