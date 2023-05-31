$(function() {
    "use strict";

    var options = {
		series: [{
            name: 'Total',
			data: [
                "2958",
                "2514",
                "2000",
                "2000",
                "1309",
                "1051",
                "931",
                "715",
                "700",
                "635",
                "626",
                "584",
                "574",
                "556",
                "445"
            ]
		}],
		chart: {
			foreColor: 'rgba(255, 255, 255, 0.65)',
			type: 'bar',
			height: 350
		},
		colors: ["#fff"],
		plotOptions: {
			bar: {
				horizontal: true,
                endingShape: 'rounded'
			}
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
					return val + " millions users"
				}
			}
		},
		dataLabels: {
			enabled: false
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
            "FACEBOOK",
            "YOUTUBE2",
            "WHATSAPP",
            "INSTAGRAM",
            "WECHAT",
            "TIKTOK",
            "FB MESSENGER2",
            "DOUYIN3",
            "TELEGRAM'",
            "SNAPCHAT2",
            "KUAISHOU",
            "SINA WEIBO'",
            "QQ",
            "TWITTER2",
            "PINTEREST"
        ],
		}
	};
		var chart = new ApexCharts(document.querySelector("#social-world"), options);
		chart.render();
	
		
		
});
