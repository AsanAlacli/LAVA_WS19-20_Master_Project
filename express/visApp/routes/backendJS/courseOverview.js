

function coursePassedFailed(allRows,program,programName,courseName,callback)
{
    var noOfFailedStudents=0,noOfPassedStudents=0;
    var noOfTotalParticipants =0;

    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program==program && allRows[i].ProgramName==programName &&  allRows[i].CourseName==courseName && allRows[i].Gpa!='0' &&  (allRows[i].Gpa=='5' || allRows[i].Gpa=='5.0'))
        {
            noOfFailedStudents++;
            noOfTotalParticipants++;
        }
        else if(allRows[i].CourseName==courseName && allRows[i].Program==program && allRows[i].ProgramName==programName && (allRows[i].Gpa!='5' || allRows[i].Gpa!='5.0') && allRows[i].Gpa!='0')
        {
            noOfPassedStudents++;
            noOfTotalParticipants++;
        }
    }
    
    var coursePassFailStudents={      /// For Pie Chart in Course Overview
        failedStudents: noOfFailedStudents,
        passedStudents: noOfPassedStudents,
        totalStudents: noOfTotalParticipants
    }
  //s  console.log(coursePassFailStudents);
    callback(coursePassFailStudents);


}

function courseDifficulty(allRows,program,programName,courseName,callback)
{
    var courseDifficulty =0;
    var noOfRatings=0;
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program==program && allRows[i].ProgramName==programName &&  allRows[i].CourseName==courseName)
        {
            noOfRatings++;
            courseDifficulty+=Number(allRows[i].DifficultyLevel) ;
        }
    }
    courseDifficulty = courseDifficulty/noOfRatings;

    var courseDiff = {
        courseDifficultyAverage:courseDifficulty,
        course:courseName
    }

    callback(courseDiff);
}

function isCourseHelpful(allRows,program,programName,courseName,callback)
{
    var noOfVotes = 0;
    var yes=0,no=0,mayBe=0;
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program==program && allRows[i].ProgramName==programName &&  allRows[i].CourseName==courseName)
        {
            noOfVotes++;
            if(allRows[i].CourseBeingHelpful=='Yes')
            {
                yes++;
            }
            else if(allRows[i].CourseBeingHelpful=='No')
            {
                no++;
            }
            else if(allRows[i].CourseBeingHelpful=='Maybe')
            {
                mayBe++
            }
        }
    }

    var votes=
    {
        yes:yes,
        no:no,
        mayBe:mayBe,
        totalVotes:noOfVotes
    }
    callback(votes);

}

function getAdoptedLearningMethodology(allRows,program,programName,courseName,callback)
{
    console.log(program+programName+courseName);
    var uLecturesAverage=0.0,uExcercisesAverage=0.0,uLecturesRowCount=0,uExcercisesRowCount=0;  // U stands for Used Learning Medium
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].ProgramName==programName && allRows[i].Program==program && allRows[i].CourseName==courseName)
        {
            if(allRows[i].LecturesParticipation!='' )
            {
                uLecturesRowCount++;
                var tempLecPart = allRows[i].LecturesParticipation;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart = Number(tempLecPart);
                if(isNaN(tempLecPart))continue;
                else uLecturesAverage =uLecturesAverage+tempLecPart;
     //           console.log(uBachLecturesAverage);
            }
            if(allRows[i].ExcerciseParticipation!='' )
            {
                uExcercisesRowCount++;
                var tempExPart = allRows[i].ExcerciseParticipation;
                tempExPart = tempExPart.replace('%','');
                tempExPart = Number(tempExPart);
                if(isNaN(tempExPart))continue;
                else uExcercisesAverage =uExcercisesAverage+tempExPart;
    //           console.log(uBachExcercisesAverage);
            }
        }
        
    }


    uExcercisesAverage = uExcercisesAverage/uExcercisesRowCount;
    uLecturesAverage = uLecturesAverage/ uLecturesRowCount;

 

    var usedLM=
    {
        adoptedLecturesAverage:uLecturesAverage,
        adoptedExcercisedAverage:uExcercisesAverage,
    }

    callback(usedLM);
 

}
function getGpaAndAverageGpa(allRows,program,programName,courseName,callback)
{
    console.log(program+'-------'+programName+courseName);
    var gpaList = [];
    var studentsCount =0;
    var gpaAverage =0;
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program==program && allRows[i].ProgramName==programName && allRows[i].CourseName==courseName)
        {
            if(!isNaN(allRows[i].Gpa))
            {
                studentsCount++;
                gpaList.push(allRows[i].Gpa);
            }
        }

    }
    for(let i=0;i<gpaList.length;i++)
    {
        if(!isNaN(gpaList[i]))
        gpaAverage+=Number(gpaList[i]);
    }
    gpaAverage=Number(gpaAverage)/studentsCount;

    var courseGpa = 
    {
        course:courseName,
        listOfGpas:gpaList,
        totalStudents:studentsCount,
        averageGpa:gpaAverage
    }
    callback(courseGpa);
}

