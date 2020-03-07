function iseGeneralOverview(allRows,callback)      /// INCLUDES THE OBJECT FOR USED LM FOR ALL ISE //NO SEPERATE FUNCTION AS SUGGESTED LM
{
    var males=0,females=0,otherGender=0;
    var sLectures,sExcersices,sOnline,sGroup;   // S stands for Suggested Learning Medium
    var uBachLecturesAverage=0.0,uBachExcercisesAverage=0.0,uBachLecturesRowCount=0,uBachExcercisesRowCount=0;  // U stands for Used Learning Medium
    var uMastLecturesAverage=0.0,uMastExcercisesAverage=0.0,uMastLecturesRowCount=0,uMastExcercisesRowCount=0;
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

        ////////////////USED lEARNING METHOD FOR ISE Bachelors and Masters//////////////////////


        if(allRows[i].LecturesParticipation!='' && allRows[i].Program=='Bachelors')
        {
            uBachLecturesRowCount++;
            var tempLecPart = allRows[i].LecturesParticipation;
            tempLecPart = tempLecPart.replace('%','');
            tempLecPart = Number(tempLecPart);
            if(isNaN(tempLecPart))continue;
            else uBachLecturesAverage =uBachLecturesAverage+tempLecPart;
            console.log(uBachLecturesAverage);
        }
        if(allRows[i].ExcerciseParticipation!='' && allRows[i].Program=='Bachelors')
        {
            uBachExcercisesRowCount++;
            var tempExPart = allRows[i].ExcerciseParticipation;
            tempExPart = tempExPart.replace('%','');
            tempExPart = Number(tempExPart);
            if(isNaN(tempExPart))continue;
            else uBachExcercisesAverage =uBachExcercisesAverage+tempExPart;
            console.log(uBachExcercisesAverage);
        }


        ///////////////////////////masters////////////////////////////////////

        if(allRows[i].LecturesParticipation!='' && allRows[i].Program=='Masters')
        {
            uMastLecturesRowCount++;

            var tempLecPart = allRows[i].LecturesParticipation;
            tempLecPart = tempLecPart.replace('%','');
            tempLecPart = Number(tempLecPart);
            if(isNaN(tempLecPart))continue;
            else uMastLecturesAverage =uMastLecturesAverage+tempLecPart;
        }
        if(allRows[i].ExcerciseParticipation!='' && allRows[i].Program=='Masters')
        {
            uMastExcercisesRowCount++

            var tempExPart = allRows[i].ExcerciseParticipation;
            tempExPart = tempExPart.replace('%','');
            tempExPart = Number(tempExPart);
            if(isNaN(tempExPart))continue;
            
            else uMastExcercisesAverage =uMastExcercisesAverage+tempExPart;
           // console.log(uExcercisesAverage);
        }

    }

