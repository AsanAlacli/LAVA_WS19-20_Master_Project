
function masterDonut()
{
    console.log('data');
  
}
function iseGeneralOverview(allRows,callback)
{
    var males=0,females=0,otherGender=0;
    var sLectures,sExcersices,sOnline,sGroup;   // S stands for Suggested Learning Medium
    var uLecturesAverage=0.0,uExcercisesAverage=0.0,uLecturesRowCount=0,uExcercisesRowCount=0;  // U stands for Used Learning Medium
    var bachelorsUniqNationalitiesCount,mastersUniqNationalitiesCount ;
    var uniqBachelorNationalitiesList = [];var uniqMasterNationalitiesList=[];
    var bachelorsIseStudentsCount =0; var mastersIseStudentsCount=0;
    var uniqBachelorDegreesList = [];var uniqMasterDegreesList= [];
    var nationalityWiseStudents = [];   // Moving to other seperate function
    var iseUniqNationalitiesList = []
    var iseUniqueNationalitiesCount;

    var uLectPerctList = [];
    var uExcPercList = [];


    for(let i=0;i<allRows.length;i++)
    {

        ////////////////////////////////GENDER COUNT////////////////////////////
        if (allRows[i].Gender == 'Male'){
            //console.log(allRows[i].Gender);
            males++;
        }
        else if(allRows[i].Gender=='Female'){
            females++;
        }
        else{
            otherGender++;
        }
        ///////////////////////////////////////////////////////////////////////

        ////////DEGREE NAMES, NATIONALITIES,STUDENTS (Bach & Mast) COUNT/////////
        if(allRows[i].Program == 'Bachelors'){
            //console.log(allRows[i].Program);
            bachelorsIseStudentsCount++;
            uniqBachelorDegreesList.push(allRows[i].ProgramName);
            uniqBachelorNationalitiesList.push(allRows[i].Country);

        }
        else if (allRows[i].Program == 'Masters'){
            mastersIseStudentsCount++;
            uniqMasterDegreesList.push(allRows[i].ProgramName);
            uniqMasterNationalitiesList.push(allRows[i].Country);
        }
        if(allRows[i].Program == 'Masters' || allRows[i].Program == 'Bachelors')
        {
            iseUniqNationalitiesList.push(allRows[i]);
        }
        /////////////////////////////////////////////////////////////////////

        ////////////////USED lEARNING METHOD FOR ISE ALL//////////////////////

        if(allRows[i].LecturesParticipation!='')
        {
            uLecturesRowCount++;

            var tempLecPart = allRows[i].LecturesParticipation;
            tempLecPart = tempLecPart.replace('%','');
            tempLecPart = Number(tempLecPart);
            if(isNaN(tempLecPart))continue;
            else uLecturesAverage =uLecturesAverage+tempLecPart;
        }
        if(allRows[i].ExcerciseParticipation!='')
        {
            uExcercisesRowCount++

            var tempExPart = allRows[i].ExcerciseParticipation;
            tempExPart = tempExPart.replace('%','');
            tempExPart = Number(tempExPart);
            if(isNaN(tempExPart))continue;
            
            else uExcercisesAverage =uExcercisesAverage+tempExPart;
            

           
            
           // console.log(uExcercisesAverage);
        }

    }


    uExcercisesAverage = uExcercisesAverage/uExcercisesRowCount;
    uLecturesAverage = uLecturesAverage/ uLecturesRowCount;


  //  console.log(uLecturesAverage);
  //  console.log(uExcercisesAverage);

    bachelorsUniqNationalitiesCount = Number(uniqBachelorNationalitiesList.length);
    mastersUniqNationalitiesCount= Number(uniqMasterNationalitiesList.length);

    uniqBachelorDegreesList = Array.from(new Set(uniqBachelorDegreesList));

    uniqMasterDegreesList = Array.from(new Set(uniqMasterDegreesList));
    uniqBachelorNationalitiesList = Array.from(new Set(uniqBachelorNationalitiesList));
    uniqMasterNationalitiesList = Array.from(new Set(uniqMasterNationalitiesList));
    iseUniqueNationalitiesCount = Number(Array.from(new Set(iseUniqNationalitiesList)).length);


    var studentsBachCountingProgramwise = [];
    var studentsMastCountingProgramwise = [];
    var masterCounter=0,bachCounter =0;


    for(let i=0;i<uniqMasterDegreesList.length;i++)
    {
        for(let j=0;j<allRows.length;j++)
        {
            if(allRows[j].ProgramName==uniqMasterDegreesList[i] && allRows[j].Program=='Masters')
            {
                masterCounter++;
            }
        }
        studentsMastCountingProgramwise.push(uniqMasterDegreesList[i],masterCounter);
        masterCounter=0;
    }
    
    for(let i=0;i<uniqBachelorDegreesList.length;i++)
    {
        for(let j=0;j<allRows.length;j++)
        {
            if(allRows[j].ProgramName==uniqBachelorDegreesList[i] && allRows[j].Program=='Bachelors')
            {
                bachCounter++;
            }
        }
        studentsBachCountingProgramwise.push(uniqBachelorDegreesList[i],bachCounter);
        bachCounter=0;
    }

        
    
    var iseInformation= 
    {
        genderInformation:
        {
            name:'Gender',
            malesCount: males,
            femaleCount:females,
            otherGenderCount: otherGender,
            totalIseParticipants:males+females+otherGender
        },
        nationalityInformation:
        {
            name:'Nationalities',
            bachelorsUniqNationalitiesList:uniqBachelorNationalitiesList,   // returning object
            mastersUniqNationalitiesList:uniqMasterNationalitiesList,       // returning object 
            bachelorsUniqNationalitiesCount:bachelorsUniqNationalitiesCount,   // returning count integer
            mastersUniqNationalitiesCount:mastersUniqNationalitiesCount,       // returning count integer 
            iseNationalitiesCount: iseUniqueNationalitiesCount
            
        },
        programInformation:
        {
            name:'Degree Program Information',
            mastersStudentsCount:mastersIseStudentsCount,
            totalMasterStudents:bachelorsIseStudentsCount,
            totalmStudents:mastersIseStudentsCount,
            uniqBachelorDegreesList:uniqMasterDegreesList,
            bachelorsStudentsCount:bachelorsIseStudentsCount
        },
        usedlearningMethod:
        {
            name:'Learning Method Information',
            adoptedLecturesAverage:uLecturesAverage,
            adoptedExcercisedAverage:uLecturesAverage,
            attendedLectCount:uLecturesRowCount,
            attendedExcCount:uExcercisesRowCount
        },
        pieChartBachelors:
        {

           bachCounts:studentsBachCountingProgramwise
        },
        pieChartMasters:
        {

            mastCounts:studentsMastCountingProgramwise
        }
    }

    callback(iseInformation);


}

