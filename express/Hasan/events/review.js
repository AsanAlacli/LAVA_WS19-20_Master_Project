
function degreeUpdate()
{
    var degreeName = document.getElementById('program');

    var degreeNameValue = degreeName.value;

    var req=
    {
        query:'DEGREE',
        degreeName:degreeNameValue
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/review',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        {
            programName=document.getElementById('programName');
            console.log("response "+res);
            programName.innerHTML = '';

            for(let i=0;i<res.length;i++)
            {
                var item = document.createElement("option");
                item.text= res[i];
                programName.add(item);
            }
           // console.log(res);
        }
    })

}

function updateClicked()
{
    getAverageSemesterQuery();
    reasonsNotAttendingQuery();
}

function getAverageSemesterQuery()
{
    var program=document.getElementById('program');
    var programName = document.getElementById('programName');
    

    var req=
    {
        query:'AvgSem',
        program:program.value,
        programName:programName.value,
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/review',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        { 
           console.log(res);
           avgSemBarChart(res,'chart');            
        }
    })
}


function avgSemBarChart(res,container)
{
    Highcharts.chart(container, {
        chart: {
            type: 'column'
        },
        title: {
            text:'Average Semesters '
        },
        subtitle: {
            text: 'Students Usually Take or In'
        },
        xAxis: {
            categories: [
                
                ''
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            max:8,
            title: {
                text: 'No. of Semesters'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Average Semesters',    
            data:[res.semesters]
        }]
    });

}

function reasonsNotAttendingQuery()
{
    var program=document.getElementById('program');
    var programName = document.getElementById('programName');
    

    var req=
    {
        query:'REASONS',
        program:program.value,
        programName:programName.value,
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/review',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        { 
           console.log(res);
           reasonsNotAttendingPieChart(res,'chart2');            
        }
    })
}
function reasonsNotAttendingPieChart(res,container)
{
    Highcharts.chart(container, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Common Reasons for Not Attending Lectures'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Impact',
            colorByPoint: true,
            data: [{
                name: res.reason1.name,
                y: res.reason1.count
                
            }, {
                name: res.reason2.name,
                y: res.reason2.count
            }, {
                name: res.reason3.name,
                y: res.reason3.count
            }, {
                name: res.reason4.name,
                y: res.reason4.count
            }, {
                name: res.reason5.name,
                y: res.reason5.count,
                sliced: true,
                selected: true
            }]
        }]
    });
}