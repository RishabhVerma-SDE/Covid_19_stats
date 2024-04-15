import { Select, message } from "antd";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { fetchSelectedDetails } from "../../api/api";
import React from "react";
import Chart from "chart.js/auto";

const monthsList = [
  {
    label: "Jan",
    value: 1,
  },
  {
    label: "Feb",
    value: 2,
  },
  {
    label: "Mar",
    value: 3,
  },
  {
    label: "Apr",
    value: 4,
  },
  {
    label: "May",
    value: 5,
  },
  {
    label: "Jun",
    value: 6,
  },
  {
    label: "Jul",
    value: 7,
  },
  {
    label: "Aug",
    value: 8,
  },
  {
    label: "Sep",
    value: 9,
  },
  {
    label: "Oct",
    value: 10,
  },
  {
    label: "Nov",
    value: 11,
  },
  {
    label: "Dec",
    value: 12,
  },
];

const casualityType = [
  {
    label: "Deceased",
    value: "deaths",
  },
  {
    label: "Infected",
    value: "active",
  },
  {
    label: "Tested",
    value: "confirmed",
  },
];

const LeftSection = ({
  countriesList,
  selectedLocation,
  setSelectedLocation,
  countryStats,
  setCountryStats,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [selectedType, setSelectedType] = useState("confirmed");
  const [monthsData, setMonthsData] = useState({});
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const getData = (selectedType) => {
    let dataArray = [];

    if (Object?.keys(monthsData)?.length > 0) {
      Object?.values(monthsData).forEach((item) => {
        dataArray.push(item[selectedType]);
      });
    } else {
      dataArray.push(countryStats[selectedType]);
    }
    return dataArray;
  };

  const getLabels = (selectedType) => {
    let labelsArray = [];
    if (to && from) {
      labelsArray = monthsList.slice(from - 1, to)?.map((item) => item?.label);
    }

    return labelsArray;
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: getLabels(selectedType),
        datasets: [
          {
            label: casualityType?.filter(
              (item) => item?.value === selectedType
            )[0]["label"],
            data: getData(selectedType),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedType, to, from, monthsData]);

  const getCountriesList = () => {
    let list = [{ label: "World", value: "world" }];

    countriesList?.forEach((item) => {
      list.push({
        label: item?.name,
        value: item?.iso,
      });
    });

    return list;
  };

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await fetchSelectedDetails(selectedCountry, from, to);

        setSelectedLocation(data?.data?.countryLocation || null);
        setCountryStats(data?.data?.stats?.data || {});
        setMonthsData(data?.data?.monthsData || {});
      } catch (error) {
        console.log(error);
        message.error("Error in fetching list!");
      }
    }

    selectedCountry && fetchDetails();
  }, [selectedCountry, to, from]);

  return (
    <div className="left_section_main">
      <strong>Wait for loading, Loader has not been used yet...</strong>
      <div className="select_country_section">
        <label htmlFor="country_filter" className="region_title">
          Filter Region:{" "}
        </label>
        <Select
          id="country_filter"
          className="countries_filter_dropdown"
          options={getCountriesList()}
          value={selectedCountry}
          onChange={(val) => {
            setSelectedCountry(val);
          }}
          onSearch={(val) => {
            setSelectedCountry(val);
          }}
          showSearch
        />
      </div>
      <div className="select_months">
        <label htmlFor="month_selection" className="months_title">
          Filter Month:{" "}
        </label>
        <div className="months_container" id="month_selection">
          <Select
            className="from_month_dropdown"
            options={monthsList}
            value={from}
            onChange={(val) => {
              if (to && val > to) {
                message.info("Please choose lesser value!");
                return;
              }
              setFrom(val);
            }}
            onSearch={(val) => {
              if (to && val > to) {
                message.info("Please choose lesser value!");
                return;
              }
              setFrom(val);
            }}
            showSearch
          />
          <Select
            className="from_month_dropdown"
            options={monthsList}
            value={to}
            onChange={(val) => {
              if (from && val < from) {
                message.info("Please choose greater value!");
                return;
              }
              setTo(val);
            }}
            onSearch={(val) => {
              if (from && val < from) {
                message.info("Please choose greater value!");
                return;
              }
              setTo(val);
            }}
            showSearch
          />
        </div>
      </div>
      <div className="stats_section">
        <div className="stats_data">
          <span className="stats_title">Deceased</span>
          <div className="stats_value">{countryStats?.deaths || ""}</div>
        </div>
        <div className="stats_data">
          <span className="stats_title">Infected</span>
          <div className="stats_value">{countryStats?.active || ""}</div>
        </div>
        <div className="stats_data">
          <span className="stats_title">Tested</span>
          <div className="stats_value">{countryStats?.confirmed || ""}</div>
        </div>
      </div>
      <div className="filter_type">
        <label htmlFor="casuality_filter" className="casuality_title">
          Filter Type:{" "}
        </label>
        <Select
          id="casuality_filter"
          className="casuality_filter_dropdown"
          options={casualityType}
          value={selectedType}
          onChange={(val) => {
            setSelectedType(val);
          }}
          onSearch={(val) => {
            setSelectedType(val);
          }}
          showSearch
        />
      </div>
      <div className="stats_charts">
        <canvas ref={chartRef} width={500} height={400} />
      </div>
    </div>
  );
};

export default LeftSection;
