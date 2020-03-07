

function onLoad()
{
    degreeUpdate();
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
        url:'http://localhost:3000/compare',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        {
            programName=document.getElementById('programName');
 //           console.log("response "+res);
            programName.innerHTML = '';


            for(let i=0;i<res.length;i++)
            {
                var item = document.createElement("option");
                item.text= res[i];
                programName.add(item);
            }
            courseUpdate();
           // console.log(res);
        }
    })

}

function averageGpa()
{
    var degreeName = document.getElementById('program');
    var courseName1=document.getElementById('courseName1');
    var courseName2=document.getElementById('courseName2');
    var programName = document.getElementById('programName');
    
    var req=
    {
        query:'GPA',
        degree:degreeName.value,
        progName:programName.value,
        course1:courseName1.value,
        course2:courseName2.value
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/compare',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        {
            console.log(res);
            courseGpaAverageBarChart(res,'barTcpa');
        }
    })
}
function courseUpdate()
{
    var programName = document.getElementById('programName');

    var programNameValue = programName.value;

    var req=
    {
        query:'STUDY_PROGRAM',
        programName:programNameValue
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/compare',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        {
            courseName1=document.getElementById('courseName1');
            courseName2=document.getElementById('courseName2');

//            console.log("response "+res);
            courseName1.innerHTML = '';
            courseName2.innerHTML = '';


            for(let i=0;i<res.length;i++)
            {
                var item = document.createElement("option");
                item.text= res[i];
                courseName1.add(item);
                var item1 = document.createElement("option");
                item1.text= res[i];
                courseName2.add(item1);
            }
           // console.log(res);
        }
    })

}
function isCourseDifficult()
{
    var degreeName = document.getElementById('program');
    var courseName1=document.getElementById('courseName1');
    var courseName2=document.getElementById('courseName2');
    var programName = document.getElementById('programName');
    
    var req=
    {
        query:'DIFFICULT',
        degree:degreeName.value,
        progName:programName.value,
        course1:courseName1.value,
        course2:courseName2.value
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/compare',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        {
  //          console.log(res);
            courseDifficultyBarChart(res,'barDifficulty');
     
        }
    })
}
function isCourseHelpful()
{
    var degreeName = document.getElementById('program');
    var courseName1=document.getElementById('courseName1');
    var courseName2=document.getElementById('courseName2');
    var programName = document.getElementById('programName');
    
    var req=
    {
        query:'HELPFUL',
        degree:degreeName.value,
        progName:programName.value,
        course1:courseName1.value,
        course2:courseName2.value
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/compare',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        {
     //       console.log(res);
            course1HelpfulPieChart(res,'pieLeft2');
            course2HelpfulPieChart(res,'pieRight2');     
        }
    })
}
function passFailed()
{
    var degreeName = document.getElementById('program');
    var courseName1=document.getElementById('courseName1');
    var courseName2=document.getElementById('courseName2');
    var programName = document.getElementById('programName');
    
    var req=
    {
        query:'PASSFAIL',
        degree:degreeName.value,
        progName:programName.value,
        course1:courseName1.value,
        course2:courseName2.value
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/compare',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        {
           // console.log(res);
            passFailedPieChartCourse1(res,'pieLeft1');
            passFailedPieChartCourse2(res,'pieRight1');     
        }
    })
}
function adoptedLMComparison()
{
    var degreeName = document.getElementById('program');
    var courseName1=document.getElementById('courseName1');
    var courseName2=document.getElementById('courseName2');
    var programName = document.getElementById('programName');
    

    var req=
    {
        query:'CompareAdoptedLM',
        degree:degreeName.value,
        progName:programName.value,
        course1:courseName1.value,
        course2:courseName2.value
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/compare',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        {
            /* var sugLMCourse1 = document.getElementById("sugLMCourse1");
            var sugLMCourse2 = document.getElementById("sugLMCourse2");
            sugLMCourse1.innerHTML=courseName1.value;
            sugLMCourse2.innerHTML=courseName2.value; */
            
           // console.log(res);
            adoptedLearningMethodCourse1BarChart(res,'barLeft2');
            adoptedLearningMethodCourse2BarChart(res,'barRight2');
            
        }
    })
}
function suggestedLMComparison()
{
    var degreeName = document.getElementById('program');
    var courseName1=document.getElementById('courseName1');
    var courseName2=document.getElementById('courseName2');
    var programName = document.getElementById('programName');
    

    var req=
    {
        query:'COMPARE',
        degree:degreeName.value,
        progName:programName.value,
        course1:courseName1.value,
        course2:courseName2.value
    }
    $.ajax({
        type:'post',
        url:'http://localhost:3000/compare',        
        contentType:'application/json',
        data:JSON.stringify(req),
          
        success:function(res)
        {
            var sugLMCourse1 = document.getElementById("sugLMCourse1");
            var sugLMCourse2 = document.getElementById("sugLMCourse2");
            sugLMCourse1.innerHTML=courseName1.value;
            sugLMCourse2.innerHTML=courseName2.value;
            
           // console.log(res);
            suggestedLearningMethodCourse1BarChart(res,'barLeft1');
            suggestedLearningMethodCourse2BarChart(res,'barRight1');
            
        }
    })
}
function compareBtnClicked()
{
    suggestedLMComparison();
    adoptedLMComparison();
    passFailed();
    isCourseHelpful();
    isCourseDifficult();
    averageGpa();
}

