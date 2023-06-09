#!/usr/bin/env node
import moment from "moment-timezone";
import minimist from 'minimist';
import fetch from "node-fetch";

const args = minimist(process.argv.slice(2));


if(args.h){
  console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
  -h            Show this help message and exit.
  -n, -s        Latitude: N positive; S negative.
  -e, -w        Longitude: E positive; W negative.
  -z            Time zone: uses tz.guess() from moment-timezone by default.
  -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
  -j            Echo pretty JSON from open-meteo API and exit.`)

  process.exit(0);

}
var timezone = moment.tz.guess();

if(args.z){
  timezone = args.z;
}

var latitude = 0;
if(args.n){
  latitude = parseFloat(args.n);
}
else if(args.s){
  latitude = parseFloat(args.s) * -1;
}
else{
  console.log("Latitude must be in range");
  process.exit(0);
}

var longitude = 0;
if(args.e){
  longitude = parseFloat(args.e);
}
else if(args.w){
  longitude = parseFloat(args.w) * -1;
}
else{
  console.log("Longitude must be in range");
  process.exit(0);
}



//Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+ latitude +'&longitude='+ longitude +'&daily=precipitation_hours&current_weather=true&timezone=' + timezone);

// Get the data from the request
const data = await response.json();

if(args.j){
  console.log(data);
  process.exit(0);
}

const days = args.d; 

let message = "";
if(data.daily.precipitation_hours[days] == 0){
  message = "You will not need your galoshes";
}
else {
  message = "You might need your galoshes";
}


if (days == 0) {
  console.log(message + " today.")
} else if (days > 1) {
  console.log(message + " in " + days + " days.")
} else {
  console.log(message + " tomorrow.")
}

