const API_KEY = "84001e540eb6e20bee6851c4917f560a";
//const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const MAGICSEAWEED_URL = "https://magicseaweed.com/api/" + API_KEY + "/forecast/?spot_id=4564units=us&fields=timestamp,swell.maxBreakingHeight,wind.speed";
//const URL = PROXY_URL + MAGICSEAWEED_URL;
const URL = MAGICSEAWEED_URL;


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000),
      months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      year = a.getFullYear(),
      month = months[a.getMonth()],
      date = a.getDate(),
      hh = a.getHours(),
		  h = hh,
		  min = ('0' + a.getMinutes()).slice(-2),		// Add leading 0.
		  ampm = 'AM',
		  time;

  	if (hh > 12) {
  		h = hh - 12;
  		ampm = 'PM';
  	} else if (hh === 12) {
  		h = 12;
  		ampm = 'PM';
  	} else if (hh == 0) {
  		h = 12;
    }
    time = month + ' ' + date + ' ' + year + ' ' + h + ':' + min + ' ' + ampm;
    return time;
}

function getTimestamps(obj) {
    var array = [];
    for (var i = 0;i< obj.length;i++) {
        array[i] = timeConverter(obj[i].timestamp);
    }
    return array;
}

function getSurfHeight(obj) {
    var array = [];
    for (var i = 0;i< obj.length;i++) {
            array[i] = obj[i].swell.maxBreakingHeight;
    }
    return array;
}

function getWind(obj) {
    var array = [];
    for (var i = 0;i< obj.length;i++) {
            array[i] = obj[i].wind.speed;
    }
    return array;
}


Vue.component('line-chart', {
    extends: VueChartJs.Line,
    props: {
        chartData: {
        type: Array | Object,
        required: true
        },
        chartLabels: {
        type: Array,
        required: true
        },
        chartWind: {
        type: Array | Object,
        required: true
        }
    },

  data () {
  return {
    gradient: null,
    gradient2: null,
    options: {
      showScale: true,
      scales: {
        yAxes: [{
          ticks: {
            //some low value so the max gets updated to highest value
            suggestedMax: 8,
            stepSize : 1,
            beginAtZero: true,
          },
        }],
        xAxes: [ {
          gridLines: {
            display: false,
            color: '#EEF0F4'
          }
        }]
      },
      tooltips: {
        backgroundColor: '#4F5565',
        titleFontStyle: 'normal',
        titleFontSize: 18,
        bodyFontFamily: "'Proxima Nova', sans-serif",
        cornerRadius: 3,
        bodyFontColor: '#20C4C8',
        bodyFontSize: 14,
        xPadding: 14,
        yPadding: 14,
        displayColors: false,
        mode: 'index',
        intersect: false,
      },
      legend: {
        display: true
      },
      responsive: true,
      maintainAspectRatio: false
    }
};
},
    mounted () {
       this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
       this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

       this.gradient.addColorStop(0, 'rgba(96, 222, 255, 0.5)');
       this.gradient.addColorStop(0.5, 'rgba(96, 222, 255, 0.25)');
       this.gradient.addColorStop(1, 'rgba(96, 222, 255, 0)');

       this.gradient2.addColorStop(0, 'rgba(86, 232, 118, 0.9)');
       this.gradient2.addColorStop(0.5, 'rgba(86, 232, 118, 0.25)');
       this.gradient2.addColorStop(1, 'rgba(86, 232, 118, 0)');

        this.renderChart({
            labels: this.chartLabels,
            datasets: [{
                label: 'Wave height (ft)',
                backgroundColor: this.gradient2, //'#89E8D5'
                data: this.chartData
            },
            {
                label: 'Wind speed (mph)',
                backgroundColor: this.gradient, //#DCFFDA'
                data: this.chartWind
            }]
        }, this.options);
    } // end mounted

}); // end Vue Component

var vm = new Vue({
  el: '.app',
  data: {
    results: [],
    labels: [],
    loaded: false,
    wind:[]
  },
  mounted () {
      this.requestData();
  },
  methods: {
      requestData () {
          axios.get(URL).then(response => {
              //this.results = response.data; // the raw data
              this.labels = getTimestamps(response.data);
              this.results = getSurfHeight(response.data);
              this.wind = getWind(response.data);
              this.loaded = true;
            })
            .catch(err => {
            });
     }
  }

}); // end vm
