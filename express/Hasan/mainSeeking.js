$(document).ready(function(){
    $('.sidebarBtn').click(function(){
        $('.sidebar').toggleClass('active');
        $('.content').toggleClass('contentActive');
    })
})




// grafik - 1

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawMultSeries);

function drawMultSeries() {
    var data = google.visualization.arrayToDataTable([
        ['Course', '%', { role: 'style' }],
        ['data1', 70, '#b87333'],            // RGB value
        ['data2', 65, 'silver'],            // English color name
        ['data3', 80, 'gold'],
        ['data4', 50, 'color: #e5e4e2' ], // CSS-style declaration
        ['data5', 70, '#b87333'],            // RGB value
        ['data6', 65, 'green'],            // English color name
        ['data7', 80, 'blue'],
        ['data8', 50, 'pink' ], // CSS-style declaration
     ]);
      var options = {
        title: 'Success rate .......',
        chartArea: {width: '60%'},
        hAxis: {
          title: 'success rate %',
          minValue: 0,
          maxValue: 100
        },
        vAxis: {
          title: 'courses'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }



    // grafik - 2

    google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Country', 'Popularity'],
          ['Germany', 200],
          ['United States', 300],
          ['Brazil', 400],
          ['Canada', 500],
          ['France', 600],
          ['RU', 700],
          ['TR', 600]
        ]);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }