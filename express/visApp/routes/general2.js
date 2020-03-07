var express = require('express');
var router = express.Router();
var path = require('path');
var iseOverviewFinder= require('./backendJS/iseOverview.js');
var fileReaderWriter = require('./backendJS/fileReader.js');
var programOverview = require('./backendJS/programOverview.js');
var data_str = "./routes/CSV/out.csv";

router.post('/',function(req,res){

    var request=req.body;
    

    fileReaderWriter.getAllRows(data_str,function(allRows){
        if(request.query=="DEGREE")
        {
            console.log(request);
            iseOverviewFinder.getUniqueDegreeProgramList(allRows,request.degreeName,function(programNames){
           //console.log(programNames);
            res.send(programNames);
            })
        }
        else if(request.query=="UsedLM")
        {
            console.log(request);
            programOverview.getUsedLearningMethodSortedByProgramProgramNameAndNationality(allRows,request.program,request.programName,request.nationality,function(programNames){
            //console.log(programNames);
            res.send(programNames);
            })
        }
        else if(request.query=="SugLM")
        {
            console.log(request);
            programOverview.getSuggestedLearningMethodsSortedByProgramProgramNameAndNationality(allRows,request.program,request.programName,request.nationality,function(programNames){
            //console.log(programNames);
            res.send(programNames);
            })
        }


        
    })
});



router.get('/',function(req,res){
    fileReaderWriter.getAllRows(data_str,function(allRows){
        iseOverviewFinder.getUniqueNationalities(allRows,function(data){
            console.log(data);
            res.send(data);
        })
    })
})




module.exports = router;