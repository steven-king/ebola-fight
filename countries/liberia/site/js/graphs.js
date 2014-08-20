function createCharts(){
    $('#country-graph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Ebola by Country'
        },
        xAxis: {
            categories: ['Liberia', 'Guinea', 'Sierra Lieon']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Cases and Deaths'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -70,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Deaths',
            data: [282, 363, 286]
        }, {
            name: 'Cases',
            data: [516, 495, 691]
        }]
    });
};