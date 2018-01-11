//Initial Commit Outline

//TODO:use msw-client to get spot live information for each spot
const MSW = require('msw-client');
const MswClient = new MSW({
    apikey: 'YOUR_API_KEY',
    spot_id: 2 // must be a number
});
