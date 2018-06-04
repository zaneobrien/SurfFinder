const APIKEY = "xxxxxxxxxxxxx";
const url = "http://magicseaweed.com/api/" + APIKEY + "/forecast/?spot_id=4564units=us&fields=localTimestamp,swell.maxBreakingHeight";

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

function getTimestamps(obj) {
    var array = [];
    for (var i = 0;i< obj.length;i++) {
        array[i] = timeConverter(obj[i]["localTimestamp"]);
    }
    return array
}

function getSurfHeight(obj) {
    var array = [];
    for (var i = 0;i< obj.length;i++) {
            array[i] = obj[i]["swell"]["maxBreakingHeight"];
    }
    return array
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
        }
    },

    data () {
  return {
    gradient: null,
    options: {
      showScale: true,
      scales: {
        yAxes: [{
          ticks: {
            max:8,
            stepSize : 1,
            beginAtZero: true,
          },
          gridLines: {
            display: true,
            color: '#EEF0F4',
            borderDash: [5, 15]
          }
        }],
        xAxes: [ {
          gridLines: {
            display: true,
            color: '#EEF0F4',
            borderDash: [5, 15]
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
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }
},
    mounted () {
        this.renderChart({
            labels: this.chartLabels,
            datasets: [{
                label: 'Wave height',
                backgroundColor: '#89E8D5',
                data: this.chartData
            }]
        }, this.options);
    } // end mounted

}) // end Vue Component

var vm = new Vue({
  el: '.app',
  data: {
    results: [],
    labels: [],
    loaded: false
  },
  mounted () {
      this.requestData();
  },
  methods: {
      requestData () {
          axios.get(url).then(response => {
              //this.results = response.data; // the raw data
              this.labels = getTimestamps(response.data);
              this.results = getSurfHeight(response.data);
              this.loaded = true;
            })
            .catch(err => {
            })
     }
  }

}) // end vm
