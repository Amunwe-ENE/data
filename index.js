const request = require('request');
require('dotenv').config();
const {All, Daily} = require('./schema');//
const fs = require('fs');
const apiURL = 'https://api.covid19api.com/all';
const tURL = 'https://api.covid19api.com/total/country/'
let counter = 0;
 const countList  = [
  {  country : "Panama",   code : "PA" }, {  country : "Papua New Guinea",   code : "PG" }, {  country : "Paraguay",   code : "PY" }, {  country : "Peru",   code : "PE" }, {  country : "Philippines",   code : "PH" }, {  country : "Poland",   code : "PL" }, {  country : "Portugal",   code : "PT" }, {  country : "Qatar",   code : "QA" }, {  country : "Republic of Kosovo",   code : "XK" }, {  country : "Romania",   code : "RO" }, {  country : "Russian Federation",   code : "RU" }, {  country : "Rwanda",   code : "RW" }, {  country : "Saint Kitts and Nevis",   code : "KN" }, {  country : "Saint Lucia",   code : "LC" }, {  country : "Saint Vincent and Grenadines",   code : "VC" }, {  country : "San Marino",   code : "SM" }, {  country : "Sao Tome and Principe",   code : "ST" }, {  country : "Saudi Arabia",   code : "SA" }, {  country : "Senegal",   code : "SN" }, {  country : "Serbia",   code : "RS" }, {  country : "Seychelles",   code : "SC" }, {  country : "Sierra Leone",   code : "SL" }, {  country : "Singapore",   code : "SG" }, {  country : "Slovakia",   code : "SK" }, {  country : "Slovenia",   code : "SI" }, {  country : "Somalia",   code : "SO" }, {  country : "South Africa",   code : "ZA" }, {  country : "South Sudan",   code : "SS" }, {  country : "Spain",   code : "ES" }, {  country : "Sri Lanka",   code : "LK" }, {  country : "Sudan",   code : "SD" }, {  country : "Suriname",   code : "SR" }, {  country : "Swaziland",   code : "SZ" }, {  country : "Sweden",   code : "SE" }, {  country : "Switzerland",   code : "CH" }, {  country : "Syrian Arab Republic (Syria)",   code : "SY" }, {  country : "Taiwan, Republic of China",   code : "TW" }, {  country : "Tajikistan",   code : "TJ" }, {  country : "Tanzania, United Republic of",   code : "TZ" }, {  country : "Thailand",   code : "TH" }, {  country : "Timor-Leste",   code : "TL" }, {  country : "Togo",   code : "TG" }, {  country : "Trinidad and Tobago",   code : "TT" }, {  country : "Tunisia",   code : "TN" }, {  country : "Turkey",   code : "TR" }, {  country : "Uganda",   code : "UG" }, {  country : "Ukraine",   code : "UA" }, {  country : "United Arab Emirates",   code : "AE" }, {  country : "United Kingdom",   code : "GB" }, {  country : "United States of America",   code : "US" }, {  country : "Uruguay",   code : "UY" }, {  country : "Uzbekistan",   code : "UZ" }, {  country : "Venezuela (Bolivarian Republic)",   code : "VE" }, {  country : "Viet Nam",   code : "VN" }, {  country : "Western Sahara",   code : "EH" }, {  country : "Yemen",   code : "YE" }, {  country : "Zambia",   code : "ZM" }, {  country : "Zimbabwe",   code : "ZW" },
] 

const getAndSaveAll = () => {
    console.log('getting...')
    request(apiURL, function (error, response, body) {
       if(error) return console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
      //  console.log('body:', body); // Print the HTML for the Google homepage.
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
          if(err) console.error(err)
          console.log(`Successfully save ${results.Country}`)
        })
      })
      });
}
//getAndSaveAll();
const pipeToFile = ()=> {
  request(apiURL).pipe(fs.createWriteStream('all.json'))
}
//pipeToFile();


const getAndSaveDaily = (code) => {
  console.log('getting...')
  request(tURL+code, function (error, response, body) {
     if(error) return console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
    //  console.log('body:', body); // Print the HTML for the Google homepage.
      let json = JSON.parse(body)
      json.map(data => {
      new Daily({
        Country: data.Country,
      CountryCode: data.CountryCode,
      Province: data.Province,
      City:data.City,
      CityCode:data.CityCode,
      Lat: data.Lat,
      Lon: data.Lon,
      Confirmed: data.Confirmed,
      Deaths: data.Deaths,
      Recovered: data.Recovered,
      Active: data.Active,
      Date: data.Date,

      }).save((err, results)=> {
        if(err) console.error(err)
        console.log(`Successfully save ${results.Country}`)
      })
    })
    });
}

let first = 100;
countList.map(count => {
  console.log(`Setting request for ${count.country}`)
  setTimeout(()=>{
    getAndSaveDaily(count.code);
  }, first);
  first+= 15000
})
