import APIKEY from secrets

//TODO:use msw-client to get spot live information for each spot
const MSW = require('msw-client');
const MswClient = new MSW({
    apikey: APIKEY,
    spot_id: 2 // must be a number
});

MswClient.request().then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