function getUsedLearningMethodSortedByNationalityProgramProgramName(allRows,nationality,program,programName,callback)
{
    var uLecturesAverage=0,uExcercisesAverage=0,uLecturesRowCount=0,uExcercisesRowCount=0;
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Country==nationality && allRows[i].Program==program && allRows[i].ProgramName == programName)
        {
            if(allRows[i].LecturesParticipation!='')
            {
                uLecturesRowCount++;

                var tempLecPart = allRows[i].LecturesParticipation;
                tempLecPart = tempLecPart.replace('%','');
                uLecturesAverage +=uLecturesAverage+Number(tempLecPart);
            }
            if(allRows[i].ExcerciseParticipation!='')
            {
                uExcercisesRowCount++

                var tempExPart = allRows[i].ExcerciseParticipation;
                tempExPart = tempExPart.replace('%','');
                uExcercisesAverage +=uExcercisesAverage+Number(tempExPart);
            }
            
        }
    }

    uExcercisesAverage = uExcercisesAverage/uExcercisesRowCount;
    uLecturesAverage = uLecturesAverage/ uLecturesRowCount;

    usedlearningMethod=
    {
        name:'Learning Method Information',
        adoptedLecturesAverage:uLecturesAverage,
        adoptedExcercisedAverage:uExcercisesAverage,
        attendedLectCount:uLecturesRowCount,
        attendedExcCount:uExcercisesRowCount,
        progName:programName,
        country:nationality,
        prog:program
    }
    callback(usedlearningMethod);
}



