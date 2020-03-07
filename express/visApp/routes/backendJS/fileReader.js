const csv = require('csv-parser');
const fs = require('fs');

function getAllRows(str,callback)
{
    var allRows = [];
    fs.createReadStream(str)
    .pipe(csv())
    .on('data', (row) => 
    {
       allRows.push(row);
    })
    .on('end', () => 
    {
        callback(allRows);
    });
}

module.exports.getAllRows = getAllRows;