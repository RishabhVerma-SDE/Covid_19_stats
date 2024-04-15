const axios = require("axios");

const instance = ({method, url, headers,...options}) => {
     const baseUrl = 'https://covid-19-statistics.p.rapidapi.com'
     return axios.request({
        method: 'GET',
        url: `${baseUrl}/${url}`,
        headers: {
          'X-RapidAPI-Key': '5b71c7cdeamshb3cfde4a30c5ed4p1efdbbjsn15a5871ef17c',
          'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com',
          ...headers
        },
        ...options

     })
}

module.exports = instance;