require("dotenv").config();
const { default: axios } = require("axios");
const authenticate = require("../middleware/authenticate");
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const instance = require("../api/index");

const covid = (app, path) => {
  let routePath = `/${path}`;

  app.get(routePath + "/get-initial", authenticate, async (req, res) => {
    try {
      let landingData = await instance({
        method: "GET",
        url: "regions",
      });
      res.setHeader("Content-Type", "application/json");
      await res.status(200).send(landingData?.data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.get(
    routePath + "/get-country-data/:country",
    authenticate,
    async (req, res) => {
      try {
        const country = req.params.country;
        const { from, to } = req?.query;

        if (!country) {
          throw new Error("Country is not specified.");
        }

        if (from > to) {
          throw new Error("From can not be greater than to");
        }

        let landingData = await instance({
          method: "GET",
          url: "provinces",
          params: { iso: country },
        });

        const countryLocation = landingData?.data?.data[0];

        if (country && !to && !from) {
          let worldData = null;
          if (country === "world") {
            worldData = await instance({
              method: "GET",
              url: "reports/total",
            });
            // console.log(worldData?.data)
          } else {
            worldData = await instance({
              method: "GET",
              url: "reports",
              params: {
                iso: country,
              },
            });
          }
          if (Array.isArray(worldData?.data?.data)) {
            let resultantData = worldData?.data?.data?.reduce((acc, item) => {
              return (acc = {
                ...acc,
                date: item?.date,
                active: (acc?.active || 0) + (item?.active || 0),
                confirmed: (acc?.confirmed || 0) + (item?.confirmed || 0),
                recovered: (acc?.recovered || 0) + (item?.recovered || 0),
                deaths: (acc?.deaths || 0) + (item?.deaths || 0),
              });
            }, {});

            worldData = {
              data: {
                data: resultantData,
              },
            };
          }

          res.setHeader("Content-Type", "application/json");
          await res
            .status(200)
            .send({ stats: worldData?.data, countryLocation });
        } else if (country && from && !to) {
          throw new Error("Please select the to month");
        } else if (country && to && !from) {
          throw new Error("Please select the from month");
        } else if (country && to && from) {
          let monthsData = {};
          let worldData = null;
          let resultantData = {};
          for (let m = from; m <= to; m++) {
            if (country === "world") {
              worldData = await instance({
                method: "GET",
                url: "reports/total",
                params: {
                  date: `2022-${m < 10 ? "0" + m : m}-28`,
                },
              });
            } else {
              worldData = await instance({
                method: "GET",
                url: "reports",
                params: {
                  iso: country,
                  date: `2022-${m < 10 ? "0" + m : m}-28`,
                },
              });
            }

            if (Array.isArray(worldData?.data?.data)) {
              let resultantData = worldData?.data?.data?.reduce((acc, item) => {
                return (acc = {
                  ...acc,
                  date: item?.date,
                  active: (acc?.active || 0) + (item?.active || 0),
                  confirmed: (acc?.confirmed || 0) + (item?.confirmed || 0),
                  recovered: (acc?.recovered || 0) + (item?.recovered || 0),
                  deaths: (acc?.deaths || 0) + (item?.deaths || 0),
                });
              }, {});

              worldData = {
                data: {
                  data: resultantData,
                },
              };
            }

            monthsData[`2022-${m < 10 ? "0" + m : m}-28`] =
              worldData?.data?.data;
          }

          if (from !== to) {
            let keysOfMonthsData = Object.keys(monthsData);

            let firstDate = keysOfMonthsData[0];
            let lastDate = keysOfMonthsData[keysOfMonthsData?.length - 1];

            resultantData = {
              date: lastDate,
              active:
                (monthsData[lastDate]?.active || 0) -
                (monthsData[firstDate]?.active || 0),
              confirmed:
                (monthsData[lastDate]?.confirmed || 0) -
                (monthsData[firstDate]?.confirmed || 0),
              recovered:
                (monthsData[lastDate]?.recovered || 0) -
                (monthsData[firstDate]?.recovered || 0),
              deaths:
                (monthsData[lastDate]?.deaths || 0) -
                (monthsData[firstDate]?.deaths || 0),
            };
            worldData = {
              data: {
                data: resultantData,
              },
            };
          }

          res.setHeader("Content-Type", "application/json");
          await res
            .status(200)
            .send({ stats: worldData?.data, countryLocation, monthsData });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    }
  );
};

module.exports = covid;