function getNationalityWiseGpa(allRows,nationality,courseName,program,programName,callback)
{
    var gpaList = [];
    var studentsCount =0;
    var gpaAverage =0;
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program==program && allRows[i].ProgramName==programName && allRows[i].Country==nationality && allRows[i].CourseName==courseName)
        {
            studentsCount++;
            gpaList.push(allRows[i].Gpa);
        }

    }
    for(let i=0;i<gpaList.length;i++)
    {
        gpaAverage+=gpaList[i];
    }
    gpaAverage=gpaAverage/studentsCount;

    var courseGpa = 
    {
        listOfGpas:gpaList,
        totalStudents:studentsCount,
        averageGpa:gpaAverage
    }
    callback(courseGpa);
}

function getSuggestedLearningMethods(allRows,program,programName,courseName,callback)
{
    var sLectureAverage=0,sExcerciseAverage=0,sOnlineStudyAverage=0,sGroupStudyAverage=0;
    var sLectureRowCount=0,sExcerciseRowCount=0,sOnlineStudyRowCount=0,sGroupStudyRowCount=0;

    console.log(program + programName+courseName);
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program==program && allRows[i].ProgramName==programName && allRows[i].CourseName==courseName)
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

function getFailureReasons(allRows,program,programName,courseName,callback)
{
    var allSingleReasons =[];
    var splittedValuesList = [];
    for(let i=0;i<allRows;i++)
    {
        if(allRows[i].Program==program && allRows[i].ProgramName==programName && allRows[i].CourseName==courseName)
        {
            if(allRows[i].FailingReason!='')
            {
                if(allRows[i].FailingReason.includes(';'))
                {   
                    splittedValuesList= allRows[i].FailingReason.split(';');
                }
                else
                {
                    allSingleReasons.push(allRows[i].FailingReason);
                }
                for(let i=0;i<splittedValuesList.length;i++)
                {
                    if(splittedValuesList[i]!='')
                    {
                        allSingleReasons.push(splittedValuesList[i]);
                    }
                }
                splittedValuesList=[];
            }
            
        }
    }

    var contentNotHelpful=0,notStudied=0,notEnoughTime=0,personalProblems=0,otherProblems=0;
    for(let i=0;i<allSingleReasons.length;i++)
    {
        if (allSingleReasons[i]=='Delivered content in the lecture was not helpful to pass the exam')
        {
            contentNotHelpful++;
        }
        else if (allSingleReasons[i]=="I didn't study enough to pass the exam")
        {
            notStudied++;
        }
        else if (allSingleReasons[i]=="Didn't have enough time to study due to the job")
        {
            notEnoughTime++;
        }
        else if (allSingleReasons[i]=='Personal problems')
        {
            personalProblems++;
        }
        else
        {
            otherProblems++;
        }

    }

    var failureReasons=
    {
        reason1:
        {
            name:'Delivered content in the lecture was not helpful to pass the exam',
            count:contentNotHelpful
        },
        reason2:
        {
            name:"I didn't study enough to pass the exam",
            count:notStudied
        },
        reason3:
        {
            name:"Didn't have enough time to study due to the job",
            count:notEnoughTime
        },
        reason4:
        {
            name:"Personal problems",
            count:personalProblems
        },
        reason5:
        {
            name:"Other",
            count:otherProblems
        }
    }
    callback(failureReasons);
}

function getAllUniqueCoursesList(allRows,program,programName,callback)
{
    var uniqueCoursesList = [];
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program==program && allRows[i].ProgramName==programName)
        {
            uniqueCoursesList.push(allRows[i].CourseName);
        }
    }
    uniqueCoursesList = Array.from(new Set(uniqueCoursesList));

    callback(uniqueCoursesList);
}

module.exports.getFailureReasons = getFailureReasons;
module.exports.getSuggestedLearningMethods = getSuggestedLearningMethods;
module.exports.getGpaAndAverageGpa = getGpaAndAverageGpa;
module.exports.getNationalityWiseGpa = getNationalityWiseGpa;
module.exports.getAdoptedLearningMethodology = getAdoptedLearningMethodology;
module.exports.coursePassedFailed = coursePassedFailed;
module.exports.courseDifficulty = courseDifficulty;
module.exports.isCourseHelpful = isCourseHelpful;
module.exports.getAllUniqueCoursesList=getAllUniqueCoursesList;