//    console.log(uBachExcercisesRowCount);console.log(uBachLecturesRowCount);
    uBachExcercisesAverage = uBachExcercisesAverage/uBachExcercisesRowCount;
    uBachLecturesAverage = uBachLecturesAverage/ uBachLecturesRowCount;
    uMastExcercisesAverage = uMastExcercisesAverage/uMastExcercisesRowCount;
    uMastLecturesAverage = uMastLecturesAverage/ uMastLecturesRowCount;


    

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
        studentsMastCountingProgramwise.push([uniqMasterDegreesList[i],Number(masterCounter)]);
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
        studentsBachCountingProgramwise.push([uniqBachelorDegreesList[i],bachCounter]);
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
        barChartusedlearningMethodIse:
        {
            name:'Adopted Learning Method in ISE',
            adoptedBachLecturesAverage:uBachLecturesAverage,
            adoptedBachExcercisedAverage:uBachExcercisesAverage,
            adoptedMastLecturesAverage:uMastLecturesAverage,
            adoptedMastExcercisedAverage:uMastExcercisesAverage,
           // attendedLectCount:uLecturesRowCount,
            //attendedExcCount:uExcercisesRowCount
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

function getUsedLearningMethodSortedByNationalityProgramProgramName(allRows,qnationality,qprogram,qprogramName,callback)
{
    var uLecturesAverage=0,uExcercisesAverage=0,uLecturesRowCount=0,uExcercisesRowCount=0;

    for(let i=0;i<allRows.length;i++)
    {
        var nationality='',program='',programName='';
        if(qnationality=='All')
        {
            nationality=allRows[i].Country;
        }
        if(qprogram=='All')
        {
            program=allRows[i].Program;
        }
        if(qprogramName=='All')
        {
            programName=allRows[i].ProgramName;
        }
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

function getSuggestedLearningMethods(allRows,callback)  
{
    var sLectureAverage=0,sExcerciseAverage=0,sOnlineStudyAverage=0,sGroupStudyAverage=0;
    var sLectureRowCount=0,sExcerciseRowCount=0,sOnlineStudyRowCount=0,sGroupStudyRowCount=0;

    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program=='Bachelors' || allRows[i].Program=='Masters')
        {
            if(allRows[i].LMAttendingLectures!='')
            {
                sLectureRowCount++;
                var tempLecPart = allRows[i].LMAttendingLectures;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sLectureAverage =sLectureAverage+tempLecPart;

            }
            if(allRows[i].LMAttendingExcercises!='')
            {
                sExcerciseRowCount++;
                var tempLecPart = allRows[i].LMAttendingExcercises;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sExcerciseAverage =sExcerciseAverage+tempLecPart;
            }
            if(allRows[i].LMOnlineStudy!='')
            {
                sOnlineStudyRowCount++;
                var tempLecPart = allRows[i].LMOnlineStudy;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sOnlineStudyAverage =sOnlineStudyAverage+tempLecPart;
            }
            if(allRows[i].LMGroupStudy!='')
            {
                sGroupStudyRowCount++;
                var tempLecPart = allRows[i].LMGroupStudy;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sGroupStudyAverage =sGroupStudyAverage+tempLecPart;
            }

        }
    }
    sLectureAverage=sLectureAverage/sLectureRowCount;
    sExcerciseAverage=sExcerciseAverage/sExcerciseRowCount;
    sOnlineStudyAverage=sOnlineStudyAverage/sOnlineStudyRowCount;
    sGroupStudyAverage=sGroupStudyAverage/sGroupStudyRowCount;


    var suggestedLearningMethodology=
    {
        lecturesAverage:sLectureAverage,
        excerciseAverage:sExcerciseAverage,
        onlineStudyAverage:sOnlineStudyAverage,
        groupStudyAverage:sGroupStudyAverage
    }

    callback(suggestedLearningMethodology);
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
    var uLecturesAverage=0,uExcercisesAverage=0,uLecturesRowCount=0,uExcercisesRowCount=0;
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Country==nationality)
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
        country:nationality
    }
    callback(usedlearningMethod);
}

function getSuggestedLearningMethodsSortedByNationality(allRows,nationality,callback)
{
    var sLectureAverage=0,sExcerciseAverage=0,sOnlineStudyAverage=0,sGroupStudyAverage=0;
    var sLectureRowCount=0,sExcerciseRowCount=0,sOnlineStudyRowCount=0,sGroupStudyRowCount=0;

    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Country==nationality)
        {
            if(allRows[i].LMAttendingLectures!='')
            {
                sLectureRowCount++;
                var tempLecPart = allRows[i].LMAttendingLectures;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sLectureAverage =sLectureAverage+tempLecPart;

            }
            if(allRows[i].LMAttendingExcercises!='')
            {
                sExcerciseRowCount++;
                var tempLecPart = allRows[i].LMAttendingExcercises;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sExcerciseAverage =sExcerciseAverage+tempLecPart;
            }
            if(allRows[i].LMOnlineStudy!='')
            {
                sOnlineStudyRowCount++;
                var tempLecPart = allRows[i].LMOnlineStudy;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sOnlineStudyAverage =sOnlineStudyAverage+tempLecPart;
            }
            if(allRows[i].LMGroupStudy!='')
            {
                sGroupStudyRowCount++;
                var tempLecPart = allRows[i].LMGroupStudy;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sGroupStudyAverage =sGroupStudyAverage+tempLecPart;
            }

        }
    }
    sLectureAverage=sLectureAverage/sLectureRowCount;
    sExcerciseAverage=sExcerciseAverage/sExcerciseRowCount;
    sOnlineStudyAverage=sOnlineStudyAverage/sOnlineStudyRowCount;
    sGroupStudyAverage=sGroupStudyAverage/sGroupStudyRowCount;


    var suggestedLearningMethodology=
    {
        lecturesAverage:sLectureAverage,
        excerciseAverage:sExcerciseAverage,
        onlineStudyAverage:sOnlineStudyAverage,
        groupStudyAverage:sGroupStudyAverage
    }

    callback(suggestedLearningMethodology);
}

