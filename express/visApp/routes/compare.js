var express = require('express');
var router = express.Router();
var path = require('path');
var fileReaderWriter = require('./backendJS/fileReader.js');
var courseComparison = require('./backendJS/courseOverview.js');
var iseGeneralOverview = require('./backendJS/iseOverview.js');
var programLM = require('./backendJS/programOverview.js');

var data_str = "./routes/CSV/out.csv";

/* router.get('/',function(req,res){
    res.send('Backend');


}); */
router.post('/',function(req,res)
{

    var request=req.body;
    console.log(req.body);
    fileReaderWriter.getAllRows(data_str,function(allRows){
        
    if(request.query == 'COMPARE')
    {
        var merged={};
        courseComparison.getSuggestedLearningMethods(allRows,request.degree,request.progName,request.course1,function(course1Data){
            merged['course1'] = course1Data;
        });
            courseComparison.getSuggestedLearningMethods(allRows,request.degree,request.progName,request.course2,function(course2Data){
            merged['course2'] = course2Data;
        });
       // console.log(merged);
        res.send(merged);
    }
    else if(request.query=='CompareAdoptedLM')
    {
       // console.log(request);
        var merged={};
        courseComparison.getAdoptedLearningMethodology(allRows,request.degree,request.progName,request.course1,function(course1Data){
            merged['course1']=course1Data;
        })
        courseComparison.getAdoptedLearningMethodology(allRows,request.degree,request.progName,request.course2,function(course2Data){
            merged['course2']=course2Data;
        })
        
        //console.log(merged);
        res.send(merged);
    }
    else if(request.query=='PASSFAIL')
    {
        //console.log(request);
        var merged={};
        courseComparison.coursePassedFailed(allRows,request.degree,request.progName,request.course1,function(course1Data){
            merged['course1']=course1Data;
        })
        courseComparison.coursePassedFailed(allRows,request.degree,request.progName,request.course2,function(course2Data){
            merged['course2']=course2Data;
        })
        
      //  console.log(merged);
        res.send(merged);
    }
    else if(request.query=='HELPFUL')
    {
        var merged={};
        courseComparison.isCourseHelpful(allRows,request.degree,request.progName,request.course1,function(course1Data){
            merged['course1']=course1Data;
        })
        courseComparison.isCourseHelpful(allRows,request.degree,request.progName,request.course2,function(course2Data){
            merged['course2']=course2Data;
        })
        
      //  console.log(merged);
        res.send(merged);
    }
    else if(request.query=="DEGREE")
    {
        iseGeneralOverview.getUniqueDegreeProgramList(allRows,request.degreeName,function(progNames){
      //  console.log(progNames);
        res.send(progNames);
        })
    }
    else if(request.query=="STUDY_PROGRAM")
    {
        iseGeneralOverview.getUniqueCoursesList(allRows,request.programName,function(courseNames){
//        console.log(courseNames);
        res.send(courseNames);
        })
    }
    else if(request.query=='DIFFICULT')
    {
        //console.log(request);
        var merged={};
        courseComparison.courseDifficulty(allRows,request.degree,request.progName,request.course1,function(course1Data){
            merged['course1']=course1Data;
        })
        courseComparison.courseDifficulty(allRows,request.degree,request.progName,request.course2,function(course2Data){
            merged['course2']=course2Data;
        })
        
//        console.log(merged);
        res.send(merged);
    }
    else if(request.query=='GPA')
    {
        console.log(request);
        var merged={};
        courseComparison.getGpaAndAverageGpa(allRows,request.degree,request.progName,request.course1,function(course1Data){
            merged['course1']=course1Data;
        })
        courseComparison.getGpaAndAverageGpa(allRows,request.degree,request.progName,request.course2,function(course2Data){
            merged['course2']=course2Data;
        })
        
        console.log(merged);
        res.send(merged);
    }
    
});

});

module.exports = router;