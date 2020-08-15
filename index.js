const request = require('request');
require('dotenv').config();
const {All, Daily} = require('./schema');//
const fs = require('fs');
const apiURL = 'https://api.covid19api.com/all';
const tURL = 'https://api.covid19api.com/total/country/'
let counter = 0;
 const countList  = [
    {  country : "Afghanistan",   code : "AF" }, {  country : "Albania",   code : "AL" }, {  country : "Algeria",   code : "DZ" }, {  country : "Andorra",   code : "AD" }, {  country : "Angola",   code : "AO" }, {  country : "Antigua and Barbuda",   code : "AG" }, {  country : "Argentina",   code : "AR" }, {  country : "Armenia",   code : "AM" }, {  country : "Australia",   code : "AU" }, {  country : "Austria",   code : "AT" }, {  country : "Azerbaijan",   code : "AZ" }, {  country : "Bahamas",   code : "BS" }, {  country : "Bahrain",   code : "BH" }, {  country : "Bangladesh",   code : "BD" }, {  country : "Barbados",   code : "BB" }, {  country : "Belarus",   code : "BY" }, {  country : "Belgium",   code : "BE" }, {  country : "Belize",   code : "BZ" }, {  country : "Benin",   code : "BJ" }, {  country : "Bhutan",   code : "BT" }, {  country : "Bolivia",   code : "BO" }, {  country : "Bosnia and Herzegovina",   code : "BA" }, {  country : "Botswana",   code : "BW" }, {  country : "Brazil",   code : "BR" }, {  country : "Brunei Darussalam",   code : "BN" }, {  country : "Bulgaria",   code : "BG" }, {  country : "Burkina Faso",   code : "BF" }, {  country : "Burundi",   code : "BI" }, {  country : "Cambodia",   code : "KH" }, {  country : "Cameroon",   code : "CM" }, {  country : "Canada",   code : "CA" }, {  country : "Cape Verde",   code : "CV" }, {  country : "Central African Republic",   code : "CF" }, {  country : "Chad",   code : "TD" }, {  country : "Chile",   code : "CL" }, {  country : "China",   code : "CN" }, {  country : "Colombia",   code : "CO" }, {  country : "Comoros",   code : "KM" }, {  country : "Congo (Brazzaville)",   code : "CG" }, {  country : "Congo (Kinshasa)",   code : "CD" }, {  country : "Costa Rica",   code : "CR" }, {  country : "Croatia",   code : "HR" }, {  country : "Cuba",   code : "CU" }, {  country : "Cyprus",   code : "CY" }, {  country : "Czech Republic",   code : "CZ" }, {  country : "Côte d'Ivoire",   code : "CI" }, {  country : "Denmark",   code : "DK" }, {  country : "Djibouti",   code : "DJ" }, {  country : "Dominica",   code : "DM" }, {  country : "Dominican Republic",   code : "DO" }, {  country : "Ecuador",   code : "EC" }, {  country : "Egypt",   code : "EG" }, {  country : "El Salvador",   code : "SV" }, {  country : "Equatorial Guinea",   code : "GQ" }, {  country : "Eritrea",   code : "ER" }, {  country : "Estonia",   code : "EE" }, {  country : "Ethiopia",   code : "ET" }, {  country : "Fiji",   code : "FJ" }, {  country : "Finland",   code : "FI" }, {  country : "France",   code : "FR" }, {  country : "Gabon",   code : "GA" }, {  country : "Gambia",   code : "GM" }, {  country : "Georgia",   code : "GE" }, {  country : "Germany",   code : "DE" }, {  country : "Ghana",   code : "GH" }, {  country : "Greece",   code : "GR" }, {  country : "Grenada",   code : "GD" }, {  country : "Guatemala",   code : "GT" }, {  country : "Guinea",   code : "GN" }, {  country : "Guinea-Bissau",   code : "GW" }, {  country : "Guyana",   code : "GY" }, {  country : "Haiti",   code : "HT" }, {  country : "Holy See (Vatican City State)",   code : "VA" }, {  country : "Honduras",   code : "HN" }, {  country : "Hungary",   code : "HU" }, {  country : "Iceland",   code : "IS" }, {  country : "India",   code : "IN" }, {  country : "Indonesia",   code : "ID" }, {  country : "Iran, Islamic Republic of",   code : "IR" }, {  country : "Iraq",   code : "IQ" }, {  country : "Ireland",   code : "IE" }, {  country : "Israel",   code : "IL" }, {  country : "Italy",   code : "IT" }, {  country : "Jamaica",   code : "JM" }, {  country : "Japan",   code : "JP" }, {  country : "Jordan",   code : "JO" }, {  country : "Kazakhstan",   code : "KZ" }, {  country : "Kenya",   code : "KE" }, {  country : "Korea (South)",   code : "KR" }, {  country : "Kuwait",   code : "KW" }, {  country : "Kyrgyzstan",   code : "KG" }, {  country : "Lao PDR",   code : "LA" }, {  country : "Latvia",   code : "LV" }, {  country : "Lebanon",   code : "LB" }, {  country : "Lesotho",   code : "LS" }, {  country : "Liberia",   code : "LR" }, {  country : "Libya",   code : "LY" }, {  country : "Liechtenstein",   code : "LI" }, {  country : "Lithuania",   code : "LT" }, {  country : "Luxembourg",   code : "LU" }, {  country : "Macedonia, Republic of",   code : "MK" }, {  country : "Madagascar",   code : "MG" }, {  country : "Malawi",   code : "MW" }, {  country : "Malaysia",   code : "MY" }, {  country : "Maldives",   code : "MV" }, {  country : "Mali",   code : "ML" }, {  country : "Malta",   code : "MT" }, {  country : "Mauritania",   code : "MR" }, {  country : "Mauritius",   code : "MU" }, {  country : "Mexico",   code : "MX" }, {  country : "Moldova",   code : "MD" }, {  country : "Monaco",   code : "MC" }, {  country : "Mongolia",   code : "MN" }, {  country : "Montenegro",   code : "ME" }, {  country : "Morocco",   code : "MA" }, {  country : "Mozambique",   code : "MZ" }, {  country : "Myanmar",   code : "MM" }, {  country : "Namibia",   code : "NA" }, {  country : "Nepal",   code : "NP" }, {  country : "Netherlands",   code : "NL" }, {  country : "New Zealand",   code : "NZ" }, {  country : "Nicaragua",   code : "NI" }, {  country : "Niger",   code : "NE" }, {  country : "Nigeria",   code : "NG" }, {  country : "Norway",   code : "NO" }, {  country : "Oman",   code : "OM" }, {  country : "Pakistan",   code : "PK" }, {  country : "Palestinian Territory",   code : "PS" }, {  country : "Panama",   code : "PA" }, {  country : "Papua New Guinea",   code : "PG" }, {  country : "Paraguay",   code : "PY" }, {  country : "Peru",   code : "PE" }, {  country : "Philippines",   code : "PH" }, {  country : "Poland",   code : "PL" }, {  country : "Portugal",   code : "PT" }, {  country : "Qatar",   code : "QA" }, {  country : "Republic of Kosovo",   code : "XK" }, {  country : "Romania",   code : "RO" }, {  country : "Russian Federation",   code : "RU" }, {  country : "Rwanda",   code : "RW" }, {  country : "Saint Kitts and Nevis",   code : "KN" }, {  country : "Saint Lucia",   code : "LC" }, {  country : "Saint Vincent and Grenadines",   code : "VC" }, {  country : "San Marino",   code : "SM" }, {  country : "Sao Tome and Principe",   code : "ST" }, {  country : "Saudi Arabia",   code : "SA" }, {  country : "Senegal",   code : "SN" }, {  country : "Serbia",   code : "RS" }, {  country : "Seychelles",   code : "SC" }, {  country : "Sierra Leone",   code : "SL" }, {  country : "Singapore",   code : "SG" }, {  country : "Slovakia",   code : "SK" }, {  country : "Slovenia",   code : "SI" }, {  country : "Somalia",   code : "SO" }, {  country : "South Africa",   code : "ZA" }, {  country : "South Sudan",   code : "SS" }, {  country : "Spain",   code : "ES" }, {  country : "Sri Lanka",   code : "LK" }, {  country : "Sudan",   code : "SD" }, {  country : "Suriname",   code : "SR" }, {  country : "Swaziland",   code : "SZ" }, {  country : "Sweden",   code : "SE" }, {  country : "Switzerland",   code : "CH" }, {  country : "Syrian Arab Republic (Syria)",   code : "SY" }, {  country : "Taiwan, Republic of China",   code : "TW" }, {  country : "Tajikistan",   code : "TJ" }, {  country : "Tanzania, United Republic of",   code : "TZ" }, {  country : "Thailand",   code : "TH" }, {  country : "Timor-Leste",   code : "TL" }, {  country : "Togo",   code : "TG" }, {  country : "Trinidad and Tobago",   code : "TT" }, {  country : "Tunisia",   code : "TN" }, {  country : "Turkey",   code : "TR" }, {  country : "Uganda",   code : "UG" }, {  country : "Ukraine",   code : "UA" }, {  country : "United Arab Emirates",   code : "AE" }, {  country : "United Kingdom",   code : "GB" }, {  country : "United States of America",   code : "US" }, {  country : "Uruguay",   code : "UY" }, {  country : "Uzbekistan",   code : "UZ" }, {  country : "Venezuela (Bolivarian Republic)",   code : "VE" }, {  country : "Viet Nam",   code : "VN" }, {  country : "Western Sahara",   code : "EH" }, {  country : "Yemen",   code : "YE" }, {  country : "Zambia",   code : "ZM" }, {  country : "Zimbabwe",   code : "ZW" },
 ] 

const getAndSaveAll = () => {
    console.log('getting...')
    request(apiURL, function (error, response, body) {
       if(error) return console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
      //  console.log('body:', body); // Print the HTML for the Google homepage.
        let json = JSON.parse(body)
        let count = 0
        console.log('Total: '+json.length)
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
          count +=1
          console.log(`k${count}: Successfully save ${results.Country}`)
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
      let count = 0
        console.log('Total: '+json.length)
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
        count +=1;
        console.log(`${count}: Successfully save ${results.Country}`)
      })
    })
    });
}

// let first = 100;
// countList.map(count => {
//   console.log(`Setting request for ${count.country}`)
//   setTimeout(()=>{
//     getAndSaveDaily(count.code);
//   }, first);
//   first+= 15000
// })
let updateCounter = 0
countList.map(count => {
  //console.log(`Setting request for ${count.country}`)
  updateCounter+=1
  Daily.updateMany({Country:count.country, CountryCode: ""},  
    {CountryCode: count.code}, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log(updateCounter+": Updated Docs : ", docs.nModified); 
    } 
});
})
