function getUsedLearningMethodSortedByProgram(allRows,program,callback)
{
//    console.log(program);
    //console.log(allRows);
    var uLecturesAverage=0,uExcercisesAverage=0,uLecturesRowCount=0,uExcercisesRowCount=0;
    for(let i=0;i<allRows.length;i++)
    {

        if(allRows[i].Program==program)
        {
 //           console.log(program);
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
    }

    callback(usedlearningMethod);
}

function getSuggestedLearningMethodsSortedByProgram(allRows,program,callback)
{
    var sLectureAverage=0,sExcerciseAverage=0,sOnlineStudyAverage=0,sGroupStudyAverage=0;
    var sLectureRowCount=0,sExcerciseRowCount=0,sOnlineStudyRowCount=0,sGroupStudyRowCount=0;

    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program==program)
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

function getUsedLearningMethodSortedByProgramProgramNameAndNationality(allRows,qprogram,qprogramName,qnationality,callback)
{
    var uLecturesAverage=0,uExcercisesAverage=0,uLecturesRowCount=0,uExcercisesRowCount=0;
    for(let i=0;i<allRows.length;i++)
    {
        var nationality=qnationality,program=qprogram,programName=qprogramName;

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
        if(allRows[i].Program==program && allRows[i].ProgramName==programName && allRows[i].Country==nationality)
        {
            if(allRows[i].LecturesParticipation!='')
            {
                uLecturesRowCount++;

                var tempLecPart = allRows[i].LecturesParticipation;
                tempLecPart = tempLecPart.replace('%','');
                tempLecPart  = Number(tempLecPart);
                uLecturesAverage +=tempLecPart;
            }
            if(allRows[i].ExcerciseParticipation!='')
            {
                uExcercisesRowCount++

                var tempExPart = allRows[i].ExcerciseParticipation;
                tempExPart = tempExPart.replace('%','');
                tempExPart = Number(tempExPart);
                uExcercisesAverage +=tempExPart;
            }
        }
    }
    uExcercisesAverage = uExcercisesAverage/uExcercisesRowCount;
    uLecturesAverage = uLecturesAverage/uLecturesRowCount;

    usedlearningMethod=
    {
        name:'Learning Method Information',
        adoptedLecturesAverage:uLecturesAverage,
        adoptedExcercisedAverage:uExcercisesAverage,
        attendedLectCount:uLecturesRowCount,
        attendedExcCount:uExcercisesRowCount,

    }
    callback(usedlearningMethod);
}

function getSuggestedLearningMethodsSortedByProgramProgramNameAndNationality(allRows,qprogram,qprogramName,qnationality,callback)
{
    var sLectureAverage=0,sExcerciseAverage=0,sOnlineStudyAverage=0,sGroupStudyAverage=0;
    var sLectureRowCount=0,sExcerciseRowCount=0,sOnlineStudyRowCount=0,sGroupStudyRowCount=0;

    for(let i=0;i<allRows.length;i++)
    {
        var nationality=qnationality,program=qprogram,programName=qprogramName;

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
        if(allRows[i].Program==program && allRows[i].ProgramName==programName && allRows[i].Country==nationality)
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

function getAverageSemestersOfDegreeProgramProgramNamewise(allRows,program,programName,callback)
{
    var averageSemester=0,noOfStudents=0;
    for(let i =0;i<allRows.length;i++)
    {
        if(allRows[i].Program==program && allRows[i].ProgramName==programName && allRows[i].Semester!='')
        {
            averageSemester=averageSemester+Number(allRows[i].Semester);
            noOfStudents++;
    
        }
    }
    averageSemester = Number(averageSemester)/noOfStudents;

    var averageSemester=
    {
        semesters:averageSemester

    }
    callback(averageSemester);

}

function getAverageSemestersOfDegreeProgram(allRows,program,callback)
{
    var averageSemester=0,noOfStudents=0;
    for(let i =0;i<allRows.length;i++)
    {
        if(allRows[i].Program==program && allRows[i].Semester!='0')
        {
            averageSemester+=allRows[i].Semester;
            noOfStudents++;
    
        }
    }
    averageSemester = averageSemester/noOfStudents;

    var averageSemester=
    {
        semesters:averageSemester
    }

}

function getReasonsForNotAttendingLectureSortedByProgramAndProgramName(allRows,program,programName,callback)
{
    var allSingleReasonsList = [];
    var splittedReasonsList = [];
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program == program && allRows[i].ProgramName==programName)
        {
            if(allRows[i].AttendingLecturesNotHelpful!='')
            {
                if(allRows[i].AttendingLecturesNotHelpful.includes(';'))
                {
                    splittedReasonsList = allRows[i].AttendingLecturesNotHelpful.split(';');
                }
                else
                {
                    allSingleReasonsList.push(allRows[i].AttendingLecturesNotHelpful);
                }
                for(let i=0;i<splittedReasonsList.length;i++)
                {
                    if(splittedReasonsList[i]!='')
                    {
                        allSingleReasonsList.push(splittedReasonsList[i]);
                    }
                }
                splittedReasonsList =[];
            }
        }
    }
    
    var overCrowded=0,notUseful=0,badTeachingMethod=0,badContent=0,discouragingEnv =0;
    for(let i=0;i<allSingleReasonsList.length;i++)
    {
        if(allSingleReasonsList[i]=='Students were over crowded')
        {
            overCrowded++;
        }
        else if(allSingleReasonsList[i]=="Didn't make any difference to attend the classes")
        {
            notUseful++;
        }
        else if(allSingleReasonsList[i]=='Teaching method was not good')
        {
            badTeachingMethod++;
        }
        else if(allSingleReasonsList[i]=='Content delivered was outdated or not interesting')
        {
            badContent++;
        }
        else if(allSingleReasonsList[i]=='Class environment was not encouraging and cooperative')
        {
            discouragingEnv++;
        }

    }

    var notAttendingLectureReasons=
    {
        reason1:
        {
            name:'Students were over crowded',
            count:overCrowded
        },
        reason2:
        {
            name:"Didn't make any difference to attend the classes",
            count:notUseful
        },
        reason3:
        {
            name:'Teaching method was not good',
            count:badTeachingMethod
        },
        reason4:
        {
            name:'Content delivered was outdated or not interesting',
            count:badContent
        },
        reason5:
        {
            name:'Class environment was not encouraging and cooperative',
            count:discouragingEnv
        }
    }

    callback(notAttendingLectureReasons);

}

function getReasonsForNotAttendingLectureSortedByProgram(allRows,program,callback)
{
    var allSingleReasonsList = [];
    var splittedReasonsList = [];
    for(let i=0;i<allRows.length;i++)
    {
        if(allRows[i].Program == program)
        {
            if(allRows[i].AttendingLecturesNotHelpful!='')
            {
                if(allRows[i].AttendingLecturesNotHelpful.includes(';'))
                {
                    splittedReasonsList = allRows[i].AttendingLecturesNotHelpful.split(';');
                }
                else
                {
                    allSingleReasonsList.push(allRows[i].AttendingLecturesNotHelpful);
                }
                for(let i=0;i<splittedReasonsList.length;i++)
                {
                    if(splittedReasonsList[i]!='')
                    {
                        allSingleReasonsList.push(splittedReasonsList[i]);
                    }
                }
                splittedReasonsList =[];
            }
        }
    }
    
    var overCrowded=0,notUseful=0,badTeachingMethod=0,badContent=0,discouragingEnv =0;
    for(let i=0;i<allSingleReasonsList.length;i++)
    {
        if(allSingleReasonsList[i]=='Students were over crowded')
        {
            overCrowded++;
        }
        else if(allSingleReasonsList[i]=="Didn't make any difference to attend the classes")
        {
            notUseful++;
        }
        else if(allSingleReasonsList[i]=='Teaching method was not good')
        {
            badTeachingMethod++;
        }
        else if(allSingleReasonsList[i]=='Content delivered was outdated or not interesting')
        {
            badContent++;
        }
        else if(allSingleReasonsList[i]=='Class environment was not encouraging and cooperative')
        {
            discouragingEnv++;
        }

    }

    var notAttendingLectureReasons=
    {
        reason1:
        {
            name:'Students were over crowded',
            count:overCrowded
        },
        reason2:
        {
            name:"Didn't make any difference to attend the classes",
            count:notUseful
        },
        reason3:
        {
            name:'Teaching method was not good',
            count:badTeachingMethod
        },
        reason4:
        {
            name:'Content delivered was outdated or not interesting',
            count:badContent
        },
        reason5:
        {
            name:'Class environment was not encouraging and cooperative',
            count:discouragingEnv
        }
    }

    callback(notAttendingLectureReasons);

}


module.exports.getReasonsForNotAttendingLectureSortedByProgram=getReasonsForNotAttendingLectureSortedByProgram;
module.exports.getReasonsForNotAttendingLectureSortedByProgramAndProgramName=getReasonsForNotAttendingLectureSortedByProgramAndProgramName;
module.exports.getAverageSemestersOfDegreeProgram=getAverageSemestersOfDegreeProgram;
module.exports.getAverageSemestersOfDegreeProgramProgramNamewise=getAverageSemestersOfDegreeProgramProgramNamewise;
module.exports.getSuggestedLearningMethodsSortedByProgramProgramNameAndNationality=getSuggestedLearningMethodsSortedByProgramProgramNameAndNationality;
module.exports.getSuggestedLearningMethodsSortedByProgram=getSuggestedLearningMethodsSortedByProgram;
module.exports.getUsedLearningMethodSortedByProgram=getUsedLearningMethodSortedByProgram;
module.exports.getUsedLearningMethodSortedByProgramProgramNameAndNationality=getUsedLearningMethodSortedByProgramProgramNameAndNationality;