var dataParser = require('./parser.js');
var fileReader = require('./vis_functions/fileReader.js')
var iseOverview = require('./vis_functions/iseOverview.js')

dataParser.readFile();
fileReader.getAllRows(function(allRows){
 //   console.log(allRows);
    iseOverview.iseGeneralOverview(allRows,function(iseInformation){
        console.log(iseInformation);

        
        /* for(let i=0;i<iseInformation.iseNationalitiesList.length;i++)
        {
            console.log(iseOverview.iseNationalitiesList[i]);
        } */
//    iseOverview.getNationalityWiseStudents(allRows,'Iran','Masters',function (iseNationalityProgramWiseStudents){
//        console.log(iseNationalityProgramWiseStudents);
//    })

    });
    
})
