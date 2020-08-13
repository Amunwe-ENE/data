const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL).then(
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

const All = mongoose.model('All', allSchema);

module.exports = {
    All,
}