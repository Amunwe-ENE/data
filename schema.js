const mongoose = require('mongoose');
const option = { socketTimeoutMS: 30000,
   keepAlive: true, 
   reconnectTries: 30000 ,
  autoReconnect: true,
   poolSize: 10, // Maintain up to 10 socket connections
   //serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
   socketTimeoutMS: 405000, // Close sockets after 45 seconds of inactivity
   family: 4 // Use IPv4, skip trying IPv6
  };
mongoose.connect(process.env.MONGODB_URL, option).then(
    () => {
      console.log('Ready to Use...Connected successfully');
    },
    (err) => {
      console.log('Ze bluetooth device is unable to connect');
      console.log(err);
      throw err;
    },
  );
const allSchema = new mongoose.Schema({
  Country: String,
  CountryCode: String,
  Lat: Number,
  Lon: Number,
  Confirmed: Number,
  Deaths: Number,
  Recovered: Number,
  Active: Number,
  Date: {type: Date,
    unique: true,},
  LocationID: String
})
const dailySchema = new mongoose.Schema({
  Country:String,
  CountryCode:String,
  Province:String,
  City:String,
  CityCode:String,
  Lat:Number,
  Lon:Number,
  Confirmed:Number,
  Deaths:Number,
  Recovered:Number,
  Active:Number,
  Date:Date
})

const Daily = mongoose.model('Daily', dailySchema);
const All = mongoose.model('All', allSchema);

module.exports = {
    All,
    Daily
}