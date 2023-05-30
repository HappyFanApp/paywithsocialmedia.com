$(function() {
    "use strict";

 	var options = {
			series: [{
				name: 'Instagram',
				data: [0.0279, 0.6980, 0.0599, 0.0120, 0.0289, 0.299]
			}, {
				name: 'Twitter',
				data: [0.0798,0.3990, 0.0799, 0.0320, 0.0798, 0.0589]
			}, {
				name: 'TikTok',
				data: [0.0399,0.4990,0.0629, 0.0101, 0.0349, 0.0399]
			}, {
				name: 'Facebook',
				data: [0.0798, 0.4990, 0.0399, 0.0190, 0.0419, 0.0998]
			}],
			chart: {
				foreColor: 'rgba(255, 255, 255, 0.65)',
				type: 'bar',
				height: 600,
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false
                        }
                },
                export:{
                    svg:{
                        filename: "SocialMediaValueAssets",
                      }
                }   
			},
			plotOptions: {
				bar: {
					horizontal: true,
					columnWidth: '35%',
					endingShape: 'rounded'
				},
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent']
			},
			title: {
				text: 'Social media asset value comparative',
				align: 'left',
				style: {
					fontSize: '14px'
				}
			},
			colors: ["#fff", 'rgba(255, 255, 255, 0.50)', 'rgba(255, 255, 255, 0.20)'],
			xaxis: {
				categories: ['Likes','Comments','Followers','Mentions','Shares','Saves'],
			},
			yaxis: {
				title: {
					text: '$ per unit'
				}
			},
			fill: {
				opacity: 1
			},
			grid: {
				show: true,
				borderColor: 'rgba(255, 255, 255, 0.12)',
				strokeDashArray: 4,
			},
			tooltip: {
				theme: 'dark',
				y: {
					formatter: function (val) {
						return "$ " + val + " per unit"
					}
				}
			}
		};
		var chart = new ApexCharts(document.querySelector("#social-coin"), options);
		chart.render();
	
		
		
   });	 
   