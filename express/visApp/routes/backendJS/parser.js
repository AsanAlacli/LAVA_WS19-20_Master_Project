

const csv = require('csv-parser');
const fs = require('fs');



/* 
This function reads the raw data file, adds the missing values if necessary
Invokes the writing function writeFile() taking parameter of list of row called allRows 
*/
function readFile()     
{
  
  var allRows=[];
  var readytoWriteRows = [];
  var allRowsKeys;
  fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => 
  {
    allRows.push(row); 
  })
  .on('end', () => {

    allRowsKeys= Object.keys(allRows);
    var tempProgName;

    fs.createReadStream('data.csv')
    .pipe(csv({headers:false}))
    .on('data', (row) => 
    {
      if(row['7'] == 'Select your Program name' && row['4']=='Select your study program'){}
      else if(row['7']!='' && row['4']=='Bachelors')
      {
        tempProgName = row['7'];
//        console.log(row['7'])
      }
      for(let i=0;i<allRowsKeys.length;i++)
      {
        if(allRows[i]['Select your study program']=='Bachelors')
        {
          allRows[i]['Select your Program name'] = tempProgName;
        }
      }
    })
    .on('end', () => 
    {
     // console.log(allRows);
      writeFile(allRows);
    });
  });
}


/* 
This function writes the row list allRows as a JSON object in to the output file named out.csv
*/
function writeFile(allRows){   // object items will be accessed by the title of item
  var row= allRows;
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
      {id: 'gender', title: 'Gender'},
      {id: 'country', title: 'Country'},
      {id: 'age', title: 'Age'},
      {id: 'program', title: 'Program'},   // Masters or Bachelors
      {id: 'semester', title: 'Semester'},
      {id: 'cgpa', title: 'Cgpa'},
      {id: 'programName', title: 'ProgramName'},  // specific course name in MS or BS
      {id: 'courseName', title: 'CourseName'},   // Course name to review
      {id: 'gpa', title: 'Gpa'},
      {id: 'failingReason', title: 'FailingReason'},
      {id: 'difficultyLevel', title: 'DifficultyLevel'},
      {id: 'lmAl', title: 'LMAttendingLectures'},
      {id: 'lmAE', title: 'LMAttendingExcercises'},
      {id: 'lmOS', title: 'LMOnlineStudy'},
      {id: 'lmGS', title: 'LMGroupStudy'},
      {id: 'alNotHelpful', title: 'AttendingLecturesNotHelpful'},
      {id: 'alHelpful', title: 'AttendingLecturesHelpful'},
      {id: 'lParticipation', title: 'LecturesParticipation'},
      {id: 'eParticipation', title: 'ExcerciseParticipation'},
      {id: 'courseBeingHelpful', title: 'CourseBeingHelpful'},
      {id: 'comments', title: 'Comments'},
  
    ]
  });
  var data=[];
  for(let i=0;i<allRows.length;i++)
  {
    var temp= {
      gender: row[i]['Select your gender'],
      country:row[i]['Select your country of origin'],
      age:row[i]['Select your age'],
      program: row[i]['Select your study program'],
      semester: row[i]['Enter the number of Semesters you have studied'],
      cgpa:row[i]['Enter your CGPA (Approximate if do not know exact)'],
      programName:row[i]['Select your Program name'],
      courseName:row[i]['Select the Course name you want to review'],
      gpa:row[i]['Enter the GPA you earned in the selected course'],
      failingReason:row[i]['Select the reasons, IF you could NOT pass the course'],
      difficultyLevel:row[i]['Rate your difficulty level of this course'],
      lmAl:row[i]['Select the learning medium/method you found helpful to score a good grade [Attending Lectures]'],
      lmAE:row[i]['Select the learning medium/method you found helpful to score a good grade [Attending Exercises]'],
      lmOS:row[i]['Select the learning medium/method you found helpful to score a good grade [Online Self study]'],
      lmGS:row[i]['Select the learning medium/method you found helpful to score a good grade [Group Study]'],
      alNotHelpful:row[i]['Why was attending lectures NOT helpful?'],
      alHelpful:row[i]['Why was attending lectures helpful?'],
      lParticipation:row[i]['How much did you participate in the course activity [Attending Lectures]'],
      eParticipation:row[i]['How much did you participate in the course activity [Attending Exercises]'],
      courseBeingHelpful:row[i]['In general, do you think this course is being helpful in your career?'],
      comments:row[i]['Feel free to add your comments for the course']
    }
    data.push(temp);
  }
  //console.log(data);
  csvWriter
    .writeRecords(data)
    .then(()=> {//console.log('Data Written Successfully in out.csv');
  });
}
 

/* 
Exporting the functions required by the controller.js and other file in the vis_functions directory
*/

module.exports.readFile = readFile;