function getUsedLearningMethodSortedByNationalityProgram(allRows,nationality,program,callback)
{
    var uLecturesAverage=0,uExcercisesAverage=0,uLecturesRowCount=0,uExcercisesRowCount=0;
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Country==nationality && allRows[i].Program==program)
        {
            if(allRows[i].LecturesParticipation!='')
            {
                uLecturesRowCount++;

                var tempLecPart = allRows[i].LecturesParticipation;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart  = Number(tempLecPart);
                uLecturesAverage +=uLecturesAverage+tempLecPart;
            }
            if(allRows[i].ExcerciseParticipation!='')
            {
                uExcercisesRowCount++

                var tempExPart = allRows[i].ExcerciseParticipation;
                tempExPart = tempExPart.replace('%','');
                tempExPart = Number(tempExPart);
                uExcercisesAverage +=uExcercisesAverage+tempExPart;
            }
        }
    }
    uExcercisesAverage = uExcercisesAverage/uExcercisesRowCount;
    uLecturesAverage = uLecturesAverage/ uLecturesRowCount;

    usedlearningMethod=
    {
        name:'Learning Method Information',
        adoptedLecturesAverage:uLecturesAverage,
        adoptedExcercisedAverage:uLecturesAverage,
        attendedLectCount:uLecturesRowCount,
        attendedExcCount:uExcercisesRowCount,
        progName:program,
        country:nationality
    }
    callback(usedlearningMethod);
}


function getUsedLearningMethodSortedByNationality(allRows,nationality,callback)
{
    var uLecturesAverage=0.0,uExcercisesAverage=0.0,uLecturesRowCount=0,uExcercisesRowCount=0;
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Country==nationality)
        {
            if(allRows[i].LecturesParticipation!='')
            {
                uLecturesRowCount++;

                var tempLecPart = allRows[i].LecturesParticipation;
                tempLecPart = tempLecPart.replace('%','');
                uLecturesAverage +=uLecturesAverage+Number(tempLecPart);
            }
            if(allRows[i].ExcerciseParticipation!='')
            {
                uExcercisesRowCount++

                var tempExPart = allRows[i].ExcerciseParticipation;
                tempExPart = tempExPart.replace('%','');
                uExcercisesAverage +=uExcercisesAverage+Number(tempExPart);
            }
        }
    }
    uExcercisesAverage = uExcercisesAverage/uExcercisesRowCount;
    uLecturesAverage = uLecturesAverage/ uLecturesRowCount;

    var usedlearningMethodCountrywise=
    {
        name:'Adopted Learning Method Information',
        adoptedLecturesAverage:uLecturesAverage,
        adoptedExcercisedAverage:uLecturesAverage,
        attendedLectCount:uLecturesRowCount,
        attendedExcCount:uExcercisesRowCount,
        country:nationality
    }
    callback(usedlearningMethodCountrywise);
}


function getNationalityWiseStudents(allRows,nationality,program,callback)   // Nationality  = none by default
{

    var nationalityWiseStudentsList=[];
    var nationalityWiseStudentsCount;
     
    // Nationality
    // CGPAs
    // Suggested Learning Method
    // Used Learning Method
    // Semester Numbers

    var nationalityWiseCgpaList = [];
    var nationalityWiseCgpaAverage = 0.0;
    



    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Country==nationality && allRows[i].Program==program)
        {
            nationalityWiseStudentsList.push(allRows[i].Country);
            nationalityWiseCgpaList.push(allRows[i].Cgpa);
        }
        var uLecturesAverage=0,uExcercisesAverage=0,uLecturesRowCount=0,uExcercisesRowCount=0;
        if(allRows[i].LecturesParticipation!='')
            {
                uLecturesRowCount++;

                var tempLecPart = allRows[i].LecturesParticipation;
                tempLecPart = tempLecPart.replace('%','');
                uLecturesAverage +=uLecturesAverage+Number(tempLecPart);
            }
            if(allRows[i].ExcerciseParticipation!='')
            {
                uExcercisesRowCount++

                var tempExPart = allRows[i].ExcerciseParticipation;
                tempExPart = tempExPart.replace('%','');
                uExcercisesAverage +=uExcercisesAverage+Number(tempExPart);
            }
    }
    nationalityWiseCgpaAverage += nationalityWiseCgpaAverage/nationalityWiseCgpaList.length;
    nationalityWiseStudentsCount = nationalityWiseStudents.length;
    var nationalityWiseStudentsJSON=
    {
        name:'Nationality Wise Students',
        nation:nationality,
        program:program,
        studentsCount:nationalityWiseStudentsCount,
        studentsList:nationalityWiseStudentsList,
        cgpaList:nationalityWiseCgpaList,
        cgpaAverage:nationalityWiseCgpaAverage
    }
    callback(nationalityWiseStudentsJSON);
} 


function getSuggestedLearningMethodsSortedByProgram(allRows,program)
{

} 