function suggestedLearningMethodCourse1BarChart(res,container)
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
            data:[res.course1.lecturesAverage]
        }, {
            name: 'Attending Excercises',
            data: [res.course1.excerciseAverage]
    
        },
        {
            name: 'Online Study',
            data: [res.course1.onlineStudyAverage]
    
        },
        {
            name: 'Group Study',
            data: [res.course1.groupStudyAverage]
        }]
    });

}

function suggestedLearningMethodCourse2BarChart(res,container)
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
            data:[res.course2.lecturesAverage]
        }, {
            name: 'Attending Excercises',
            data: [res.course2.excerciseAverage]
    
        },
        {
            name: 'Online Study',
            data: [res.course2.onlineStudyAverage]
    
        },
        {
            name: 'Group Study',
            data: [res.course2.groupStudyAverage]
        }]
    });

}

function adoptedLearningMethodCourse1BarChart(res,container)
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
            data:[res.course1.adoptedLecturesAverage]
        }, {
            name: 'Attending Excercises',
            data: [res.course1.adoptedExcercisedAverage]
    
        },
    ]
    });

}
function adoptedLearningMethodCourse2BarChart(res,container)
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
            data:[res.course2.adoptedLecturesAverage]
        }, {
            name: 'Attending Excercises',
            data: [res.course2.adoptedExcercisedAverage]
    
        },
    ]
    });

}

function passFailedPieChartCourse1(res,container)
{
    Highcharts.chart(container, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: "Students' Success Ratio"
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
            name: 'Status',
            colorByPoint: true,
            data: [{
                name: 'Passed',
                y: res.course1.passedStudents,
                sliced: true,
                selected: true
            }, {
                name: 'Failed',
                y: res.course1.failedStudents
            }]
        }]
    });
}

function passFailedPieChartCourse2(res,container)
{
    Highcharts.chart(container, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: "Students' Success Ratio"
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
            name: 'Status',
            colorByPoint: true,
            data: [{
                name: 'Passed',
                y: res.course2.passedStudents,
                sliced: true,
                selected: true
            }, {
                name: 'Failed',
                y: res.course2.failedStudents
            }]
        }]
    });
}

function course1HelpfulPieChart(res,container)
{
    Highcharts.chart(container, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: "Is course being informative and helpful in Career"
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
            name: 'Status',
            colorByPoint: true,
            data: [{
                name: 'was Helpful',
                y: res.course1.yes,
                sliced: true,
                selected: true
            }, {
                name: 'was Not Helpful ',
                y: res.course1.no
            },
            {   name: 'May be ',
                y: res.course1.mayBe
            }
        ]
        }]
    });
}
function course2HelpfulPieChart(res,container)
{
    Highcharts.chart(container, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Is course being informative and helpful in Career'
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
            name: 'Status',
            colorByPoint: true,
            data: [{
                name: 'was Helpful',
                y: res.course2.yes,
                sliced: true,
                selected: true
            }, {
                name: 'was Not Helpful ',
                y: res.course2.no
            },
            {
                name: 'May be',
                y: res.course2.mayBe
            }]
        }]
    });
}

function courseDifficultyBarChart(res,container)
{
    Highcharts.chart(container, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Difficulty Level'
        },
        subtitle: {
            text: 'Rated by Students'
        },
        xAxis: {
            categories: [
                'Courses',
            
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            max:10,
            title: {
                text: 'Difficulty'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
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
            name: res.course1.course,
            data: [res.course1.courseDifficultyAverage]
    
        }, {
            name: res.course2.course,
            data: [res.course2.courseDifficultyAverage]
    
        }]
    });
}

function courseGpaAverageBarChart(res,container)
{
    Highcharts.chart(container, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Earned GPAs'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Courses',
            
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            max:5,
            title: {
                text: 'GPA'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
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
            name: res.course1.course,
            data: [res.course1.averageGpa]
    
        }, {
            name: res.course2.course,
            data: [res.course2.averageGpa]
    
        }]
    });
}