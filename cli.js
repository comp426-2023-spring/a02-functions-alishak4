#!/usr/bin/env node
import moment from "moment-timezone";
import minimist from 'minimist';
import fetch from "node-fetch";

const args = minimist(process.argv.slice(2));

//Show help
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

if(args.z){
  var timezone = args.z;
}
else{
  var timezone = moment.tz.guess();
}


const longitude = args.e ?? args.w;
const latitude = args.n ?? args.s;

//Make a request
const response = await fetch('https://open-meteo.com/en/docs#latitude='+latitude+'&longitude='+longitude+'&hourly=temperature_2m&daily=precipitation_hours&timezone='+timezone);

// Get the data from the request
const data = await response.json();

if (args.j) {
  console.log(JSON.stringify(data, null, 2));
  process.exit(0);
}

if (data.daily.precipitation_hours[day] > 0) {
process.stdout.write("You might need your galoshes ");
}
else {
process.stdout.write("You probably won't need your galoshes ");
}


const days = args.d; 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}

// //  Set latitude and longitude option default
// OPT_N=false
// OPT_S=false
// OPT_E=false
// OPT_W=false

// const options = {};
// for (let i = 2; i < process.argv.length; i += 2) {
//   const option = process.argv[i];
//   const value = process.argv[i + 1];
//   switch (option) {
//     case '-h':
//       // Handle help option
//       showHelp();
//       break;
//     case '-n':
//       // Handle latitude option
//       OPT_N = true;
//       if(OPT_S == true){
//         console.error("ERROR: Cannot specify LATITUDE twice")
//       }
//       else{
//       options.latitude = Number(value);
//       }
//       break;
//     case '-s':
//         OPT_S = true;
//         if(OPT_N == true){
//             console.error("ERROR: Cannot specify LONGITUDE twice")
//         }
//         else {
//       // Handle south latitude option
//       options.latitude = -1 * Number(value);}
//       break;
//     case '-e':
//       // Handle longitude option
//       OPT_E = true;
//     if(OPT_W == true){
//         console.error("ERROR: Cannot specify LATITUDE twice")
//     }
//     else{
//       options.longitude = Number(value);
//       break;
//     }
//     case '-w':
//       // Handle west longitude option
//       OPT_W = true;
//       if(OPT_E == true){
//         console.error("ERROR: Cannot specify LATITUDE twice")
//     }
//     else{
//       options.longitude = -1 * Number(value);
//       break;
//     }
//     case '-z':
//       // Handle timezone option
//       options.timezone = value;
//       break;
//     case '-d':
//       // Handle day option
//       options.day = Number(value);
//       break;
//     case '-v':
//       // Handle verbose option
//       options.verbose = true;
//       break;
//     case '-j':
//       // Handle JSON option
//       options.json = true;
//       break;
//     default:
//       // Handle unknown option
//       console.error(`Unknown option: ${option}`);
//       showHelp();
//       break;
//   }
// }

// // Use parsed options
// console.log(options);

// const latitude  = options.latitude;
// const longitude= options.longitude;
// const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&daily=precipitation_hours&timezone=" + timezone;

// const response =  fetch(url);
// const data =  response.json();

// // https://api.open-meteo.com/v1/forecast?latitude=35.92&longitude=-79.05&daily=precipitation_hours&timezone=America/New_York

