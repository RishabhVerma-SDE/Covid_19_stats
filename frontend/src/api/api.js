import axios from "axios";

const instance = async ({ method, url, headers, ...options }) => {
  const baseUrl = "http://localhost:4000";

  return axios.request({
    method,
    url: `${baseUrl}/${url}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    ...options,
  });
};

export const fetchCountriesList = async () => {
  try {
    return await instance({
      method: "get",
      url: "covid/get-initial",
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchSelectedDetails = async (country, from, to) => {
  let params = {};
  if (!!from && !!to) {
    params = {
      from,
      to,
    };
  }
  try {
    return await instance({
      method: "get",
      url: `covid/get-country-data/${country}`,
      params,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    return await instance({
      method: "post",
      url: `user/login`,
      data: { username, password },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const SignupUser = async (username, password) => {
  try {
    return await instance({
      method: "post",
      url: `user/register`,
      data: { username, password },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const loginSignUpUsingGoogle = async (username) => {
  try {
    return await instance({
      method: "post",
      url: `user/register-with-auth`,
      data: { username },
    });
  } catch (error) {
    throw new Error(error);
  }
};
