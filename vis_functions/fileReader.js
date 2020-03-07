const csv = require('csv-parser');
const fs = require('fs');

function getAllRows(callback)
{
    var allRows = [];
    fs.createReadStream('out.csv')
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