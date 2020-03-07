function getUsedLearningMethodSortedByNationality(allRows,nationality,callback)
{
    var uLecturesAverage=0.0,uExcercisesAverage=0.0;
    var uLecturesRowCount=0,uExcercisesRowCount=0;
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


function getSuggestedLearningMethodSortedByNationality(allRows,nationality,callback)  
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
module.exports.getUsedLearningMethodSortedByNationality=getUsedLearningMethodSortedByNationality;
module.exports.getSuggestedLearningMethodSortedByNationality=getSuggestedLearningMethodSortedByNationality;