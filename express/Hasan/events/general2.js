function onLoad()
{
    nationalityUpdate();
}
function updateClicked()
{
    usedLearningMethodQuery();
    suggestedLearningMethodQuery();
}
function nationalityUpdate()
{
    var nationality = document.getElementById('nationality');
    $.get('http://localhost:3000/general2',function(res)
        {
            nationality.innerHTML=''
            var item = document.createElement("option");
            item.text= "All";
            nationality.add(item);
            for(let i=0;i<res.length;i++)
            {
                var item = document.createElement("option");
                item.text= res[i];
                nationality.add(item);
            }
           // courseUpdate();
           // console.log(res);
        }
    )

}
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
        url:'http://localhost:3000/general2',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        {
            programName=document.getElementById('programName');
            console.log("response "+res);
            programName.innerHTML = '';

            var item = document.createElement("option");
            item.text= "All";
            programName.add(item);
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

function usedLearningMethodQuery()
{
    var nationality = document.getElementById('nationality');
    var program=document.getElementById('program');
    var programName = document.getElementById('programName');
    

    var req=
    {
        query:'UsedLM',
        nationality:nationality.value,
        program:program.value,
        programName:programName.value,
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/general2',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        { 
           // console.log(res);
           usedLearningMethodBarChart(res,'chart1');            
        }
    })
}
function usedLearningMethodBarChart(res,container)
{
    {
        Highcharts.chart(container, {
            chart: {
                type: 'column'
            },
            title: {
                text:'Adopted Learning Method'
            },
            subtitle: {
                text: 'By Students'
            },
            xAxis: {
                categories: [
                    
                    'Learning Methods'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                max:100,
                title: {
                    text: 'Percentage'
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
                name: 'Attending Lectures',    
                data:[res.adoptedLecturesAverage]
            }, {
                name: 'Attending Excercises',
                data: [res.adoptedExcercisedAverage]
        
            }]
        });
    
    }
}

function suggestedLearningMethodQuery()
{
    var nationality = document.getElementById('nationality');
    var program=document.getElementById('program');
    var programName = document.getElementById('programName');
    

    var req=
    {
        query:'SugLM',
        nationality:nationality.value,
        program:program.value,
        programName:programName.value,
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/general2',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        { 
           // console.log(res);
           suggestedLearningMethodBarChart(res,'chart2');            
        }
    })
}
function suggestedLearningMethodBarChart(res,container)
{
    Highcharts.chart(container, {
        chart: {
            type: 'column'
        },
        title: {
            text:'Suggested Learning Method'
        },
        subtitle: {
            text: 'By Students'
        },
        xAxis: {
            categories: [
                
                'Learning Methods'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            max:100,
            title: {
                text: 'Percentage'
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
            name: 'Attending Lectures',    
            data:[res.lecturesAverage]
        }, {
            name: 'Attending Excercises',
            data: [res.excerciseAverage]
    
        },
        {
            name: 'Online Study',
            data: [res.onlineStudyAverage]
    
        },
        {
            name: 'Group Study',
            data: [res.groupStudyAverage]
        }]
    });

}