function getSuggestedLearningMethodsSortedByNationalityProgramAndProgramName(allRows,qnationality,qprogram,qprogramName,callback)
{
    var sLectureAverage=0,sExcerciseAverage=0,sOnlineStudyAverage=0,sGroupStudyAverage=0;
    var sLectureRowCount=0,sExcerciseRowCount=0,sOnlineStudyRowCount=0,sGroupStudyRowCount=0;

    for(let i=0;i<allRows.length;i++)
    {
        var nationality='',program='',programName='';
        if(qnationality=='All')
        {
            nationality=allRows[i].Country;
        }
        if(qprogram=='All')
        {
            program=allRows[i].Program;
        }
        if(qprogramName=='All')
        {
            programName=allRows[i].ProgramName;
        }
        if(allRows[i].Country==nationality)
        {
            if(allRows[i].LMAttendingLectures!='')
            {
                sLectureRowCount++;
                var tempLecPart = allRows[i].LMAttendingLectures;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sLectureAverage =sLectureAverage+tempLecPart;

            }
            if(allRows[i].LMAttendingExcercises!='')
            {
                sExcerciseRowCount++;
                var tempLecPart = allRows[i].LMAttendingExcercises;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sExcerciseAverage =sExcerciseAverage+tempLecPart;
            }
            if(allRows[i].LMOnlineStudy!='')
            {
                sOnlineStudyRowCount++;
                var tempLecPart = allRows[i].LMOnlineStudy;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sOnlineStudyAverage =sOnlineStudyAverage+tempLecPart;
            }
            if(allRows[i].LMGroupStudy!='')
            {
                sGroupStudyRowCount++;
                var tempLecPart = allRows[i].LMGroupStudy;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else sGroupStudyAverage =sGroupStudyAverage+tempLecPart;
            }

        }
    }
    sLectureAverage=sLectureAverage/sLectureRowCount;
    sExcerciseAverage=sExcerciseAverage/sExcerciseRowCount;
    sOnlineStudyAverage=sOnlineStudyAverage/sOnlineStudyRowCount;
    sGroupStudyAverage=sGroupStudyAverage/sGroupStudyRowCount;


    var suggestedLearningMethodology=
    {
        lecturesAverage:sLectureAverage,
        excerciseAverage:sExcerciseAverage,
        onlineStudyAverage:sOnlineStudyAverage,
        groupStudyAverage:sGroupStudyAverage
    }

    callback(suggestedLearningMethodology);
}

function getUniqueDegreeProgramList(allRows,program,callback)
{
 
    var uniqueDegreeProgramList = [];
    for(let i=0;i<allRows.length;i++)
    {
        
        if(allRows[i].Program==program)
        {
            uniqueDegreeProgramList.push(allRows[i].ProgramName);
        }
        else if(program=='All')
        {
            uniqueDegreeProgramList.push(allRows[i].ProgramName);
        }
    }
    uniqueDegreeProgramList = Array.from(new Set(uniqueDegreeProgramList));
    callback(uniqueDegreeProgramList);
}
function getUniqueCoursesList(allRows,programName,callback)
{
    var uniqueCoursesList = [];
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].ProgramName==programName)
        {
            uniqueCoursesList.push(allRows[i].CourseName);
        }
        
    }
    uniqueCoursesList = Array.from(new Set (uniqueCoursesList));
    callback(uniqueCoursesList);
}
function getUniqueNationalities(allRows,callback)
{
    var uniqueNationalitiesList =[];
    for(let i=0;i<allRows.length;i++)
    {
        uniqueNationalitiesList.push(allRows[i].Country);
    }
    uniqueNationalitiesList = Array.from(new Set(uniqueNationalitiesList));

    callback(uniqueNationalitiesList);
}
module.exports.getUsedLearningMethodSortedByNationalityProgram=getUsedLearningMethodSortedByNationalityProgram;
module.exports.getSuggestedLearningMethods=getSuggestedLearningMethods;
module.exports.getUsedLearningMethodSortedByNationalityProgramProgramName=getUsedLearningMethodSortedByNationalityProgramProgramName;
module.exports.getNationalityWiseStudents=getNationalityWiseStudents;
module.exports.iseGeneralOverview=iseGeneralOverview;
module.exports.getSuggestedLearningMethodsSortedByNationality=getSuggestedLearningMethodsSortedByNationality;
module.exports.getSuggestedLearningMethodsSortedByNationalityProgramAndProgramName=getSuggestedLearningMethodsSortedByNationalityProgramAndProgramName;
module.exports.getUsedLearningMethodSortedByNationality=getUsedLearningMethodSortedByNationality;
module.exports.getUniqueDegreeProgramList=getUniqueDegreeProgramList;
module.exports.getUniqueCoursesList=getUniqueCoursesList;
module.exports.getUniqueNationalities=getUniqueNationalities;