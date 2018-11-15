[![Build Status](https://travis-ci.com/zaneobrien/SurfFinder.svg?branch=master)](https://travis-ci.com/zaneobrien/SurfFinder)

# SurfFinder
> Generate beautiful charts to evaluate surf conditions in San Diego

## API Key
Unfortunately, this app requires an API key and its kind of a hassle to obtain one. You have to visit [Magic Seaweed](https://magicseaweed.com/developer/api) and then email `general@magicseaweed.com` asking for a key. In the email you'll have to ask for access to 'Grandview' because this app is hardcoded to view data from the surf spot [Grandview](https://www.google.com/maps/place/Grandview+Surf+Beach/@33.0765706,-117.3102921,15z/data=!4m5!3m4!1s0x0:0x3b56e251f78ef!8m2!3d33.0765706!4d-117.3102921) which is located in Encinitas, CA.

## Demo
In order to view a demo, visit [www.zaneobrien.com/SurfFinder/Surf.html](http://www.zaneobrien.com/SurfFinder/Surf.html)

## Details
Presumably, this data can be used a general weather forecast for Surf/Ocean conditions in San Diego because even though this data is queried for the beach 'Grandview' the information wont change significantly for all of San Diego. Basically if theres big waves breaking in North San Diego, there will be big waves breaking in South San Diego.

## Local Build Setup
``` bash
# install dependencies
npm install

# serve at localhost:5000
node build/dev-server.js
```

## License
MIT
