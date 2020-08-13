const request = require('request');
require('dotenv').config();
const {All} = require('./schema');//
const apiURL = 'https://api.covid19api.com/all';

const getAndSaveAll = () => {
    console.log('getting...')
    request(apiURL, function (error, response, body) {
       if(error) return console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        let json = JSON.parse(body)
        json.map(data => {
        new All({
          Country: data.Country,
        CountryCode: data.CountryCode,
        Lat: data.Lat,
        Lon: data.Lon,
        Confirmed: data.Confirmed,
        Deaths: data.Deaths,
        Recovered: data.Recovered,
        Active: data.Active,
        Date: data.Date,
        LocationID: data.LocationID
        }).save((err, results)=> {

        })
      })
      });
}
getAndSaveAll();