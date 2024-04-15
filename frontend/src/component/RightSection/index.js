import "./style.scss";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import geoJsonData from "./geojsondata.json";
import { Space } from "antd";

const RightSection = ({
  selectedLocation,
  setSelectedLocation,
  countryStats,
  setCountryStats,
}) => {
  let mapRef = useRef();
  let geoJsonRef = useRef();

  useEffect(() => {
    // Create a map instance
    const map = L.map("map").setView([51.505, 0.09], 2);
    mapRef["current"] = map;
    // Add a tile layer
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);
  }, []);

  useEffect(() => {
    // Create a map instance

    const geojsonLayer = L.geoJSON(geoJsonData, {
      // filter: (feature, layer) => {

      // },
      onEachFeature: (feature, layer) => {
        layer.unbindPopup();
        if (
          feature?.properties?.name_long.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.iso_a3.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.iso_a2.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.wb_a3.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.adm0_a3.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.postal.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.sov_a3.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.gu_a3.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.adm0_a3_us.toLowerCase() ===
            selectedLocation?.name.toLowerCase()
        ) {
          layer.bindPopup(
            `Country: ${selectedLocation?.name},  Deceased: ${countryStats?.deaths}, Infected: ${countryStats?.active},  Tested: ${countryStats?.confirmed}`
          );
        } else {
        }
      },
      style: (feature, layer) => {
        if (
          feature?.properties?.name_long.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.iso_a3.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.iso_a2.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.wb_a3.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.adm0_a3.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.postal.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.sov_a3.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.gu_a3.toLowerCase() ===
            selectedLocation?.name.toLowerCase() ||
          feature?.properties?.adm0_a3_us.toLowerCase() ===
            selectedLocation?.name.toLowerCase()
        ) {
          return {
            color: "red",
            fillColor: "red",
            fillOpacity: 1,
          };
        } else {
          return {
            color: "white",
            fillColor: "white",
            fillOpacity: 0,
            opacity: 0,
          };
        }
      },
    }).addTo(mapRef.current);

    mapRef.current.fitBounds(geojsonLayer.getBounds());
  }, [selectedLocation]);

  return <div className="right_section_main" id="map"></div>;
};

export default RightSection;
