
var Module = require('./secrets');
var JsonObj = require('./spots');
const APIKEY = Module.KEY;
const maxSwell = [];
const minSwell = [];
const timeStamp = [];


const MSW = require('msw-client');
const MswClient = new MSW({
    apikey: APIKEY,
    spot_id: 4564, // grandview:4564 oceanbeach:4212
    units: 'us',
    fields:['localTimestamp','swell.minBreakingHeight','swell.maxBreakingHeight'],
});



MswClient.request().then(data => {
    function getTime(spot) {
        for(x in spot) {
            timeStamp[x] = spot[x]["localTimestamp"];
        }
        return timeStamp;
    }

    function getMinSwell(spot) {
        for (x in spot) {
            minSwell[x] = spot[x]["swell"]["minBreakingHeight"];
        }
        return minSwell;
    }

    function getMaxSwell(spot) {
        for (x in spot) {
            maxSwell[x] = spot[x]["swell"]["maxBreakingHeight"];
        }
        return maxSwell;
    }

const tester = getMaxSwell(data);
console.log(tester);

const tester1 = getMinSwell(data);
console.log(tester1);

const tester2 = getTime(data);
console.log(tester2);


  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
}).catch(err => {
  console.log(err);
});
