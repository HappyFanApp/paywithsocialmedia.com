$(function() {
    "use strict";

    var options = {
		series: [{
            name: 'Used',
			data: [
                "47.1%",
                "36.2%",
                "34.2%",
                "30.3%",
                "27.3%",
                "28.8%",
                "25.9%",
                "23.7%",
                "23.4%",
                "23.0%",
                "22.7%",
                "22.0%",
                "21.8%",
                "21.4%",
                "21.3%",
                "20.8%",
                "20.3%"
            ]
		}],
		chart: {
			foreColor: 'rgba(255, 255, 255, 0.65)',
			type: 'bar',
			height: 400
		},
		colors: ["#fff"],
		plotOptions: {
			bar: {
				horizontal: true,
                endingShape: 'rounded',
                dataLabels: {
                    position: 'bottom'
                },
			}
		},
		grid: {
			show: true,
			borderColor: 'rgba(255, 255, 255, 0.12)',
			strokeDashArray: 4,
		},
		tooltip: {
			theme: 'dark',
            x: {
                show: true
            },
			y: {
				formatter: function (val) {
					return val + "%"
				}
			}
		},
		dataLabels: {
            enabled: true,
            enabledOnSeries: undefined,
            textAnchor: 'start',
            distributed: false,
            style: {
            colors: ['#678'],
            fontSize: '10px'
            },
            formatter: function (val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":        " + val + "%"
            },
            offsetX: 0,
            offsetY: 0,
            dropShadow: {
              enabled: false,
              color:'#ggg'
            }
        },
        title: {
            text: 'The world´s most used social media platform',
            align: 'left',
            style: {
                fontSize: '14px'
            }
        },
		xaxis: {
			categories: [
                "KEEPING IN TOUCH WITH FRIENDS AND FAMILY",
                "FILLING SPARE TIME",
                "READING NEWS STORIES",
                "FINDING CONTENT (E.G. ARTICLES, VIDEOS)",
                "SEEING WHAT'S BEING TALKED ABOUT",
                "FINDING INSPIRATION FOR THINGS TO DO AND BUY",
                "FINDING PRODUCTS TO PURCHASE",
                "WATCHING LIVE STREAMS",
                "SHARING AND DISCUSSING OPINIONS WITH OTHERS",
                "MAKING NEW CONTACTS",
                "SEEING CONTENT FROM YOUR FAVOURITE BRANDS",
                "WORK-RELATED NETWORKING OR RESEARCH",
                "WATCHING OR FOLLOWING SPORTS",
                "FINDING INTEREST GROUPS",
                "POSTING ABOUT YOUR LIFE",
                "FOLLOWING CELEBRITIES OR INFLUENCERS",
                "AVOIDING MISSING OUT ON THINGS (FOMO)"
        ],
		},
        yaxis: {
        labels: {
            show: false
        }
        }
	};
    
   /*
    var options = {
        series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
        chart: {
        type: 'bar',
        height: 380
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          },
        }
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
        '#f48024', '#69d2e7'
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff']
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
          'United States', 'China', 'India'
        ],
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
          text: 'Custom DataLabels',
          align: 'center',
          floating: true
      },
      subtitle: {
          text: 'Category Names as DataLabels inside bars',
          align: 'center',
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        }
      }
      };
      */
		var chart = new ApexCharts(document.querySelector("#social-used-reason"), options);
		chart.render();
	
		
		
});
